const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js")
const { convertSpeed } = require("../../../functions/conversion/convertSpeed.js")
const { defaults } = require("../../../../config.json")
module.exports = {
	name: "speed",
	category: "conversion",
	description: "Converts speeds to a list of common units.",
	utilisation: "speed <value> <unit>",
	options: [
		{
			name: "value",
			description: "The speed's value.",
			type: ApplicationCommandOptionType.Number,
			required: true
		},
		{
			name: "unit",
			description: "The speed unit you are giving.",
			type: ApplicationCommandOptionType.String,
			required: true,
			choices: [
				{ name: "metre per second", value: "metrePerSecond" },
				{ name: "mile per hour", value: "milePerHour" },
				{ name: "foot per second", value: "footPerSecond" },
				{ name: "kilometre per hour", value: "kilometrePerHour" },
				{ name: "knot", value: "knot" }
			]
		}
	],
	async execute(interactionCreate) {
		let speedMagnitude = interactionCreate.options._hoistedOptions[0].value
		let unit = interactionCreate.options._hoistedOptions[1].value
		let speedEmbed = new EmbedBuilder()
		speedEmbed.setColor(defaults.defaultEmbedColor)
		speedEmbed.setFooter({ text: defaults.defaultFooterText })
		speedEmbed.setTimestamp()
		speedEmbed.setTitle("Conversion")
		speedEmbed.setDescription(convertSpeed(speedMagnitude, unit))
		return interactionCreate.reply({ embeds: [speedEmbed] })
	}
}
