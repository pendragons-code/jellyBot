const covidApi = require("novelcovid")
const reject = require("../../../../assets/responseComponents/rejection.json")
const { EmbedBuilder } = require("discord.js")
const { defaults } = require("../../../../config.json")
module.exports = {
	name: "global",
	aliases: [],
	category: "utility",
	utilisation: "global",
	desc: "Shows global statistics for covid from the novelcovid api!",
	async execute(messageCreate, args, prefix) {
		const data = await covidApi.all()
		const globalCovidApi = new EmbedBuilder()
		globalCovidApi.setColor(defaults.defaultEmbedColor)
		globalCovidApi.setFooter({ text: defaults.defaultFooterText })
		globalCovidApi.setTimestamp()
		globalCovidApi.setTitle("Global covid statistics!")
		globalCovidApi.setDescription("Information here is based on the novelcovid api!")
		globalCovidApi.addFields({ name: "Cases", value: data.cases })
		globalCovidApi.addFields({ name: "Active", value: data.active })
		globalCovidApi.addFields({ name: "Critical Cases", value: data.critical })
		globalCovidApi.addFields({ name: "Deaths", value: data.deaths })
		globalCovidApi.addFields({ name: "Recovered", value: data.recovered })

		return messageCreate.channel.send({ embeds: [globalCovidApi] })
	}
}
