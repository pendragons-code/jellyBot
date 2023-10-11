const { EmbedBuilder } = require("discord.js")
const { convertTemperature } = require("../../../functions/conversion/convertTemperature")
const { defaults } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
const acceptedArgs = ["fahrenheit", "kelvin", "celsius"]
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
		let temperatureEmbed = new EmbedBuilder()
		temperatureEmbed.setColor(defaults.defaultEmbedColor)
		temperatureEmbed.setFooter({ text: defaults.defaultFooterText })
		temperatureEmbed.setTimestamp()
		temperatureEmbed.setTitle("Conversion!")
		temperatureEmbed.setDescription(convertTemperature(args[0], args[1]))
		return messageCreate.channel.send({ embeds: [temperatureEmbed] })
	}
}
