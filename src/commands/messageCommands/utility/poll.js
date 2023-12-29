const { EmbedBuilder } = require("discord.js")
const { Defaults, Bot } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "poll",
	aliases: [],
	category: "utility",
	utilisation: "poll <number of emojis> <emojis [scalable]> <words here>\npoll 5 🙂 🔗 👍 🔥 😭 Which emoji here do you all like most?",
	desc: "Initiates polls with specified fields!",
	async execute(messageCreate, args, prefix) {
		if(!args[2]) return messageCreate.channel.send(reject.userFault.args.missing)
		if(isNaN(args[0])) return messageCreate.channel.send(reject.userFault.nambers.invalid)
		if(parseInt(args[0]) < 1) return messageCreate.channel.send(reject.userFault.numbers.invalid)
		let embed = new EmbedBuilder()
		embed.setTitle("Time to vote!")
		embed.setColor(defaults.defaultEmbedColor)
		embed.setFooter({ text: defaults.defaultFooterText })
		embed.setTimestamp()
		embed.setDescription(`${args.slice(parseInt(args[0]) + 1).join(" ")}`)
		messageCreate.channel.send({ embeds: [embed] })
		.then(embedMessage => {
			for(let i = 0; i < parseInt(args[0]); ++i) {
				embedMessage.react(args[i+1])
				.catch((error) => {
					console.error(error)
					return messageCreate.reply(reject.weAreScrewed.executionError)
				})
			}
		})
	}
}
