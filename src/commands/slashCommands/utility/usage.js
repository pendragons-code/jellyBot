const { EmbedBuilder } = require("discord.js")
const { cpuUsage } = require("os-utils")
const { projectUsage } = require("../../../functions/usage/resourceUsage.js")
const { defaults } = require("../../../../config.json")

module.exports = {
	name: "usage",
	category: "utility",
	utilisation: "usage",
	description: "Sends you details of the bot's resource usage.",
	async execute(interactionCreate){ 
		cpuUsage(async function(toEmbedCpuUsage) {
			const usageEmbed = new EmbedBuilder()
			usageEmbed.setColor(defaults.defaultEmbedColor)
			usageEmbed.setFooter({ text: defaults.defaultFooterText })
			usageEmbed.setTitle("Jellypan's usage details!")
			usageEmbed.setTimestamp()
			usageEmbed.setDescription(`${await projectUsage(toEmbedCpuUsage)}`)
			return interactionCreate.reply({ embeds: [usageEmbed] })
		})
	}
}
