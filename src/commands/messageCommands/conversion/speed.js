const { EmbedBuilder } = require("discord.js")
const { convertSpeed } = require("../../../functions/conversion/convertSpeed.js")
const { defaults } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
const acceptedArgs = ["metrePerSecond", "milePerHour", "footPerSecond", "kilometrePerHour", "knot"]
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
		let speedEmbed = new EmbedBuilder()
		speedEmbed.setColor(defaults.defaultEmbedColor)
		speedEmbed.setFooter({ text: defaults.defaultFooterText })
		speedEmbed.setTimestamp()
		speedEmbed.setTitle("Conversion!")
		speedEmbed.setDescription(convertSpeed(args[0], args[1]))
		return messageCreate.channel.send({ embeds: [speedEmbed] })
	}
}
