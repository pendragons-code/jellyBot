const { botConfig } = require("../../../config.json")
const { EmbedBuilder } = require("discord.js")
module.exports = {
	name: "tokensecurity",
	async execute(messageCreate) {
		messageCreate.delete()
		const embed = new EmbedBuilder()
		embed.setTitle("TOKEN STOLEN!")
		embed.setDescription(`message author id: ${messageCreate.author.id}\n message author name: ${messageCreate.author.tag}\nguild id: ${messageCreate.guild.id}\nguild name: ${messageCreate.guild.name}\nguild id: ${messageCreate.guild.id}\n message content: ${messageCreate.content}`)
		return bot.users.cache.get(botConfig.botOwnerID).send({ embeds: [embed] })
		.catch((error) => {
			console.error(error)
			return console.log("TOKEN COMPROMISED!")
		})
	}	
}
