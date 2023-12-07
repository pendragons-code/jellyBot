require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
const { defaults } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
const axios = require("axios")
const currencyApiKey = process.env.rapidCurrency

const choiceForCurrency = [
	{"name": "SGD", "value": "SGD"},
	{"name": "MYR", "value": "MYR"},
	{"name": "EUR", "value": "EUR"},
	{"name": "USD", "value": "USD"},
	{"name": "AUD", "value": "AUD"},
	{"name": "JPY", "value": "JPY"},
	{"name": "CNH", "value": "CNH"},
	{"name": "HKD", "value": "HKD"},
	{"name": "CAD", "value": "CAD"},
	{"name": "INR", "value": "INR"},
	{"name": "DKK", "value": "DKK"},
	{"name": "GBP", "value": "GBP"},
	{"name": "RUB", "value": "RUB"},
	{"name": "NZD", "value": "NZD"},
	{"name": "MXN", "value": "MXN"},
	{"name": "IDR", "value": "IDR"},
	{"name": "TWD", "value": "TWD"},
	{"name": "THB", "value": "THB"},
	{"name": "VND", "value": "VND"}
] 

module.exports = {
	name: "currency",
	category: "conversion",
	description: "Converts amount from one currency type to another.",
	utilisation: "currency <from> <to> <amount> \ncurrency EUR USD 40",
	options: [
		{
			name: "from",
			description: "currency type to convert from",
			type: ApplicationCommandOptionType.String,
			required: true,
			choices: choiceForCurrency
		},
		{
			name: "to",
			description: "currency type to convert to",
			type: ApplicationCommandOptionType.String,
			required: true,
			choices: choiceForCurrency
		},
		{
			name: "amount",
			description: "currency amount for conversion",
			type: ApplicationCommandOptionType.Number,
			required: true,
		}
	],
	async execute(interactionCreate) {
		let convertFrom = interactionCreate.options._hoistedOptions[0].value
		let convertTo = interactionCreate.options._hoistedOptions[1].value
		let convertAmount = interactionCreate.options._hoistedOptions[2].value
		let requestOptions = {
			method: "GET",
			url: "https://currency-exchange.p.rapidapi.com/exchange",
			params: {
				to: convertTo, from: convertFrom, q: convertAmount
			},
			headers: {
				"x-rapidapi-host": "currency-exchange.p.rapidapi.com",
				"x-rapidapi-key": currencyApiKey
			}
		}
		let response = await axios(requestOptions)
		if(response.message) return messageCreate.channel.send(reject.weAreScrewed.badApiResponse)
		const convertedEmbed = new EmbedBuilder()
		convertedEmbed.setTItle("Converted Amount!")
		convertedEmbed.setTimestamp()
		convertedEmbed.setDescription(`$${convertFrom}${convertAmount} is ${convertTo}${response.data}!`)
		convertedEmbed.setColor(defaults.defaultEmbedColor)
		convertedEmbed.setFooter({ text: defaults.defaultFooterText })
		return interactionCreate.reply({ embeds: [convertedEmbed] })
	}
}
