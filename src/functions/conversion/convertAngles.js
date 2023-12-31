function convertAngles(queriedAmt, unit) {
	let degree
	switch(unit) {
		case "degree":
			degree = queriedAmt
			break
		case "radian":
			degree = queriedAmt * 180 / Math.PI
			break
		case "arcsecond":
			degree = queriedAmt / 3600
			break
		case "gradian":
			degree = queriedAmt * 180 / 200
			break
		case "milliradian":
			degree = queriedAmt * 180 / (1000 * Math.PI)
			break
		case "arcminute":
			degree = queriedAmt / 60
			break
	}
	
	let radian = (unit == "radian") ? queriedAmt : degree * (Math.PI / 180)
	let gradian = (unit == "gradian") ? queriedAmt : degree * (200 / 180)
	let milliradian = (unit == "milliradian") ? queriedAmt : radian * 1000
	let minuteOfArc = (unit == "arcminute") ? queriedAmt : degree * 60
	let secondOfArc = (unit == "arcsecond") ? queriedAmt : degree * 3600
	return `degree: ${degree}\nradian: ${radian}\ngradian: ${gradian}\nmilliradian: ${milliradian}\narc minutes: ${minuteOfArc}\narc seconds: ${secondOfArc}`
}

module.exports = { convertAngles }
