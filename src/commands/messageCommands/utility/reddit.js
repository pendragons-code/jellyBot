const { defaults } = require("../../../../config.json")
const { getRedditPost } = require("../../../functions/reddit.js")
const { sfwRedditCheck } = require("../../../functions/reddit/checkSfw.js")
const { EmbedBuilder } = require("discord.js")
module.exports = {
	name: "reddit",
	aliases: [],
	category: "utility",
	utilisation: "reddit <subreddit>",
	desc: "Extracts a random post from mentioned subreddit, it would reject nsfw subreddits.",
	maxArgs: 1,
	async execute(messageCreate, args, prefix) {
		if(!args[0]) return messageCreate.channel.send(reject.userFault.args.missing)
		if(args[0].startsWith("r/")) args[0].replace("r/", "")
		if(sfwRedditCheck(args[0]) === "nsfw") return messageCreate.channel.send("The subreddit you requested is nsfw!")
		let postData = await getRedditPost(args[0])
		let redditPostEmbed = new EmbedBuilder()
		redditPostEmbed.setTitle(postData.title)
		redditPostEmbed.setURL(`https://reddit.com/${postData.permalink}`)
		redditPostEmbed.setDescription(`👍 ${postData.ups} | 👎 ${postData.downs} | 💬 ${postData.comments}`)
		redditPostEmbed.setColor(defaults.defaultEmbedColor)
		redditPostEmbed.setFooter({ text: defaults.defaultFooterText })
		redditPostEmbed.setTimestamp()
		if(postData.url)redditEmbed.setImage(postData.url)
		messageCreate.channel.send({ embeds: [redditPostEmbed] })
	}
}
