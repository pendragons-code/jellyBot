require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })
const { Client, GatewayIntentBits } = require("discord.js")
global.bot = new Client({
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildWebhooks,
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessageTyping,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildScheduledEvents,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.AutoModerationConfiguration,
		GatewayIntentBits.AutoModerationExecution,
		GatewayIntentBits.GuildModeration
	]
})

require("../functions/currentDateTime.js")
require("./database.js")
require("./slashCommands.js")
require("./messageCommands.js")
require("./events.js")
require("./utils.js")
require("./tempManager.js")
console.log(`PID: ${process.pid}`)
process.traceDeprecation = true
bot.login(process.env.token)
