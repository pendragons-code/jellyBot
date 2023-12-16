require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })
const axios = require("axios")
const reject = require("../../../../assets/responseComponents/rejection.json")
const { EmbedBuilder } = require("discord.js")
const { defaults } = require("../../../../config.json")

module.exports = {
	name: "tenor",
	aliases: [],
	category: "utility",
	utilisation: "tenory <tag>",
	desc: "Sends 1 random result from the pool of the top 10 images from the provided tag.",
	async execute(messageCreate, args, prefix) {
		if(!args[0]) return messageCreate.channel.send(reject.userFault.args.missing)
		const tenorKey = process.env.tenorApi
		let results = await axios({
			method: "get",
			url: `https://g.tenor.com/v1/search?q=${args[0]}&key=${tenorKey}&limit=10`,
			headers: {
				"Content-Type": "application/json"
			}
		})
		let selection = Math.floor(Math.random() * 9)
		const tenorEmbed = new EmbedBuilder()
		tenorEmbed.setColor(defaults.defaultEmbedColor)
		tenorEmbed.setTimestamp()
		tenorEmbed.setFooter({ text: "These GIFs are from tenor.com!" })
		tenorEmbed.setTitle("Incoming GIF from tenor!")
		tenorEmbed.setURL(results.data.results[selection].media[0].mediumgif.url)
		tenorEmbed.setImage(results.data.results[selection].media[0].mediumgif.url)
		tenorEmbed.setDescription(`Providing search results for: ${args[0]}`)
		messageCreate.channel.send({ embeds: [tenorEmbed] })
		.catch((error) => {
			console.error(error)
			console.log(messageCreate.content)
			return messageCreate.channel.send(`${reject.weAreScrewed.executionError}\nThe command may not work if the requested content is nsfw!`)
		})
	}
}