const { defaults, botConfig } = require("../../../config.json")
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })
const reject = require("../../../assets/responseComponents/rejection.json")
const permissionList = require("../../../assets/permissionsList.json")

module.exports = async (bot, messageCreate) => {
	if(messageCreate.content.includes(process.env.token)) bot.utils.get("tokensecurity").execute(messageCreate)
	if(messageCreate.author.bot || messageCreate.channel.type == "dm") return
	let editMode = await db.get("editMode")
	let dbPrefix = await db.get(`prefix_${messageCreate.guild.id}`)
	let blackListedUser = await db.get(`blacklisted_${messageCreate.author.id}`)
	if(dbPrefix === null) dbPrefix = defaults.defaultPrefix
	let prefix = messageCreate.content.includes(dbPrefix) ? dbPrefix : `<@${botConfig.botID}>`	
	if(messageCreate.content.indexOf(prefix) !== 0) return
	if(blackListedUser === "yes") return messageCreate.channel.send(reject.userFault.privilege.blackListedUser)
	if(editMode == "on" && messageCreate.author.id !== botConfig.botOwnerID) return messageCreate.channel.send(reject.botDownTime.editMode)
	const args = messageCreate.content.slice(prefix.length).trim().split(/ +/g)
	const command = args.shift().toLowerCase()
	const cmd = bot.messageCommands.get(command) || bot.messageCommands.find(cmd => cmd.aliases && cmd.aliases.includes(command))
	if(!cmd) return
	const commandDisable = await db.get(`disabledCommand_${messageCreate.guild.id}_${cmd.name}`)
	const categoryDisable = await db.get(`disabledCategory_${messageCreate.guild.id}_${cmd.category}`)
	try {
		if(commandDisable === "disabled" || categoryDisable === "disabled") return messageCreate.channel.send(reject.userFault.privilege.disabledCommand)
		if(cmd.maxArgs && args[cmd.maxArgs + 1]) return messageCreate.channel.send(reject.userFault.args.tooMany)
		if(cmd.minPerms) for(let i = 0; i < cmd.minPerms.length; ++i) if(!messageCreate.member.permissions.has(cmd.minPerms[i])) {
			let missingPermissionsName = permissionList[cmd.minPerms[i]]
			if(Array.isArray(cmd.minPerms[i])) {
				let missingPermissionsName = ""
				for(let perArray = 0; perArray < cmd.minPerms[i].length; ++perArray) {
					let missingPermissionsNameFromArray = permissionList[cmd.minPerms[i][perArray]]
					missingPermissionsName + `\`${missingPermissionsNameFromArray}\`, `
					if(cmd.minPerms[i][perArray + 1]) missingPermissionsName + ", "
				}
			}
			return messageCreate.channel.send(`${reject.userFault.privilege.missingPermissions} ${missingPermissionsName.slice(0, missingPermissionsName.length - 2)}`)
		}
		if(args[0] === "-h") return messageCreate.channel.send(cmd.utilisation)
		if(cmd.category === "creator" && messageCreate.author.id !== botConfig.botOwnerID) return messageCreate.channel.send(reject.userFault.privilege.creatorOnly)
		cmd.execute(messageCreate, args, prefix)
		await db.add(`cmdsRan_${messageCreate.author.id}`, 1)
	} catch(errorInMessageCreate) {
		console.error(errorInMessageCreate)
		console.error(`${currentDateTime()}+++\n${messageCreate.content}\n+++`)
		return messageCreate.channel.send(reject.weAreScrewed.executionError)
	}
}
