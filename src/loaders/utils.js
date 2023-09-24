const { Collection } = require("discord.js")
const { readdirSync } = require("fs")
console.log(`${currentDateTime()} [Utils Service]: Starting loading!`)
bot.utils = new Collection()

let utilDirs = readdirSync("./src/utils")
for(dirs of utilDirs) {
	const perUtilFile = readdirSync(`./src/utils/${dirs}`).filter(files => files.endsWith(".js"))
	for(file of perUtilFile) {
		const util = require(`../utils/${dirs}/${file}`)
		bot.utils.set(util.name.toLowerCase(), util)
		console.log(`${currentDateTime()} [Utils Loaded]: ${file} from ${dirs}!`)
		delete require.cache[require.resolve(`../utils/${dirs}/${file}`)]
	}
}
console.log(`${currentDateTime()} [Utils Service]: Done Loaded!`)
