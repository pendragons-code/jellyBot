const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
const { defaults } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "help",
	category: "core",
	description: "A basic help command!",
	utilisation: "help <category/command name>",
	options: [
		{
			name: "category",
			description: "Returns results for specific category.",
			type: ApplicationCommandOptionType.String,
			required: false
		},
		{
			name: "command",
			description: "Returns results for specific command!",
			type: ApplicationCommandOptionType.String,
			required: false
		}
	],
	async execute(interactionCreate) {
		// I initially wanted to add the choice system, but this led to a few problems, since the slash command system was often times inconsistent about things that kept changing, the bot sometimes would not execute the command at all.
		// in short, i was making choices in the correct format using choices and discord could not get all the options correctly.
		if(interactionCreate.options._hoistedOptions[1]) return interactionCreate.reply(reject.userFault.args.tooMany)
		const slashCommander = bot.slashCommands.filter(x => x)
		const helpEmbed =  new EmbedBuilder()
		helpEmbed.setTitle("Helplist!")
		helpEmbed.setFooter({ text: defaults.defaultFooterText })
		helpEmbed.setTimestamp()
		helpEmbed.setColor(defaults.defaultEmbedColor)
		helpEmbed.setDescription(`This bot has ${slashCommander.size} slash commands!`)
		let categoryArray = []
		let slashCommanderCategory = bot.slashCommands.map(u => u.category)
		for(categoryName of slashCommanderCategory) {
			if(!categoryArray.includes(categoryName)) categoryArray.push(categoryName)
		}
		if(!interactionCreate.options._hoistedOptions[0]) {
			// normally i would pre-define the interaction options, but doing so would result in an undefined and for some reason the code just says yo undefined im just gonna end shit here. I'm stumped to be honest.
			helpEmbed.addFields(
				{ name: "Available categories!", value: "`help <category>`\n\n`" + categoryArray.join("`, `") + "`", inline: true }
			)
			return interactionCreate.reply({ embeds: [helpEmbed] })
		}
		let actionWord = interactionCreate.options._hoistedOptions[0].value
		if(categoryArray.includes(actionWord)) {
			let categorySpecificSlashCommands = bot.slashCommands.filter(command => command.category === actionWord)
			helpEmbed.addFields(
				{ name: "Available commands!", value: "`" + categorySpecificSlashCommands.map(cmd => cmd.name).join("`, `") + "`", inline: true }
			)
			return interactionCreate.reply({ embeds: [helpEmbed] })
		}
		const searchCommand = bot.slashCommands.get(actionWord.toLowerCase())
		if(!searchCommand) return interactionCreate.reply("Not found")
		helpEmbed.addFields(
			{ name: "Name", value: searchCommand.name, inline: true },
			{ name: "Category", value: searchCommand.category, inline: true },
			{ name: "Utilisation", value: searchCommand.utilisation, inline: true },
			{ name: "Description", value: searchCommand.description }
		)
		return interactionCreate.reply({ embeds: [helpEmbed] })
	}
}
