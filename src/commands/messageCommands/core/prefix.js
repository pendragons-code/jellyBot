const { PermissionsBitField } = require("discord.js")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "prefix",
	aliases: [],
	category: "core",
	utilisation: "prefix <newprefix here>",
	desc: "Changes the prefix to the bot!",
	maxArgs: 1,
	minPerms: [PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers],
	async execute(messageCreate, args, prefix) {
		if(!args[0]) return messageCreate.channel.send(reject.userFault.args.missing)
		//might have to implement cuss checker
		await db.set(`prefix_${messageCreate.guild.id}`, args[0])
		.catch((error) => {
			console.error(`${currentDateTime()}`)
			console.error(error)
			return messageCreate.channel.send(reject.weAreScrewed.executionError)
		})
		return messageCreate.channel.send(`Prefix has been changed to **${args[0]}**`)
	}
}
