async function unwarnUser(warnNumber, userID, reason, time, serverID, moderator) {
	// basically we remove the warn from warns but we add the warn to the unwarn history
	// this allows a moderator to check who made an unwarn and why and what the details of the warn that was unwarned were
	
	// we are assuming a null check has already been done
	const warns = await db.get(`warns_${serverID}_${userID}`)
	let warnToRemove = warns[warnNumber - 1]
	await db.push(`unwarnHistory_${serverID}_${userID}`, { warn: warnToRemove, moderator: moderator, time: time, reason: reason })
	await db.pull(`warns_${serverID}_${userID}`, warnToRemove)

}

module.exports = { unwarnUser }
