module.exports = {
	app: [
		{
			name: "jellypan",
			script: "./src/loaders/bot.js",
			env_production: {
				NODE_ENV: "production"
			},
			env_development: {
				NODE_ENV: "development"
			},
			watch_delay: 1000,
			ignore_watch: ["node_modules"],
			max_memory_restart: "1G",
			out_file: "./logfile",
			error_file: "./errorfile"
		}
	]
}
