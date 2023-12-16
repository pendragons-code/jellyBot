const { QuickDB } = require("quick.db")
const db = new QuickDB()

async function oreo() {
	await db.set("oreo.oreo", "oreo")
	let data = await db.get("oreo")
	console.log(data["biscuit"])
	console.log(data["oreo"])
}
oreo()