const { EmbedBuilder } = require("discord.js")
const { defaults } = require("../../../../config.json")
module.exports = {
	name: "help",
	aliases: ["commands"],
	category: "core",
	desc: "Sends list of commands for this bot!",
	utilisation: "help <command/category>",
	async execute(messageCreate, args, prefix) {
		const commander = bot.messageCommands.filter(x => x)
		const commanderCategory = bot.messageCommands.map(u => u.category)
		let categoryArray = []
		for(categoryName of commanderCategory) {
			if(!categoryArray.includes(categoryName)) categoryArray.push(categoryName)
		}
		let helpEmbed = new EmbedBuilder()
		helpEmbed.setColor(defaults.defaultEmbedColor)
		helpEmbed.setTimestamp()
		helpEmbed.setFooter({ text: defaults.defaultFooterText })
		helpEmbed.setTitle("List of commands!")
		helpEmbed.setDescription(`Prefix is ${prefix}! This bot has ${commander.size} commands!`)

		if(!args[0]) {
			helpEmbed.addFields({ name: "Available categories", value: "`" + prefix + "help <category>`\n\n`" + categoryArray.join("`, `") + "`", inline: true })
			return messageCreate.channel.send({ embeds: [helpEmbed] })
		}
		if(categoryArray.includes(args[0])) {
			let categorySpecificCommands = bot.messageCommands.filter(commands => commands.category === args[0])
			helpEmbed.addFields({ name: `Available commands!`, value: "`" + categorySpecificCommands.map(cmd => cmd.name).join("`, `") + "`", inline: true })
			return messageCreate.channel.send({ embeds: [helpEmbed] })
		}

		const searchCommand = bot.messageCommands.get(args.join(" ").toLowerCase() || bot.messageCommands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase())))
		if(!searchCommand) return messageCreate.channel.send("Command not found!")
		helpEmbed.addFields(
			{ name: "Name", value: searchCommand.name, inline: true },
			{ name: "Category", value: searchCommand.category, inline: true },
			{ name: "Alias(es)", value: searchCommand.aliases.length < 1 ? "None" : searchCommand.aliases.join(", "), inline: true },
			{ name: "Utilisation", value: searchCommand.utilisation, inline: true },
			{ name: "Description", value: searchCommand.desc }
		)
		return messageCreate.channel.send({ embeds: [helpEmbed] })
	}
}
