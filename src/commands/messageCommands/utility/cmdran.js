const { EmbedBuilder } = require("discord.js")
const { getUserFromMention } = require("../../../functions/mentions/user.js")
const { defaults } = require("../../../../config.json")

module.exports = {
	name: "cmdran",
	aliases: [],
	category: "utility",
	desc: "Provides you with the number of commands ran for this bot.",
	utilisation: "cmdran <@user>",
	maxArgs: 1,
	async execute(messageCreate, args, prefix) {
		let user = getUserFromMention(args[0])
		if(!user.id || !args[0]) user = messageCreate.author
		let cmdRanEmbed = new EmbedBuilder()
		let cmdRanData = await db.get(`cmdsRan_${user.id}`)
		cmdRanEmbed.setTitle("Commands Ran!")
		cmdRanEmbed.setDescription(`${user.username} ran ${cmdRanData} commands!`)
		cmdRanEmbed.setTimestamp()
		cmdRanEmbed.setFooter({ text: defaults.defaultFooterText })
		cmdRanEmbed.setColor(defaults.defaultEmbedColor)
		return messageCreate.channel.send({ embeds: [cmdRanEmbed] })
	}
}
