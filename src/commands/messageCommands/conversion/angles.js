const { EmbedBuilder } = require("discord.js")
const { convertAngles } = require("../../../functions/conversion/convertAngles.js")
const { defaults } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
const acceptedArgs = ["degree", "radian", "arcsecond", "arcminute", "gradian", "milliradian"]
module.exports = {
	name: "angles",
	aliases: [],
	category: "conversion",
	desc: "Converts angles to a list of common units.",
	utilisation: `angles <value> <unit>\nAccepted units: ${acceptedArgs.join(", ")}`,
	maxArgs: 2,
	async execute(messageCreate, args, prefix) {
		if(!args[1]) return messageCreate.channel.send(reject.userFault.args.missing)
		if(isNaN(args[0])) return messageCreate.channel.send(reject.userFault.numbers.missing)
		if(!acceptedArgs.includes(args[1])) return messageCreate.channel.send(reject.userFault.args.invalid)
		let angleEmbed = new EmbedBuilder()
		angleEmbed.setColor(defaults.defaultEmbedColor)
		angleEmbed.setFooter({ text: defaults.defaultFooterText })
		angleEmbed.setTimestamp()
		angleEmbed.setTitle("Conversion!")
		angleEmbed.setDescription(convertAngles(args[0], args[1]))
		return messageCreate.channel.send({ embeds: [angleEmbed] })
	}
}
