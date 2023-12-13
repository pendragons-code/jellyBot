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
				if(isNaN(args[1]) && args[1] !== "all") return messageCreate.channel.send(reject.userFault.numbers.missing)
				let pageNumber = parseInt(args[1])
				if(args[1] === "all") pageNumber = 1
				let numberOfPagesFromDB = parseInt(Math.ceil(numberOfTodos / 30)) // If I have one task, i will still get one page
				if(pageNumber > numberOfPagesFromDB) return messageCreate.channel.send("You do not have that many pages.")
				let description = ""
				for(let i = (pageNumber - 1) * 30; i < (pageNumber * 30); ++i) {
					if(!todosDB[i]) continue
					description += `[${i+1}] ${todosDB[i]}\n`
				}
				todoEmbed.setDescription("```" + description + "```")
				messageCreate.channel.send({ embeds: [todoEmbed] })
				break;
			case "add":
				if(!args[1]) return messageCreate.channel.send(reject.userFault.args.missing)
				let taskToAdd = args.slice(1).join(" ")
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
				let requestedTaskForRemoval = parseInt(args[1] - 1)
				if(requestedTaskForRemoval > todosDB.length) return messageCreate.channel.send("You do not have that many tasks.")
				if(requestedTaskForRemoval < 0) return messageCreate.channel.send("You cannot have that as an assigned tasked number.")
				let taskToPull = todosDB[requestedTaskForRemoval]
				await db.pull(`todos_${messageCreate.author.id}`, taskToPull)
					.catch((error) => {
						console.log(error)
						console.error(`[${currentDateTime}] error`)
						console.error(`[${currentDateTime}] ${messageCreate.content}`)
						return messageCreate.channel.send(reject.weAreScrewed.executionError)
					})
					.then(() => {
						messageCreate.channel.send(`**Task ${args[1]}** has been removed!`)
					})
				break;
			case "set":
				if(!args[2]) return messageCreate.channel.send(reject.userFault.args.missing)
				if(isNaN(args[1])) return messageCreate.channel.send(reject.userFault.numbers.invalid)
				if(numberOfTodos === null || numberOfTodos < 1) return messageCreate.channel.send("You do not have any tasks.")
				let specifiedTaskToSet = parseInt(args[1] - 1)
				if(specifiedTaskToSet > numberOfTodos || specifiedTaskToSet < 0) return messageCreate.channel.send(reject.userFault.numbers.invalid)
				let newTask = args.slice(2).join(" ")
				if(newTask.length > 130) return messageCreate.channel.send("The task that you wanna set is too long.")
				await todosDB.splice(specifiedTaskToSet, 1, newTask)
				await db.set(`todos_${messageCreate.author.id}`, todosDB)
					.catch((error) => {
						console.log(error)
						console.error(`[${currentDateTime}] error`)
						console.error(`[${currentDateTime}] ${messageCreate.content}`)
						return messageCreate.channel.send(reject.weAreScrewed.executionError)
					})
					.then(() => {
						messageCreate.channel.send(`Updated ${args[0]} to **${todosDB[specifiedTaskToSet]}**!`)
					})
				break;
			default:
				return messageCreate.channel.send(reject.userFault.args.invalid)
		}


		// ["130", 130, ...]
		// Each page will have 30 tasks
		// Each task can have a limit of 130 characters
	}
}
