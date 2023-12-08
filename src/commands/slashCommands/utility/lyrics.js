const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
const { defaults } = require("../../../../config.json")
const axios = require("axios")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "lyrics",
	category: "core",
	description: "Sends the lyrics or link in the current channel!",
	utilisation: "lyrics <song name>",
	options: [
		{
			name: "name",
			description: "Song name for query.",
			type: ApplicationCommandOptionType.String,
			required: true
		}
	],
	async execute(interactionCreate) {
		let songName = interactionCreate.options._hoistedOptions[0].value
		let results = await axios({
			method: "get",
			url: `https://some-random-api.ml/lyrics/title?=${songName}`,
			headers: {
				"Content-Type": "application/json",
				"Accept-Encoding": "gzip,deflate,compress"
			}
		})
		if(!results.links.genius) return messageCreate.channel.send(reject.weAreScrewed.badApiResponse)
		if(results.data.error) return messageCreate.channel.send(reject.weAreScrewed.badApiResponse)
		let musicLyricsEmbed = new EmbedBuilder()
		musicLyricsEmbed.setURL(results.link.genius)
		musicLyricsEmbed.setFooter({ text: defaults.defaultFooterText })
		musicLyricsEmbed.setColor(defaults.defaultEmbedColor)
		musicLyricsEmbed.setTimestamp()
		musicLyricsEmbed.setDescription(results.data.lyrics)
		musicLyricsEmbed.setImage(results.data.thumbnail.genius)
		musicLyricsEmbed.setTitle(`Results for ${results.data.title}`)
		interactionCreate.reply({ embeds: [musicLyricsEmbed] }).catch(() => {
			interactionCreate.reply("Too many characters, sending link instead!")
			interactionCreate.reply(`🔗 ${results.data.link.genius}`)
		})
	}
}
