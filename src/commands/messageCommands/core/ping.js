module.exports = {
	name: "ping",
	aliases: [],
	category: "core",
	utilisation: "ping",
	desc: "pong",
	async execute(messageCreate, args, prefix) {
		return messageCreate.channel.send(`Ping: **${bot.ws.ping}**ms!`)
	}
}
