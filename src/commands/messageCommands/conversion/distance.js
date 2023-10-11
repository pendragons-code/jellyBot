const { EmbedBuilder } = require("discord.js")
const { convertDistance } = require("../../../functions/conversion/convertDistance.js")
const { defaults } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
const acceptedArgs = ["metre", "kilometre", "centimetre", "millimetre", "micrometre", "nanometre", "mile", "yard", "foot", "inch", "nauticalMile"]
module.exports = {
	name: "distance",
	aliases: [],
	category: "conversion",
	desc: "Converts distance to a list of common units.",
	utilisation: `distance <value> <unit>\nAccepted units: ${acceptedArgs.join(", ")}`,
	maxArgs: 2,
	async execute(messageCreate, args, prefix) {
		if(!args[1]) return messageCreate.channel.send(reject.userFault.args.missing)
		if(isNaN(args[0])) return messageCreate.channel.send(reject.userFault.numbers.missing)
		if(!acceptedArgs.includes(args[1])) return messageCreate.channel.send(reject.userFault.args.invalid)
		let distanceEmbed = new EmbedBuilder()
		distanceEmbed.setColor(defaults.defaultEmbedColor)
		distanceEmbed.setFooter({ text: defaults.defaultFooterText })
		distanceEmbed.setTimestamp()
		distanceEmbed.setTitle("Conversion!")
		distanceEmbed.setDescription(convertDistance(args[0], args[1]))
		return messageCreate.channel.send({ embeds: [distanceEmbed] })
	}
}
