const { ApplicationCommandOptionType, EmbedBuilder, Application } = require("discord.js")
const { convertDistance } = require("../../../functions/conversion/convertDistance.js")
const { defaults } = require("../../../../config.json")
module.exports = {
	name: "distance",
	category: "conversion",
	description: "Converts distances to a list of common units.",
	utilisation: "distance <value> <unit>",
	options: [
		{
			name: "value",
			description: "The distance's value.",
			type: ApplicationCommandOptionType.Number,
			required: true
		},
		{
			name: "unit",
			description: "The angle unit you are giving.",
			type: ApplicationCommandOptionType.String,
			required: true,
			choices: [
				{ name: "metre", value: "metre" },
				{ name: "kilometre", value: "kilometre" },
				{ name: "centimetre", value: "centimetre" },
				{ name: "micrometre", value: "micrometre" },
				{ name: "nanometre", value: "nanometre" },
				{ name: "mile", value: "mile" },
				{ name: "yard", value: "yard" },
				{ name: "foot", value: "foot" },
				{ name: "inch", value: "inch" },
				{ name: "nautical mile", value: "nauticalMile" }
			]
		}
	],
	async execute(interactionCreate) {
		let distanceMagnitude = interactionCreate.options._hoistedOptions[0].value
		let unit = interactionCreate.options._hoistedOptions[1].value
		let distanceEmbed = new EmbedBuilder()
		distanceEmbed.setColor(defaults.defaultEmbedColor)
		distanceEmbed.setFooter({ text: defaults.defaultFooterText })
		distanceEmbed.setTimestamp()
		distanceEmbed.setTitle("Conversion")
		distanceEmbed.setDescription(convertDistance(distanceMagnitude, unit))
		return interactionCreate.reply({ embeds: [distanceEmbed] })
	}
}
