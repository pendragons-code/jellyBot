const { cpuUsage } = require("os-utils")
const { defaults } = require("../../../config.json")
module.exports = async (bot) => {
	let editMode = await db.get("editMode")
	cpuUsage(function(cpuUsageDetails) {
		const rawMemoryUsage = process.memoryUsage.rss() / 1024 / 1024
		const estimatedMemoryUsage = Math.round(rawMemoryUsage * 100) / 100
		console.log(`${currentDateTime()} [Status and uptime]: Logged in as ${bot.user.tag}\n\nReady on ${bot.guilds.cache.size} servers and helping about ${bot.users.cache.size} users!\n\nHardware report: \nMemory: ${estimatedMemoryUsage}\nCpu Usage: ${Math.round(cpuUsageDetails * 100) / 100}% cpu`)
	})
	if(editMode === "on") bot.user.setActivity("Editmode is on!")
	bot.user.setActivity(`Use "${defaults.defaultPrefix} help" for commands!`)
	bot.guilds.cache.map(guild => {
		console.log(guild.name)
		console.log(guild.id)
	})
}
