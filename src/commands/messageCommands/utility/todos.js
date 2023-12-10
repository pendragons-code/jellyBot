const { db } = require("quick.db")
const { EmbedBuilder } = require("discord.js")
const { defaults } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "todo",
	aliases: [],
	category: "utility",
	desc: "A command that helps you manage your ToDo list.",
	utilisation: "todo add <task>\ntodo remove <task number>\ntodo set <task number> <task>\ntodo reset all\ntodo show <page number>",
	async execute(messageCreate, args, prefix) {
		if(!args[1]) return messageCreate.channel.send(reject.userFault.args.missing)
		const todoEmbed = new EmbedBuilder()
		const todosDB = await db.get(`todos_${messageCreate.author.id}`)
		let numberOfTodos = 0
		if(todosDB !== null) numberOfTodos = todosDB.length  // defining todosDB.length first will result in trying to read the length of a null object. Stop asking why i did it the way i did.
		todoEmbed.setFooter({ text: defaults.defaultFooterText })
		todoEmbed.setColor(defaults.defaultEmbedColor)
		todoEmbed.setTitle("Todo System!")
		todoEmbed.setTimestamp()

		switch(args[0]) {
			case "show":
				if(numberOfTodos < 1) return messageCreate.channel.send("You do not have any tasks to show!")
				if(isNaN(args[1])) return messageCreate.channel.send(reject.userFault.numbers.missing)
				let pageNumber = parseInt(args[1])
				let numberOfPagesFromDB = parseInt(math.ceil(numberOfTodos / 30)) // If I have one task, i will still get one page
				if(pageNumber > numberOfPagesFromDB) return messageCreate.channel.send("You do not have that many pages.")
				let description = todosDB.slice((pageNumber * 30) - 1, 30).map((taskString, taskNumberIndex) => {
					`[${taskNumberIndex + 1} ${taskString}]`
				})
				todoEmbed.setDescription(description)
				messageCreate.channel.send({ embeds: [todoEmbed] })
				break;
			case "add":
				if(!args[1]) return messageCreate.channel.send(reject.userFault.args.missing)
				let taskToAdd = args.join(" ").shift()
				if(taskToAdd.length > 130) return messageCreate.channel.send("The task you want to add is too long!")
				await db.push(`todos_${messageCreate.author.id}`, taskToAdd)
					.catch((error) => {
						console.log(error)
						console.error(`[${currentDateTime}] error`)
						console.error(`[${currentDateTime}] ${messageCreate.content}`)
						return messageCreate.channel.send(reject.weAreScrewed.executionError)
					})
					.then(() => {
						return messageCreate.channel.send(`**${taskToAdd}** has been successfully added to the todo system!`)
					})
				break;
			case "remove":
				if(isNaN(args[1])) return messageCreate.channel.send(reject.userFault.numbers.invalid)
				if(todosDB === null) return messageCreate.channel.send("You do not have any tasks.") // we need to have this here as interacting with this in a null state would make it throw an error and cause the runtime to crash.
				let requestedTaskForRemoval = parseInt(args[1])
				if(requestedTaskForRemoval > todosDB.length) return messageCreate.channel.send("You do not have that many tasks.")
				if(requestedTaskForRemoval < 1) return messageCreate.channel.send("You cannot have that as an assigned tasked number.")
				await db.pull(`todos_${messageCreate.author.id}`)
				break;
			case "set":
				if(!args[2]) return messageCreate.channel.send(reject.userFault.args.missing)
				if(isNaN(args[1])) return messageCreate.channel.send(reject.userFault.numbers.invalid)
				break;
		}


		// ["130", 130, ...]
		// Each page will have 30 tasks
		// Each task can have a limit of 130 characters
	}
}
