const { EmbedBuilder, PermissionsBitField } = require("discord.js")
const { defaults } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "disable",
	aliases: [],
	category: "moderation",
	utilisation: "disable <category/command> <category name/command name>",
	desc: "Disables commands, user must have at the very least, kick or ban members permissions.",
	minPerms: [PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers],
	maxArgs: 2,
	async execute(messageCreate, args, prefix) {
		if(!args[1]) return messageCreate.channel.send(reject.userFault.args.missing)
		let disableEmbed = new EmbedBuilder()
		disableEmbed.setColor(defaults.defaultEmbedColor)
		disableEmbed.setFooter({ text: defaults.defaultFooterText })
		disableEmbed.setTimestamp()
		if(args[0] === "category") {
			let availableCategories = bot.commands.map(command => command.category)
			let allPossibleCategoriesInAnArray = []
			for(commandCategory of availableCategories) {
				if(!allPossibleCategoriesInAnArray.includes(commandCategory)) allPossibleCategoriesInAnArray.push(commandCategory)
			}
			if(!allPossibleCategoriesInAnArray.includes(args[1]) || args[1] === "moderation") return messageCreate.channel.send(reject.userFault.args.invalid)
			await db.set(`disabledCategory_${messageCreate.guild.id}_${args[1]}`, "disabled")
			disableEmbed.setTitle("Category Disabled!")
			disableEmbed.setDescription(`Category ${args[1]} disabled.`)
			.catch((error) => {
				console.error(`${currentDateTime()} ${error}`)
				console.error(messageCreate.content)
				console.log(messageCreate.content)
				return messageCreate.channel.send(reject.weAreScrewed.executionError)
				// so i was actually advised to collect more info and directly collect the messageCreate itself, like i get it, on one hand, the more info to work with, the easier time i would have fixing it, i could even reach out to the person and ask what happened.
				// but at the same time i also don't wanna be accused of insane telemetry
			})
			.then(() => {
				return messageCreate.channel.send({ embeds: [disableEmbed] })
			})
		}
		if(args[0] === "command") {
			let cmd = bot.commands.get(args[1] || bot.commands.find(cmd => cmd.aliases) && cmd.aliases.includes(args[1]))
			if(!cmd.name) return messageCreate.channel.send(reject.userFault.args.invalid)
			if(cmd.name === "enable" || cmd.name === "disable") return messageCreate.channel.send(reject.userFault.args.invalid)
			disableEmbed.setTitle("Command Disabled!")
			disableEmbed.setDescription(`Command ${args[1]} disabled.`)
			await db.set(`disableCommand_${messageCreate.guild.id}_${cmd.name}`, "disabled")
			.catch((error) => {
				console.error(`${currentDateTime()} ${error}`)
				console.error(messageCreate.content)
				console.log(messageCreate.content)
				return messageCreate.channel.send(reject.weAreScrewed.executionError)
				// so i was actually advised to collect more info and directly collect the messageCreate itself, like i get it, on one hand, the more info to work with, the easier time i would have fixing it, i could even reach out to the person and ask what happened.
				// but at the same time i also don't wanna be accused of insane telemetry
			})
			.then(() => {
				return messageCreate.channel.send({ embeds: [disableEmbed] })
			})
		}
		
		return messageCreate.channel.send(reject.userFault.args.invalid)
	}
}
