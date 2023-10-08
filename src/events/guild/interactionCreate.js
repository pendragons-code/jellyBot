const { EmbedBuilder, InteractionType } = require("discord.js")
const { botConfig } = require("../../../config.json")
const permissionList = require("../../../assets/permissionsList.json")
const reject = require("../../../assets/responseComponents/rejection.json")
module.exports = async (bot, interactionCreate) => {
	if(interactionCreate.type == InteractionType.ApplicationCommand) {
		let editMode = await db.get("editMode")
		let blackListedUser = await db.get(`blacklisted_${interactionCreate.user.id}`)
		if(editMode == "on" && interactionCreate.user.id != botConfig.botOwnerID) return
		if(blackListedUser == "yes") return interactionCreate.reply(reject.userFault.privilege.blackListedUser)
		const slashCmd = bot.slashCommands.get(interactionCreate.commandName)
		if(!slashCmd) return // not possible but in the event that the api for discord is slow that means that slashcommands that does not exist could still be listed on there.
		if(slashCmd.minPerms) {
			let errorEmbed = new EmbedBuilder()
			errorEmbed.setTitle("Error!")
			for(let i = 0; i < slashCmd.minPerms.length; ++i) {
				if(!interactionCreate.member.permissions.has(slashCmd.minPerms[i])) {
					if(!Array.isArray(slashCmd.minPerms[i])) return interactionCreate.reply(`${reject.userFault.privilege.missingPermissions} ${permissionList[slashCmd.minPerms[i]]}`)
					let missingPermissionsName = ""
					for(let perArray = 0; perArray < slashCmd.minPerms[i].length; ++perArray) {
						let missingPermissionsNameFromArray = permissionList[slashCmd.minPerms[i][perArray]]
						missingPermissionsName + `\`${missingPermissionsNameFromArray}\`, `
					}
				}
				return interactionCreate.reply(`${reject.userFault.privilege.missingPermissions} ${missingPermissionsName.slice(0, missingPermissionsName.length - 2)}`)
			}
		}
		try {
			const commandDisable = await db.get(`disabledCommand_${interactionCreate.guild.id}_${slashCmd.name}`)
			const categoryDisable = await db.get(`disabledCategory_${interactionCreate.guild.id}_${slashCmd.category}`)
			if(commandDisable == "disabled" || categoryDisable == "disabled") return interactionCreate.reply(reject.userFault.privilege.disabledCommand)
			if(slashCmd.category === "creator" && interactionCreate.user.id !== botConfig.botOwnerID) return interactionCreate.reply("You are not allowed to use this command!")
			slashCmd.execute(interactionCreate)
			await db.add(`cmdsRan_${interactionCreate.user.id}`, 1)

		} catch(error) {
			console.error(`${currentDateTime()} [jelly bot service] [slashCommands runtime]: ERROR`)
			console.error(error)
			return interactionCreate.reply(reject.weAreScrewed.executionError)
		}
		if(interactionCreate.type === InteractionType.MessageComponent) {
			let ButtonID = await JSON.parse(interactionCreate.customId)
			let ButtonFile = await ButtonID.ffb
			if(!ButtonFile) return
			delete require.cache[require.resolve(`../../buttons/${ByttonFile}.js`)]
			const button = require(`../../buttons/${ButtonFile}.js`)
			if(button) return button({ interactionCreate, ButtonID })
		}
	}
}
