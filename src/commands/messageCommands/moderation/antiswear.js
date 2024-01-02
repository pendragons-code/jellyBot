const { PermissionsBitField, EmbedBuilder } = require("discord.js")
const { bannedWords } = require("../../../../assets/bannedWords/bannedWords.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
// anti-swear: should be able to add, remove words
// should be able to turn on or off
// should be able to set the type of punishment


module.exports = {
	name: "antiswear",
	aliases: [],
	category: "moderation",
	minPerms: [PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers],
	utiliastion: "antiswear <punishment> <list/kick/ban/warn/mute>\nantiswear <wordlist> <remove/add/list/default> <word>\nantiswear <settings> <on/off>\nantiswear <channel> <excludeall/includeall/include/exclude> <channelid>",
	desc: "Settings for antiswear meachnism.",
	maxArgs: 3,
	async execute(messageCreate, args, prefix) {
		if(!args[1]) return messageCreate.channel.send(reject.userFault.args.missing)
		const punishmentList = ["list", "kick", "ban", "warn", "mute"]
		if(args[0] === "wordlist" && args[2]) return messageCreate.channel.send(reject.userFault.args.invalid)
		switch(args[0]) {
			case "punishment":
				if(!punishmentList.includes(args[0])) return messageCreate.channel.send(reject.userFault.args.invalid)
				let punishmentArgument = args[1]
				if(punishmentArgument === "list") {
					punishmentList.shift()
					messageCreate.channel.send(`List of punishment options: **${punishmentList.join(", ")}**`)
					return
				}
				await db.set(`presetPunishment_${messageCreate.guild.id}`, punishmentArgument)
				.catch((error) => {
					console.error(currentDateTime())
					console.error(error)
					return messageCreate.channel.send(reject.weAreScrewed.executionError)
				})
				.then(() => {
					messageCreate.channel.send(`Your settings have been updated to ${punishmentArgument}.`)
				})
				break

			case "wordlist":
				const wordList = await db.get(`wordlist_${messageCreate.guild.id}`)
				switch(args[1]) { // i tried avoiding this but ye
					case "remove":
						if(wordList === null || wordList.length < 1) return messageCreate.channel.send("Your wordlist is empty. We will assume the defaults.")
						if(!wordList.include(args[1])) return messageCreate.channel.send(reject.userFault.args.invalid)
						await db.pull(`wordlist_${messageCreate.guild.id}`, args[1])
						.catch((error) => {
							console.error(currentDateTime())
							console.error(error)
							return messageCreate.channel.send(reject.weAreScrewed.executionError)
						})
						.then(() => {
							return messageCreate.channel.send(`Your wordlist has been updated: **${args[1]}** has been removed.`)
						})
						break

					case "add":
						await db.push(`wordlist_${messageCreate.guild.id}`, args[1])
						.catch((error) => {
							console.error(currentDateTime())
							console.error(error)
							return messageCreate.channel.send(reject.weAreScrewed.executionError)
						})
						.then(() => {
							return messageCreate.channel.send(`Your wordlist has been updated: **${args[1]}** has added`)
						}) 
						break

					case "default":
						await db.delete(`wordlist_${messageCreate.guild.id}`)
						await db.set(`wordlist_${messageCreate.guild.id}`, bannedWords)
						.catch((error) => {
							console.error(currentDateTime())
							console.error(error)
							return messageCreate.channel.send(reject.weAreScrewed.executionError)
						})
						.then(() => {
							return messageCreate.channel.send("Word list has been reset")
						})
						break

					case "list":
						await db.get(`worldlist_${messageCreate.guild.id}`)
						break

					default:
						return messageCreate.channel.send(reject.userFault.args.invalid)
				}
				break

			case "settings":
				break

			case "channel":
				break
		}
	}
}
