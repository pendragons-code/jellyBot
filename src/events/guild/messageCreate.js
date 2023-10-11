const { defaults, botConfig } = require("../../../config.json")
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })
const reject = require("../../../assets/responseComponents/rejection.json")
const permissionList = require("../../../assets/permissionsList.json")

module.exports = async (bot, messageCreate) => {
	if(messageCreate.content.includes(process.env.token)) bot.utils.get("tokensecurity").execute(messageCreate)
	// the reason why im putting ignore bots and dms only after tokens is due to the fact that tokens sent in dms would not get picked up and i want to be alerted
	if(messageCreate.author.bot || messageCreate.channel.type == "dm") return
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
	if(cmd.minPerms) {
		if(cmd.maxArgs && args[cmd.maxArgs]) return messageCreate.channel.send(reject.userFault.args.tooMany)
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
