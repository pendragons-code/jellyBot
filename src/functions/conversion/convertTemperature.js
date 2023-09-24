function convertTemperature(queriedAmt, unit) {
	let celsius
	switch(unit) {
		case "celsius":
			celsius = queriedAmt
			break
		case "kelvin":
			celsius = queriedAmt - 273.15
			break
		case "fahrenheit":
			celsius = (queriedAmt - 32) * 5/9
			break
	}

	let kelvin = ( unit == "kelvin" ) ? queriedAmt : celsius + 273.15
	let fahrenheit = ( unit == "fahrenheit" ) ? queriedAmt : (celsius * 9/5) + 32
	return `celsius: ${celsius}\nkelvin: ${kelvin}\nfahrenheit: ${fahrenheit}`
}

module.exports = { convertTemperature }
