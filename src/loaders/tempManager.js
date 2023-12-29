(async () => {
	const { unban } = require("../functions/moderation/unban.js")
	const tempBan = await db.get(`tempBan`)
	const tempMute = await db.get(`tempMute`) // expects to return json
	// sample data structure:
	//
	// tempBan
	// [{
	// 	guildID: "guildID",
	// 	userID: "userID",
	// 	endDuration: dateObject
	// }, ...]
	//
	// in this guild the user should be unbanned by 22-12-2023-22-57-33
	//
	

	if(tempBan === null && tempMute === null) return
	if(tempBan.length < 1 && tempMute.length < 1) {
		await db.delete(`tempBan`)
		await db.delete(`tempMute`)
		return
	}
	// Ban section
	for(let i = 0; i < [tempBan.length - 1]; ++i) {
		let currentDateObj = new Date() // i want acuracy to the second so yes im putting this in the for loop
		let banDetails = tempBan[i]
		if(banDuration > currentDateObj) {
			let server = bot.cache.guilds.get(banDetails.serverID)
			return unban(banDetails.userID, banDetails.reason, banDetails.time, banDetails.serverID, banDetails.moderator, server)
		}
		let banDuration = new Date(banDetails.endDuration) - currentDateObj
		setTimeout(async function() {
			let server = bot.cache.guilds.get(banDetails.serverID)
			unban(banDetails.userID, banDetails.reason, banDetails.time, banDetails.serverID, banDetails.moderator, server)
		}, banDuration)
	}

	for(let i = 0; i < [tempMute.length - 1]; ++i) {
		let currentDateObj = new Date()
		let muteDetails = tempMute[i]
		if(muteDuration > currentDateObj){
			let server = bot.cache.guilds.get(muteDetails.serverID)
			return unmute(muteDetails.userID, muteDetails.reason, muteDetails.time, muteDetails.serverID, muteDetails.moderator, server)
		}
		let muteDuration = new Date(muteDetails.endDuration) - currentDateObj
		setTimeout(async function() {
			let server = bot.cache.guilds.get(muteDetails.serverID)
			unmute(muteDetails.userID, muteDetails.reason, muteDetails.time, muteDetails.serverID, muteDetails.moderator, server)
		}, muteDuration)
	}





})().catch((error) => {
	console.error(currentDateTime())
	console.error(error)
	console.log(currentDateTime())
	console.log(error)
})


// so this file is essentially a background process that runs during the start up to ensure that the stuff that are temp will have a timer started
// new timers will be created in the tempMute() tempBan() function, but other than that this is because in the event some shit goes down the timers will get reset and temp history is ignored
// this file is made to counter that issue, although there is likely a much better method.
//
// most of the code that i write will have errors so yes i am not expecting this bot to work
