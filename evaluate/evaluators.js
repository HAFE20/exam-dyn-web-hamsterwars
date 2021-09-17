function statusCode(status, code, el, msg) {
	if( status == code ) return true;
	el.innerHTML = msg
	return false
}

export const ev = {
	status200: (status, element) => statusCode(status, 200, element, 'Response status is not 200. (ok)'),
	status400: (status, element) => statusCode(status, 400, element, 'Response status is not 400. (bad request)'),
	status404: (status, element) => statusCode(status, 404, element, 'Response status is not 404. (not found)'),

	isArray: (body, element) => {
		if( Array.isArray(body) ) return true;
		element.innerHTML = 'Does not respond with an array.'
		return false
	},
	arrayLength: (len, body, element) => {
		if( Array.isArray(body) && body.length == len ) return true;
		if( !Array.isArray(body) )
			element.innerHTML = `Responds with something that is not an array.`
		else
			element.innerHTML = `Responds with an array with length ${body.length} (should be ${len}).`
		return false
	},
	arrayHasData: (body, element) => {
		if( body.length >= 1 ) return true;
		element.innerHTML = 'Array does not have any data.'
		return false
	},

	isHamster: (object, element) => {
		// Test if object has certain properties
		if( object && ['name', 'age', 'favFood', 'loves', 'imgName', 'wins', 'defeats', 'games'].every(p => object.hasOwnProperty(p)) )
			return true
		element.innerHTML = 'Did not respond with a hamster object.'
		return false
	},
	isMatchObject: (object, element) => {
		if( object && ['winnerId', 'loserId'].every(p => object.hasOwnProperty(p)) )
			return true
		element.innerHTML = 'Not a proper match object.'
		return false
	},
	hasValue: (value, prop, hamsterArray, element, message) => {
		if( hamsterArray.some(h => h[prop] == value) )
			return true
		element.innerHTML = message
		return false
	},
	hasWinValue: (wins, hamsterArray, element) => ev.hasValue(wins, 'wins', hamsterArray, element, 'The hamster with the most wins is not in the array.'),
	hasLoseValue: (defeats, hamsterArray, element) => ev.hasValue(defeats, 'defeats', hamsterArray, element, 'The hamster with the most defeats is not in the array.'),

	objectHasId: (object, element) => {
		if( object && object.id )
			return true
		element.innerHTML = 'Must respond with an object that has an id property: { id: "id from database here" }'
		return false
	},
	objectHasProp: (object, prop, element) => {
		if( object && object.hasOwnProperty(prop) )
			return true
		element.innerHTML = `Responded with an object that does not have the property "${prop}".`
		return false
	}
}
