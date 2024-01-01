// I decided to separate it so i don't mess with the original version

const { EmbedBuilder, PermissionsBitField } = require("discord.js")
const { defaults } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "viewcd",
	aliases: [],
	category: "moderation",
	utilisation: "viewcd <page number>",
	desc: "Shows you all your cool down settings.",
	minPerms: [PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers],
	maxArgs: 2,
	async execute(messageCreate, args, prefix) {
		let page = parseInt(args[0])
		if(isNaN(args[0]) || !args[0]) page = 1
		
		const cooldownData = await db.get(`cooldown_${messageCreate.guild.id}`)
		const allCoolDownData = cooldownData["all"]
		if(cooldownData === null) return messageCreate.channel.send("This server does not have cooldowns enabled.")

		let coolDownEmbed = new EmbedBuilder()
		let description = ""
		if(allCoolDownData !== null){
			description = `channels: all\nduration: ${allCoolDownData}`
		} else {
			let cooldownByChannel = Object.entries(cooldownData)
			for(let i = (page -1) * 30; i < (pageNumber * 30); ++i){
				if(!cooldownByChannel[i]) continue
				let channelPoint = cooldownByChannel[i][0]
				let channelValidator = bot.channel.cache.get(channelPoint)
				if(!channelValidator) channelValidator = `unknown channel (${channelPoint})`
				description += `[${channelValidator}]: ${cooldownByChannel[i][1] / 1000} seconds`
				// You can argue that dividing 1000 everytime we view this is bad but i rather it this way over dividing it 1000 every time we got a message
			}
			//[[channelID, duration]]
		}

		coolDownEmbed.setTitle("Cooldown settings!")
		coolDownEmbed.setFooter({ text: defaultFooterText })
		coolDownEmbed.setColor(defaults.defaultEmbedColor)
		coolDownEmbed.setDescription(description)
		coolDownEmbed.setTimestamp()
		return messageCreate.channel.send({ Embeds: [coolDownEmbed] })
	}
}

// so the reason why we built 2 separate was because i already made the cooldown command quite wonky and adding the viewing mechanic would make things more wonkier than it already is.
