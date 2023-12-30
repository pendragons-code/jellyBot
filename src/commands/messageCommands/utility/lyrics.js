const { EmbedBuilder } = require("discord.js")
const { defaults } = require("../../../../config.json")
const axios = require("axios")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "lyrics",
	aliases: [],
	category: "utility",
	utilisation: "lyrics <query>",
	desc: "Sends the lyrics or link in the current channel!",
	async execute(messageCreate, args, prefix) {
		let results = await axios({
			method: "get",
			url: `https://some-random-api.com/lyrics?title=${args.join("%20")}`,
			headers: {
				"Content-Type": "application/json"
			}
		})
		console.log(args.join("%20"))
		console.log(results.data)
		if(!results.data.links) return messageCreate.channel.send(reject.weAreScrewed.badApiResponse)
		if(results.data.error) return messageCreate.channel.send(reject.weAreScrewed.badApiResponse)
		let musicLyricsEmbed = new EmbedBuilder()
		musicLyricsEmbed.setURL(results.data.links.genius)
		musicLyricsEmbed.setFooter({ text: defaults.defaultFooterText })
		musicLyricsEmbed.setColor(defaults.defaultEmbedColor)
		musicLyricsEmbed.setTimestamp()
		musicLyricsEmbed.setDescription(results.data.lyrics)
		musicLyricsEmbed.setImage(results.data.thumbnail.genius)
		musicLyricsEmbed.setTitle(`Results for ${results.data.title}`)
		messageCreate.channel.send({ embeds: [musicLyricsEmbed] }).catch(() => {
			messageCreate.channel.send("Too many characters, sending link instead!")
			messageCreate.channel.send(`🔗 ${results.data.links.genius}`)
		})
	}
}
