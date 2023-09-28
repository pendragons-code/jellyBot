module.exports = {
	name: "ping",
	category: "core",
	utilisation: "ping",
	description: "Pong!",
	async execute(interactionCreate) {
		return interactionCreate.reply(`Ping: **${bot.ws.ping}**ms!`)
	}
}
