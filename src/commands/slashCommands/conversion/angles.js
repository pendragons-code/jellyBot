const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js")
const { convertAngles } = require("../../../functions/conversion/convertAngles.js")
const { defaults } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "angles",
	category: "angles",
	description: "Converts angles to a list of common values.",
	options: [
		{
			name: "value",
			description: "The angle value.",
			type: ApplicationCommandOptionType.Number,
			required: true
		},
		{
			name: "unit",
			description: "The angle unit you are giving.",
			type: ApplicationCommandOptionType.String,
			required: true,
			choices: [
				{ name: "degree", value: "degree" },
				{ name: "radian", value: "radian" },
				{ name: "arcsecond", value: "arcsecond" },
				{ name: "gradian", value: "gradian" },
				{ name: "milliradian", value: "milliradian" },
				{ name: "arcminute", value: "arcminute" }
			]
		}
	],
	async execute(interactionCreate) {
		let angleMagnitude = interactionCreate.options._hoistedOptions[0].value
		let unit = interactionCreate.options._hoistedOptions[1].value
		let angleEmbed = new EmbedBuilder()
		angleEmbed.setColor(defaults.defaultEmbedColor)
		angleEmbed.setFooter({ text: defaults.defaultFooterText })
		angleEmbed.setTimestamp()
		angleEmbed.setTitle("Conversion!")
		angleEmbed.setDescription(convertAngles(angleMagnitude, unit))
		return interactionCreate.reply({ embeds: [angleEmbed] })
	}
}
