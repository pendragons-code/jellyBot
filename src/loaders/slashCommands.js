const { Collection } = require("discord.js")
const { readdirSync } = require("fs")
console.log(`${currentDateTime()} [SlashCommands Service]: Started loading!`)
bot.slashCommands = new Collection()
commandsArray = []
let slashCommandsDirs = readdirSync("./src/commands/slashCommands")
for(dirs of slashCommandsDirs) {
	let perSlashCommandsFile = readdirSync(`./src/commands/slashCommands/${dirs}`).filter(files => files.endsWith(".js"))
	for(file of perSlashCommandsFile) {
		const slashCommand = require(`../commands/slashCommands/${dirs}/${file}`)
		bot.slashCommands.set(slashCommand.name.toLowerCase(), slashCommand)
		console.log(`${currentDateTime()} [SlashCommands Loaded]: ${file} from ${dirs}!`)
		commandsArray.push(slashCommand)
		delete require.cache[require.resolve(`../commands/slashCommands/${dirs}/${file}`)]

	}
}

bot.on("ready", (bot) => {
	bot.application.commands.set(commandsArray)
})

console.log(`${currentDateTime()} [SlashCommands Service]: Done loading!`)
db.set(`slashCommandsAllCommands`, Array.from(bot.slashCommands.filter(x => x.name).keys()))
console.log(Array.from(bot.slashCommands.filter(x => x.name).keys()))
console.log(`${currentDateTime()} [DB Service]: Done loading commands into database! `)
