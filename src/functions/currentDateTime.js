global.currentDateTime = function currentDateTime() {
	const dateObject = new Date()
	const formattedDate = [
		dateObject.getDate().toString().padStart(2, "0"),
		(dateObject.getMonth() + 1).toString().padStart(2, "0"),
		dateObject.getFullYear(),
		dateObject.getHours().toString().padStart(2, "0"),
		dateObject.getMinutes().toString().padStart(2, "0"),
		dateObject.getSeconds().toString().padStart(2, "0")
	].join("-")
	return `[time: ${formattedDate}]`
	// returns the exact time data, i was tryna avoid using an external package to do this.
}
