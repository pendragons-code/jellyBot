const { readdirSync } = require("fs")
console.log(`${currentDateTime()} [Event Service]: Started loading!`)
const eventDirs = readdirSync("./src/events")
for(dirs of eventDirs) {
	const perEventFile = readdirSync(`./src/events/${dirs}`).filter(file => file.endsWith(".js"))
	for(file of perEventFile) {
		const event = require(`../events/${dirs}/${file}`)
		console.log(`${currentDateTime()} [Events Loaded]: ${file} from ${dirs}!`)
		bot.on(file.replace(".js", ""), event.bind(null, bot))
		delete require.cache[require.resolve(`../events/${dirs}/${file}`)]
	}
}
console.log(`${currentDateTime()} [Event Service]: Done loading!`)
