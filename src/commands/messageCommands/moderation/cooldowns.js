const { PermissionsBitField } = require("discord.js")
const reject = require("../../../../assets/responseComponents/rejection.json")

module.exports = {
	name: "cooldown",
	aliases: [],
	category: "moderation",
	minPerms: [PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers],
	utilisation: "cooldown <duration in seconds> <channel id/all>\ncooldown clear <channel id/all>",
	desc: "Sets the server cooldown for the server/guild.",
	maxArgs: 2,
	async execute(messageCreate, args, prefix) {
		if(!args[1]) return messageCreate.channel.send(reject.userFault.args.missing)
		if(isNaN(args[1]) && args[1] !== "all") return messageCreate.channel.send(reject.userFault.args.invalid)
		let channel = messageCreate.guild.channels.cache.get(args[1]) // we want this here so we don't have an invalid channel being selected instead
		if(args[1] !== "all") if(!channel || channel.type !== 0 || channel.guild.id !== messageCreate.guild.id) return messageCreate.channel.send(reject.userFault.args.invalid)
		let dataAddress = `cooldown_${messageCreate.guild.id}`
		if(args[0] === "clear") {
			let clearValidation = await db.get(dataAddress)
			if(clearValidation === null) return messageCreate.channel.send("This feature is not used in this server.")
			if(args[0] === "all") {
				await db.delete(dataAddress)
				.catch((error) => {
					console.error(currentDateTime())
					console.error(error)
					console.error(messageCreate.content)
					return messageCreate.channel.send(reject.weAreScrewed.executionError)
				})
				return messageCreate.channel.send("Removed the cooldown for all channels")
			}
			await db.sub(dataAddress, channel.id)
				.catch((error) => {
					console.error(currentDateTime())
					console.error(error)
					console.error(messageCreate.content)
					return messageCreate.channel.send(reject.weAreScrewed.executionError)
				})
			return messageCreate.channel.send(`Removed the cooldown from ${channel.name}.`)
		}
		if(!isNaN(args[0])) {
			if(args[1] === "all") {
				console.log("here")
				await db.set(`${dataAddress}.all`, args[0] * 1000)
				return messageCreate.channel.send(`Cooldown has been set to all!`)
			}
			await db.set(`${dataAddress}.${channel.id}`, args[0] * 1000)
			return messageCreate.channel.send(`${channel.name} has been set to ${args[0]}`)
		} else {
			return messageCreate.channel.send(reject.userFault.args.invalid)
		}
	}
}
