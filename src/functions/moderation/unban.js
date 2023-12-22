async function unban(userID, reason, time, serverID, moderator, server) {
	// we expect the server object to be something more like messageCreate.guild
	server.members.unban(userID)
	await db.push(`unban_${serverID}_${userID}`, { reason: reason, time: time, moderator: moderator })
}

module.exports = { unban }
