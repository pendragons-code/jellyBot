// check if sfw, returns status.
// I am now adopting a policy that does not allow nsfw items to be scraped.

/**
 * @param {string} subreddit - The name of the subreddit, without the usage of r/
 */
const axios = require("axios")
async function sfwRedditCheck(subreddit) {
	let redditUrlOptions = {
		method: "GET",
		url: `https://reddit.com/r/${subreddit}/about.json`
	}
	axios(redditUrlOptions).then((response) => {
		let subredditDetails = response.data.data
		if(subredditDetails.over18) return "nsfw"
	})
}

module.exports = { sfwRedditCheck }
