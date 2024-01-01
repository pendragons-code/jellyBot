const { bannedWords } = require("../../../assets/bannedWords/bannedWords.json")
const { reject } = require("../../../assets/responseComponents/rejection.json")
const { botConfig } = require("../../../config.json")
module.exports = {
	name: "antiswear",
	async execute(messageCreate) {
		const ignoreListAuthors = [botConfig.botID, botConfig.botOwnerID]
		if(ignoreListAuthors.includes(messageCreate.author.id)) return
		const antiswearStatus = await db.get(`antiswearStatus_${messageCreate.guild.id}`)
		if(antiswearStatus === null) return // note that trying to read the null object will result in the runtime crashing, but we will delete the entry if the server turns the anti-swear off
		const illegalWords = await db.get(`wordlist_${messageCreate.guild.id}`)
		if(illegalWords === null) illegalWords = bannedWords
		const presetPunishment = await db.get(`presetPunishment_${messageCreate.guild.id}`) // can either be warn, mute, tempmute, kick, tempban or ban (null will result in a warn, again this feature is off by default so the bot will automatically configure it on start)
		for(let i = 0; i < (illegalWords.length - 1); ++i) if(messageCreate.content.includes(illegalWords[i])) {
			messageCreate.delete()
			.catch((error) => {
				console.error(currentDateTime())
				console.error(error)
				return messageCreate.channel.send(reject.weAreScrewed.executionError)
			})
			switch(presetPunishment) {
				case "":
					break
				default:
					console.error("[jellypan runtime]: apparently the punishment status is broken.")
					console.error(messageCreate.guild.id)
					console.error(presetPunishment)
					return messageCreate.channel.send(reject.weAreScrewed.executionError)
			}
		}
	}
}
