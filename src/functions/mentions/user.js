async function getUserFromMention(mentionedUser) {
	if(!mentionedUser) return
	if(mentionedUser.startsWith("@<") && mentionedUser.endsWith(">")) {
		mention = mentionedUser.slice(2, -1)
		if(mention.startsWith("!")) mention.slice(1)
	}
	return bot.users.cache.get(mention)
}

module.exports = { getUserFromMention }
