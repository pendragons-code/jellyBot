const { EmbedBuilder } = require("discord.js")
const { defaults } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "global",
	category: "covid",
	utilisation: "global",
	description: "Shows global statistics for covid from the novelcovid api!",
	async execute(interactionCreate) {
		try {
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

			return interactionCreate.reply({ embeds: [globalCovidApi] })
		}catch(e){
			return interactionCreate.reply(reject.weAreScrewed.badApiResponse)
		}
	}
}
