async function getChannelFromMention(mentionedChannel) {
	if(!mentionedChannel) return
	if(mentionedChannel.startsWith("#!")) {
		mention = mentionedChannel.slice(2)
		return messageCreate.guild.channel.cache.get(mention)
	}
	mention = mentionedChannel.slice(1)
	return messageCreate.guild.channel.cache.get(mention)
}

module.exports = { getChannelFromMention }
