const { defaults } = require("../../../../config.json")
const { getRedditPost } = require("../../../functions/reddit/getPost.js")
const { sfwRedditCheck } = require("../../../functions/reddit/checkSfw.js")
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
module.exports = {
	name: "reddit",
	category: "utility",
	description: "A command that scrapes reddit posts!",
	utilisation: "Extracts a random post from mentioned subreddit, it would reject nsfw subreddits.",
	options: [
		{
			name: "subreddit",
			description: "Returns results for this subreddit!",
			type: ApplicationCommandOptionType.String,
			required: true
		}
	],
	async execute(interactionCreate) {
		let rawSubreddit = interactionCreate.options._hoistedOptions[0].value
		let subreddit = rawSubreddit.replace("r/", "")
		if(sfwRedditCheck(subreddit) === "nsfw") return interactionCreate.reply("The subreddit you requested is marked NSFW.")
		
		let postData = await getRedditPost(subreddit)
		let redditPostEmbed = new EmbedBuilder()
		redditPostEmbed.setTitle(postData.title)
		redditPostEmbed.setURL(`https://reddit.com/${postData.permalink}`)
		redditPostEmbed.setDescription(`👍 ${postData.ups} | 👎 ${postData.downs} | 💬 ${postData.num_comments}`)
		redditPostEmbed.setColor(defaults.defaultEmbedColor)
		redditPostEmbed.setFooter({ text: defaults.defaultFooterText })
		redditPostEmbed.setTimestamp()
		if(postData.url)redditPostEmbed.setImage(postData.url)
		interactionCreate.reply({ embeds: [redditPostEmbed] })

	}
}
