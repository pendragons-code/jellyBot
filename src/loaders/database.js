const { QuickDB } = require("quick.db")
global.db = new QuickDB({ filePath: "database/database.sqlite" })
console.log(`${currentDateTime()} [DB Service]: Started!`)
