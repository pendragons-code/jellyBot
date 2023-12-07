const covidApi = require("novelcovid")
const reject = require("../../../../assets/responseComponents/rejection.json")
const { EmbedBuilder } = require("discord.js")
const { defaults } = require("../../../../config.json")
module.exports = {
	name: "country",
	aliases: [],
	category: "covid",
	utilisation: "country <country name>",
	desc: "Returns data for the country from the novelcovid api.",
	async execute(messageCreate, args, prefix) {
		if(!args) return messageCreate.channel.send(reject.args.userFault.missing)
		let countryRequest = args.join(" ")
		let countryData = await covidApi.countries({ country: countryRequest })
		if(!countryData) return messageCreate.channel.send(reject.weAreScrewed.executionError)
		if(countryData.message) return messageCreate.channel.send(reject.userFault.args.invalid)
		try{
			const countryEmbed = new EmbedBuilder()
			countryEmbed.setColor(defaults.defaultEmbedColor)
			countryEmbed.setTitle(`Cases in ${countryRequest}!`)
			countryEmbed.setFooter({ text: defaults.defaultFooterText })
			countryEmbed.setTimestamp()
			countryEmbed.setDescription(`Cases: ${countryData.cases}\nToday Cases: ${countryData.todayCases}\nDeaths: ${countryData.deaths}\nToday Deaths: ${countryData.todayDeaths}\nRecovered: ${countryData.recovered}\nToday Recovered:${countryData.todayRecovered}\nActive: ${countryData.active}\nCritical: ${countryData.critical}`)
			return messageCreate.channel.send({ embeds: [countryEmbed] })
		} catch(e) {
			return messageCreate.channel.send(reject.weAreScrewed.badApiResponse)
		}
	}
}
