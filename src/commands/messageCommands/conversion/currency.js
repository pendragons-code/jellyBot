require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })
const { defaults } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
const { EmbedBuilder } = require("discord.js")
const axios = require("axios")
const currencyApiKey = process.env.rapidCurrency

module.exports = {
	name: "currency",
	aliases: [],
	category: "conversion",
	desc: "Converts amount from one currency type to another.",
	utilisation: "currency <from> <to> <amount>\ncurrency EUR USD 40",
	async execute(messageCreate, args, prefix) {
		let listOfAcceptedCodes = ["SGD", "MYR", "EUR", "USD", "AUD", "JPY", "CNH", "HKD", "CAD", "INR", "DKK", "GBP", "RUB", "NZD", "MXN", "IDR", "TWD", "THB", "VND"]
		if(!args[0]) return messageCreate.channel.send(`Codes: "${listOfAcceptedCodes.join(", ")}"`)
		if(!args[2]) return messageCreate.channel.send(reject.userFault.numbers.missing)
		if(isNaN(args[2]) || args[2] <= 0) return messageCreate.channel.send(reject.userFault.numbers.missing)
		if(!list.includes(args[0]) || !list.includes(args[1])) return messageCreate.channel.send(reject.userFault.args.invalid)
		let options = {
			method: "GET",
			url: "https://currency-exchange.p.rapidapi.com/exchange",
			params: {
				to: args[1], from: args[0], q: args[2]
			},
			headers: {
				"x-rapidapi-host": "currency-exchange.p.rapidapi.com",
				"x-rapidapi-key": currencyApiKey	
			}
		}
		let response = await axios(options)
		if(response.message) return messageCreate.channel.send(reject.weAreScrewed.badApiResponse)
		const convertedEmbed = new EmbedBuilder()
		convertedEmbed.setTItle("Converted Amount!")
		convertedEmbed.setTimestamp()
		convertedEmbed.setDescription(`$${args[0]}${args[2]} is ${args[1]}${response.data}!`)
		convertedEmbed.setColor(defaults.defaultEmbedColor)
		convertedEmbed.setFooter({ text: defaults.defaultFooterText })
		return messageCreate.channel.send({ embeds: [convertedEmbed] })
	}
}
