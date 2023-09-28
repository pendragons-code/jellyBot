const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js")
const { convertTemperature } = require("../../../functions/conversion/convertTemperature.js")
const { defaults } = require("../../../../config.json")
module.exports = {
	name: "temperature",
	category: "conversion",
	description: "Converts temperatures to a list of common units.",
	utilisation: "temperature <value> <unit>",
	options: [
		{
			name: "value",
			description: "The temperature's value",
			type: ApplicationCommandOptionType.Number,
			required: true
		},
		{
			name: "unit",
			description: "The temperature unit you are giving",
			type: ApplicationCommandOptionType.String,
			required: true,
			choices: [
				{ name: "celsius", value: "celsius" },
				{ name: "kelvin", value: "kelvin" },
				{ name: "fahrenheit", value: "fahrenheit" }
			]
		}
	],
	async execute(interactionCreate) {
		let temperatureMagnitude = interactionCreate.options._hoistedOptions[0].value
		let unit = interactionCreate.options._hoistedOptions[1].value
		let temperatureEmbed = new EmbedBuilder()
		temperatureEmbed.setColor(defaults.defaultEmbedColor)
		temperatureEmbed.setFooter({ text: defaults.defaultFooterText })
		temperatureEmbed.setTimestamp()
		temperatureEmbed.setTitle("Conversion!")
		temperatureEmbed.setDescription(convertTemperature(temperatureMagnitude, unit))
		return interactionCreate.reply({ embeds: [temperatureEmbed] })
	}
}
