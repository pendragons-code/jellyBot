async function countInArray(array, element) {
	let count = 0
	for(let i = 0; i < array.length; ++i) {
		if(array[i] === element) ++count;
	}
	return count;
}
// the reason why i put this in async is because I could possibly be using this for things like data for the db
// while it is unlikely that there will actually be a need for it to be async and there probably is no need i just left it there Xd
module.exports = { countInArray }
