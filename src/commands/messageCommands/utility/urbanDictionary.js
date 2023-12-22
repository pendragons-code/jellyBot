require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })
const axios = require("axios")
const reject = require("../../../../assets/responseComponents/rejection.json")
const { defaults } = require("../../../../config.json")
const { EmbedBuilder } = require("discord.js")
const urbanDictKey = process.env.rapidApiUrbanDictionary

module.exports = {
	name: "urbandict",
	aliases: ["urbandictionary"],
	category: "utility",
	utilisation: "urbandict <word>",
	desc: "A command that searches for the word in the urban dictionary. Be adviced results could be NSFW.",
	maxArgs: 1,
	async execute(messageCreate, args, prefix) {
		if(!args[0]) return messageCreate.channel.send(reject.userFault.args.missing)
		const options = {
			method: "get",
			url: "https://mashape-community-urban-dictionary.p.rapidapi.com/define",
			params: { term: args[0] },
			headers: {
				"X-RapidAPI-Key": urbanDictKey,
				"X-RapidAPI-Host": "mashape-community-urban-dictionary.p.rapidapi.com"
			}
		}
		const response = await axios.request(options)
		if(!response.data) return messageCreate.channel.send(reject.weAreScrewed.executionError)
		if(response.data.list.length < 1) return messageCreate.channel.send("No results")
		let embedDescription = `[Result 1](${response.data.list[0].permalink})`
		if(response.data.list[1].permalink) {
			let upperNumbericalLimit = response.data.list.length
			if(response.data.list.length > 30) upperNumbericalLimit = 30
			for(let i = 1; i < (upperNumbericalLimit - 1); ++i) embedDescription += `[Results ${i+1}](${response.data.list[i].permalink})`
		}
		let urbanDictionaryEmbed = new EmbedBuilder()
		urbanDictionaryEmbed.setDescription(embedDescription)
		urbanDictionaryEmbed.setTitle("Results!")
		urbanDictionaryEmbed.setFooter({ text: "Note that results may be nsfw. You have been warned." })
		urbanDictionaryEmbed.setTimestamp()
		urbanDictionaryEmbed.setColor(defaults.defaultEmbedColor)
		return messageCreate.channel.send({ embeds: urbanDictionaryEmbed })
	}
}
