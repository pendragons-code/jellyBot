function convertSpeed(queriedAmt, unit) {
	let metrePerSecond = ""
	switch(unit) {
		case "metrePerSecond":
			metrePerSecond = queriedAmt
			break
		case "milePerHour":
			metrePerSecond = queriedAmt / 0.44704
			break
		case "footPerSecond":
			metrePerSecond = queriedAmt / 0.3048
			break
		case "kilometrePerHour":
			metrePerSecond = queriedAmt / 3.6
			break
		case "knot":
			metrePerSecond = queriedAmt / 1.852
			break
	}
	let kilometrePerHour = ( unit == "kilometrePerHour" ) ? queriedAmt : metrePerSecond * 3.6
	let knot = ( unit == "knot" ) ? queriedAmt : metrePerSecond * 1.94384
	let milePerHour = ( unit == "milePerHour" ) ? queriedAmt : metrePerSecond * 2.23694
	let footPerSecond = ( unit == "footPerSecond") ? queriedAmt : metrePerSecond * 1.46667
	return `metre Per Second: ${metrePerSecond}\nkilometre Per Hour: ${kilometrePerHour}\nknot: ${knot}\nfoot Per Second: ${footPerSecond}\nmile Per Hout: ${milePerHour}`
}

module.exports = { convertSpeed }
