const { db } = require("quick.db")
const { EmbedBuilder } = require("discord.js")
const { defaults } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "todo",
	aliases: [],
	category: "utility",
	desc: "A command that helps you manage your ToDo list.",
	utilisation: "todo add <task>\ntodo remove <task number>\ntodo set <task number> <task>\ntodo reset all\ntodo show <all/task number>",
	async execute(messageCreate, args, prefix) {
		if(!args[1]) return messageCreate.channel.send(reject.userFault.args.missing)
		let toDoEmbed = new EmbedBuilder()
		const currentSetOfTodos = await db.get(`todos_${messageCreate.author.id}`)
		let numberOfTodos
		if(currentSetOfTodos !== null) numberOfTodos = currentSetOfTodos.length
		toDoEmbed.setFooter({ text: defaults.defaultFooterText })
		toDoEmbed.setColor(defaults.defaultEmbedColor)
		toDoEmbed.setTimestamp()
		switch(args[0]) {
			case "show":
				if(numberOfTodos < 1) return messageCreate.channel.send("No tasks to show.")
				if(args[1] === "all") {
				}
				break;
		}
	}
}
