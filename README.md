# Add the bot!!!
Add the bot [here](https://jellypan.club)!


# Jellypan

A badly written bot made with discord.js. Why is it badly written? Honestly because im not using things like classes (for example) and stuff like that to simplify a lot of things.           
Anyhow, do not expect this bot to work at all.          

# how to get it started

Quite a lot of the files are full of incomplete code, so you will have to figure out parts of the code that you have to delete.
```
npm i
npm update
// let's hope nothing had an update so radical that i have to rewrite something again
touch .env.production
// put your tokens and api keys here
npm run deployVanilla
```


# current file structure

If you see `// delete blah blah` it means that these are the files that I recommend you delete (untested or incomplete)

```
.
├── assets
│   ├── bannedWords
│   │   └── bannedWords.json
│   ├── permissionsList.json
│   └── responseComponents
│       └── rejection.json
├── config.json
├── Dockerfile
├── ecosystem.config.js
├── env.example
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── buttons
│   ├── commands
│   │   ├── messageCommands
│   │   │   ├── conversion
│   │   │   │   ├── angles.js
│   │   │   │   ├── currency.js
│   │   │   │   ├── distance.js
│   │   │   │   ├── speed.js
│   │   │   │   └── temperature.js
│   │   │   ├── core
│   │   │   │   ├── help.js
│   │   │   │   ├── ping.js
│   │   │   │   └── prefix.js
│   │   │   ├── covid
│   │   │   │   ├── country.js
│   │   │   │   └── global.js
│   │   │   ├── creator
│   │   │   ├── moderation
│   │   │   │   ├── antiswear.js // delete this
│   │   │   │   ├── cooldowns.js // delete this
│   │   │   │   ├── disable.js
│   │   │   │   ├── enable.js
│   │   │   │   └── viewcooldown.js // delete this
│   │   │   └── utility
│   │   │       ├── cmdran.js
│   │   │       ├── lyrics.js
│   │   │       ├── poll.js
│   │   │       ├── reddit.js
│   │   │       ├── tenor.js
│   │   │       ├── todos.js
│   │   │       ├── unicodeConvert.js
│   │   │       ├── urbanDictionary.js
│   │   │       └── usage.js
│   │   └── slashCommands
│   │       ├── conversion
│   │       │   ├── angles.js
│   │       │   ├── currency.js
│   │       │   ├── distance.js
│   │       │   ├── speed.js
│   │       │   └── temperature.js
│   │       ├── core
│   │       │   ├── help.js
│   │       │   ├── ping.js
│   │       │   └── prefix.js
│   │       ├── covid
│   │       │   ├── country.js
│   │       │   └── global.js
│   │       └── utility
│   │           ├── cmdran.js
│   │           ├── lyrics.js
│   │           ├── reddit.js
│   │           └── usage.js
│   ├── events
│   │   ├── client
│   │   │   ├── error.js
│   │   │   ├── rateLimit.js
│   │   │   └── ready.js
│   │   └── guild // delete some here
│   │       ├── guildCreate.js
│   │       ├── guildDelete.js
│   │       ├── interactionCreate.js
│   │       ├── messageCreate.js
│   │       ├── messageReactionAdd.js
│   │       ├── messageReactionRemove.js
│   │       └── messageUpdate.js
│   ├── functions
│   │   ├── arrayManagement
│   │   │   └── countInArray.js
│   │   ├── conversion
│   │   │   ├── convertAngles.js
│   │   │   ├── convertDistance.js
│   │   │   ├── convertSpeed.js
│   │   │   └── convertTemperature.js
│   │   ├── currentDateTime.js
│   │   ├── mentions
│   │   │   ├── channel.js
│   │   │   └── user.js
│   │   ├── moderation
│   │   │   ├── ban.js
│   │   │   ├── mute.js
│   │   │   ├── tempban.js
│   │   │   ├── tempmute.js
│   │   │   ├── unban.js
│   │   │   ├── unmute.js
│   │   │   ├── unwarn.js
│   │   │   └── warn.js
│   │   ├── randomGeneration
│   │   │   └── randomStringGen.js
│   │   ├── reddit
│   │   │   ├── checkSfw.js
│   │   │   └── getPost.js
│   │   └── usage
│   │       └── resourceUsage.js
│   ├── loaders
│   │   ├── bot.js
│   │   ├── database.js
│   │   ├── events.js
│   │   ├── messageCommands.js
│   │   ├── slashCommands.js
│   │   ├── tempManager.js // delete this
│   │   └── utils.js
│   └── utils
│       ├── moderation // delete this
│       │   └── antiswear.js
│       └── security
│           └── tokenSecurity.js
└── TODO.md

34 directories, 88 files

```

# Future steps

I will include a list of APIs that are used by this bot over here.
