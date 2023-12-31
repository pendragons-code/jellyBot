const { defaults } = require("../../../../config.json")
const { getRedditPost } = require("../../../functions/reddit/getPost.js")
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
		let subreddit = args[0].replace("r/", "")
		if(sfwRedditCheck(subreddit) === "nsfw") return messageCreate.channel.send("The subreddit you requested is marked NSFW!")
		let postData = await getRedditPost(subreddit)
		let redditPostEmbed = new EmbedBuilder()
		redditPostEmbed.setTitle(postData.title)
		redditPostEmbed.setURL(`https://reddit.com/${postData.permalink}`)
		redditPostEmbed.setDescription(`👍 ${postData.ups} | 👎 ${postData.downs} | 💬 ${postData.num_comments}`)
		redditPostEmbed.setColor(defaults.defaultEmbedColor)
		redditPostEmbed.setFooter({ text: defaults.defaultFooterText })
		redditPostEmbed.setTimestamp()
		if(postData.url)redditPostEmbed.setImage(postData.url)
		messageCreate.channel.send({ embeds: [redditPostEmbed] })
	}
}
