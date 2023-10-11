const { PermissionsBitField, ApplicationCommandOptionType } = require("discord.js")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "prefix",
	category: "core",
	description: "Changes the prefix to the bot!",
	utilisation: "prefix <newprefix here>",
	options: [
		{
			name: "prefix",
			description: "The new prefix.",
			type: ApplicationCommandOptionType.String,
			required: true
		}
	],
	//minPerms: [PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.Administrator],
	minPerms: [PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers],
	async execute(interactionCreate) {
		// add safety against cuss words here in the future
		let newPrefix = interactionCreate.options._hoistedOptions[0].value
		if(newPrefix.includes(" ")) return interactionCreate.reply("You cannot have a space in your prefix!")
		await db.set(`prefix_${interactionCreate.guild.id}`, newPrefix)
		.catch((error) => {
			console.error(`${currentDateTime()}`)
			console.error(error)
			return interactionCreate.reply(reject.weAreScrewed.executionError)
		})
		return interactionCreate.reply(`Prefix has changed to **${newPrefix}**`)
	}
}
