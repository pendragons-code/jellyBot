async function unmute(role, member, userID, reason, time, serverID, moderator) {
	await db.push(`unmute_${serverID}_${userID}`, { reason: reason, time: time, moderator: moderator })
	member.roles.remove(role)
}
// https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/understanding/roles.md
module.exports = { unmute }
