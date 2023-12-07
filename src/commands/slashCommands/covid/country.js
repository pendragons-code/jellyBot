const covidApi = require("novelcovid")
const reject = require("../../../../assets/responseComponents/rejection.json")
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
const { defaults } = require("../../../../config.json")
module.exports = {
	name: "country",
	category: "covid",
	utilisation: "country <country name here>",
	description: "Returns data for the country from the novelcovid api.",
	options: [
		{
			name: "country",
			description: "Returns data for specified country.",
			type: ApplicationCommandOptionType.String,
			required: true
		}
	],
	async execute(interactionCreate) {
		let countryFromUser = interactionCreate.options._hoistedOptions[0].value
		let countryData = await covidApi.countries({ country: countryFromUser })
		if(!countryData) return interactionCreate.reply(reject.weAreScrewed.executionError)
		if(countryData.message) return interactionCreate.reply(reject.userFault.args.invalid)
		try {
			const countryEmbed = new EmbedBuilder()
			countryEmbed.setColor(defaults.defaultEmbedColor)
			countryEmbed.setTitle(`Cases in ${countryRequest}!`)
			countryEmbed.setFooter({ text: defaults.defaultFooterText })
			countryEmbed.setTimestamp()
			countryEmbed.setDescription(`Cases: ${countryData.cases}\nToday Cases: ${countryData.todayCases}\nDeaths: ${countryData.deaths}\nToday Deaths: ${countryData.todayDeaths}\nRecovered: ${countryData.recovered}\nToday Recovered:${countryData.todayRecovered}\nActive: ${countryData.active}\nCritical: ${countryData.critical}`)
			return interactionCreate.reply({ embeds: [countryEmbed] })
		} catch(e) {
			return interactionCreate.reply(reject.weAreScrewed.badApiResponse)
		}
	}
}
