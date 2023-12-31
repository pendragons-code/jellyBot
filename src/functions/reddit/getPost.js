const axios = require("axios")
/**
 * @param {string} subreddit - The name of the subreddit, without the usage of r/
 */
async function getRedditPost(subreddit) {
	let getRedditPostUrl = {
		method: "GET",
		url: `https://reddit.com/r/${subreddit}/random.json`
	}
	let results = await axios(getRedditPostUrl)
	let discordOnlyData = await results.data[0].data.children[0].data
	if(discordOnlyData.over18) return getRedditPost(subreddit)
	return discordOnlyData
}

module.exports = { getRedditPost }
