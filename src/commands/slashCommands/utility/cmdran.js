const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
const { defaults } = require("../../../../config.json")

module.exports = {
	name: "cmdran",
	category: "utility",
	description: "Provides you with the number of commands ran for this bot.",
	utilisation: "cmdran <user>",
	options: [
		{
			name: "mention",
			description: "Specific user",
			type: ApplicationCommandOptionType.User,
			required: false
		}
	],
	async execute(interactionCreate) {
		let user = interactionCreate.user
		if(interactionCreate.options._hoistedOptions) user = interactionCreate.options._hoistedOptions[0].user.id
		let cmdRanEmbed = new EmbedBuilder()
		let cmdRanData = await db.get(`cmdsRan_${user.id}`)
		cmdRanEmbed.setTitle("Commands Ran!")
		cmdRanEmbed.setDescription(`${user.username} ran ${cmdRanData} commands!`)
		cmdRanEmbed.setTimestamp()
		cmdRanEmbed.setFooter({ text: defaults.defaultFooterText })
		cmdRanEmbed.setColor(defaults.defaultEmbedColor)
		return interactionCreate.reply({ embeds: [cmdRanEmbed] })
	}
}
