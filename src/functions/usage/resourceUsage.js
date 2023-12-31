async function projectUsage(toEmbedCpuUsage) {
	const rawMemoryUsage = process.memoryUsage.rss() / 1024 / 1024
	const estimatedMemoryUsage = Math.round(rawMemoryUsage)
	let description = `\nCPU usage: ${Math.round(toEmbedCpuUsage * 100) / 100}%\nMemory: ${estimatedMemoryUsage}MB`
	return description
}
module.exports = { projectUsage }
