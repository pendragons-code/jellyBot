const { Collection } = require("discord.js")
const { readdirSync } = require("fs")
console.log(`${currentDateTime()} [MessageCommands Service]: Started loading!`)
bot.messageCommands = new Collection()
let messageCommandDirs = readdirSync("./src/commands/messageCommands")
for(dirs of messageCommandDirs) {
	let perMessageCommandFile = readdirSync(`./src/commands/messageCommands/${dirs}`)
	for(file of perMessageCommandFile) {
		const command = require(`../commands/messageCommands/${dirs}/${file}`)
		bot.messageCommands.set(command.name.toLowerCase(), command)
		console.log(`${currentDateTime()} [MessageCommands Loaded]`)
		delete require.cache[require.resolve(`../commands/messageCommands/${dirs}/${file}`)]
	}
}

console.log(`${currentDateTime()} [MessageCommands Service]: Done loading!`)
db.set(`messageCommandsAllCommands`, Array.from(bot.messageCommands.filter(x => x.name).keys()))
console.log(Array.from(bot.messageCommands.filter(x => x.name).keys()))
console.log(`${currentDateTime()} [DB Service]: Done loading commands into database! `)
