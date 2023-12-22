async function warnUser(userID, reason, time, serverID, moderator) {
	await db.push(`warns_${serverID}_${userID}`, { reason: reason, time: time, moderator: moderator })
}

module.exports = { warnUser }
