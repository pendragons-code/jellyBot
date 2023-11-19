const { EmbedBuilder } = require("discord.js")
const { cpuUsage } = require("os-utils")
const { projectUsage } = require("../../../functions/usage/resourceUsage.js")
const { defaults } = require("../../../../config.json")

module.exports = {
	name: "usage",
	aliases: ["-u"],
	category: "core",
	utilisation: "usage",
	desc: "Sends you details of the bot's resource usage.",
	async execute(messageCreate, args, prefix) {
		cpuUsage(async function(toEmbedCpuUsage) {
			const usageEmbed = new EmbedBuilder()
			usageEmbed.setColor(defaults.defaultEmbedColor)
			usageEmbed.setFooter({ text: defaults.defaultFooterText })
			usageEmbed.setTitle("Jellypan's usage details!")
			usageEmbed.setTimestamp()
			usageEmbed.setDescription(`${await projectUsage(toEmbedCpuUsage)}`)
			return messageCreate.channel.send({ embeds: [usageEmbed] })
		})
	}
}

