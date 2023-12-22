const { defaults, botConfig } = require("../../../config.json")
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })
const reject = require("../../../assets/responseComponents/rejection.json")
const permissionList = require("../../../assets/permissionsList.json")
const ms = require("parse-ms")

module.exports = async (bot, messageCreate) => {
	if(messageCreate.content.includes(process.env.token)) bot.utils.get("tokensecurity").execute(messageCreate)
	// the reason why im putting ignore bots and dms only after tokens is due to the fact that tokens sent in dms would not get picked up and i want to be alerted
	bot.utils.get("antiswear").execute(messageCreate)
	if(messageCreate.author.bot || messageCreate.channel.type == 1 ) return
	// usual flow
	let blackListedUser = await db.get(`blacklisted_${messageCreate.author.id}`)
	if(blackListedUser === "yes") return messageCreate.channel.send(reject.userFault)
	let editMode = await db.get("editMode")
	let dbPrefix = await db.get(`prefix_${messageCreate.guild.id}`)
	if(dbPrefix === null) dbPrefix = defaults.defaultPrefix
	let prefix = messageCreate.content.includes(dbPrefix) ? dbPrefix : `<@${botConfig}>`
	if(messageCreate.content.indexOf(prefix) !== 0) return
	if(editMode == "on" && messageCreate.author.id !== botConfig.botOwnerID) return messageCreate.channel.send(reject.botDownTime.editMode)
	const args = messageCreate.content.slice(prefix.length).trim().split(/ +/g)
	const command = args.shift().toLowerCase()
	const cmd = bot.messageCommands.get(command) || bot.messageCommands.find(cmd => cmd.aliases.includes(command))	
	if(!cmd) return
	if(cmd.maxArgs && args[cmd.maxArgs]) return messageCreate.channel.send(reject.userFault.args.tooMany)


// ******** UNTESTED CHUNK



	//cooldown
	let checkCooldowns = await db.get(`cooldown_${messageCreate.guild.id}`)
	if(cmd.cooldown && messageCreate.author.id !== botConfig.botOwnerID) {
		// this is a command-enforced cooldown this means that the command will have this cooldown and it does not matter who is the one using it no matter from which server.
		let commandCooldown = await db.get(`${cmd.name}_${messageCreate.author.id}`)
		if(commandCooldown !== null && cmd.cooldown - (Date.now() - commandCooldown) > 0) {
			let time = ms(cmd.cooldown - (Date.now() - commandCooldown))
			return messageCreate.channel.send(`You are now on cooldown, try this command after ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`)
		}
		db.set(`${cmd.name}_${messageCreate.author.id}`, Date.now())
	}

	// bot creator will not be affected by cooldowns set by server ownders so in the event that there is something wrong we can still figure it out without further altering the settings

	if(checkCooldowns !== null && messageCreate.author.id !== botConfig.botOwnerID) {
		let serverSetCooldowns = await db.get(`cooldown_${messageCreate.guild.id}`)
		let duration;
		if(serverSetCooldowns["all"]) duration = serverSetCooldowns[all]
		if(serverSetCooldowns[`${messageCreate.guild.id}`]) duration = serverSetCooldowns[`${messageCreate.guild.id}`]
		let commandCooldownPeriod = await db.get(`serverCooldownPeriod_${messageCreate.guild.id}`)
		if(commandCooldownPeriod !== null && duration -(Date.now() - commandCooldown) > 0) {
			let timeToCool = ms(cmd.cooldown - (Date.now() - commandCooldownPeriod))
			return messageCreate.channel.send(`You are now on cooldown, try this command after ${timeToCool.days}d ${timeToCool.hours}h ${timeToCool.minutes}m ${timeToCool.seconds}s`)
		}
		db.set(`serverCooldownPeriod_${messageCreate.guild.id}`, Date.now())

		// what this means is that if all is turned on and the channel specific duration is turned on as well the rules will prioritize all first
	}





// ******** UNTESTED CHUNK



	if(cmd.minPerms) {
		for(let i = 0; i < cmd.minPerms.length; ++i) {
			let missingPermissionsName = ""
			if(!messageCreate.member.permissions.has(cmd.minPerms[i])) {
				if(!Array.isArray(cmd.minPerms[i])) return messageCreate.channel.send(`${reject.userFault.privilege.missingPermissions} ${permissionList[cmd.minPerms[i]]}`)
				for(let perArray = 0; perArray < cmd.minPerms[i].length; ++perArray) {
					let missingPermissionsNameFromArray = permissionList[cmd.minPerms[i][perArray]]
					missingPermissionsName + `\`${missingPermissionsNameFromArray}\`,`
				}
				return messageCreate.channel.send(`${reject.userFault.privilege.missingPermissions} ${missingPermissionsName.slice(0, missingPermissionsName.length - 2)}`)
			}
		}
	}
	try {
		const commandDisable = await db.get(`disabledCommand_${messageCreate.guild.id}_${cmd.name}`)
		const categoryDisable = await db.get(`disabledCommand_${messageCreate.guild.id}_${cmd.category}`)
		if(commandDisable === "disabled" || categoryDisable === "disabled") return
		if(args[0] === "-h") return messageCreate.channel.send(cmd.utilisation)
		if(cmd.category === "creator" && messageCreate.author.id !== botConfig.botOwnerID) return messageCreate.channel.send(reject.userFault.privilege.creatorOnly)
		cmd.execute(messageCreate, args, prefix)
		await db.add(`cmdsRan_${messageCreate.author.id}`, 1)
	} catch(error) {
			console.error(`${currentDateTime()} [jelly bot service] [messageCommands runtime]: ERROR`)
			console.error(error)
			return messageCreate.channel.send(reject.weAreScrewed.executionError)
	}
}
