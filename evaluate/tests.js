const ev = (await import('./evaluators.js')).ev

const defaultEvaluator = {
	method: 'GET',
	title: '/hamsters',
	resource: () => '/hamsters',
	body: () => null
}

// Test för varje resurs i uppgiften
// checkResponse: funktion som testar mha HTTP statuskod, response body och ett HTML-element att skriva ut felmeddelande i

export const tests = (addEvaluator, data, separator) => [
	addEvaluator({
		...defaultEvaluator,
		checkResponse: (statusCode, body, el) => {
			data.hamsters = body  // all objects in collection
			return ev.status200(statusCode, el)
				&& ev.isArray(body, el)
				&& ev.arrayHasData(body, el)
			// check if contents ok
		}
	}),

	addEvaluator({
		...defaultEvaluator,
		method: 'POST',
		title: '/hamsters/  { add new hamster }',
		body: getNewObject,
		checkResponse: (statusCode, body, el) => {
			data.newId = body && body.id
			return ev.status200(statusCode, el)
				&& ev.objectHasId(body, el)
		}
	}),

	addEvaluator({
		...defaultEvaluator,
		title: '/hamsters/:id',
		resource: () => ('/hamsters/' + data.newId),
		checkResponse: (statusCode, body, el) => {
			return ev.status200(statusCode, el)
				&& ev.isHamster(body, el)
		}
	}),
	addEvaluator({
		...defaultEvaluator,
		title: '/hamsters/random',
		resource: () => ('/hamsters/random'),
		checkResponse: (statusCode, body, el) => {
			return ev.status200(statusCode, el)
				&& ev.isHamster(body, el)
		}
	}),

	addEvaluator({
		...defaultEvaluator,
		method: 'PUT',
		title: '/hamsters/:id',
		resource: () => ('/hamsters/' + data.newId),
		body: getChangeObject,
		checkResponse: (statusCode, body, el) => {
			return ev.status200(statusCode, el)
		}
	}),
	addEvaluator({
		...defaultEvaluator,
		method: 'PUT',
		title: '/hamsters/:id  (id that does not exist in db)',
		resource: () => ('/hamsters/id-does-not-exist'),
		body: getChangeObject,
		checkResponse: (statusCode, body, el) => {
			return ev.status404(statusCode, el)
		}
	}),
	addEvaluator({
		...defaultEvaluator,
		method: 'PUT',
		title: '/hamsters/:id  (no change object in body)',
		resource: () => ('/hamsters/' + data.newId),
		body: () => ({}),  // cannot send NULL or "" because JSON.parse in Express can't handle it
		checkResponse: (statusCode, body, el) => {
			return ev.status400(statusCode, el)
		}
	}),

	addEvaluator({
		...defaultEvaluator,
		method: 'DELETE',
		title: '/hamsters/:id',
		resource: () => ('/hamsters/' + data.newId),
		checkResponse: (statusCode, body, el) => {
			return ev.status200(statusCode, el)
		}
	}),
	addEvaluator({
		...defaultEvaluator,
		title: '/hamsters/:id  (the removed hamster)',
		resource: () => ('/hamsters/' + data.newId),
		checkResponse: (statusCode, body, el) => {
			return ev.status404(statusCode, el)
		}
	}),
	addEvaluator({
		...defaultEvaluator,
		method: 'DELETE',
		title: '/hamsters/:id  (id that does not exist in db)',
		resource: () => ('/hamsters/id-does-not-exist'),
		checkResponse: (statusCode, body, el) => {
			return ev.status404(statusCode, el)
		}
	}),

	addEvaluator({
		...defaultEvaluator,
		title: '/cutest',
		resource: () => ('/cutest/'),
		checkResponse: (statusCode, body, el) => {
			let cuteScore = body.defeats ? (body.wins / body.defeats) : 0
			return ev.status200(statusCode, el)
				&& ev.isHamster(body, el)
				&& data.hamsters.filter(h => (h.defeats ? (h.wins / h.defeats) : 0) === cuteScore).length > 0
		}
	}),


	// separator - VG below
	separator(),


	// GET /matches
	addEvaluator({
		...defaultEvaluator,
		title: '/matches',
		resource: () => '/matches',
		checkResponse: (statusCode, body, el) => {
			data.matches = body || []
			return ev.status200(statusCode, el)
				&& ev.isArray(body, el)
				&& ev.arrayHasData(body, el)
		}
	}),

	// POST /matches
	addEvaluator({
		...defaultEvaluator,
		method: 'POST',
		title: '/matches  { new match object #1 }',
		resource: () => '/matches',
		body: () => getNewMatchObject1(getMatch1Winner(data)),
		checkResponse: (statusCode, body, el) => {
			data.newMatchId1 = body && body.id
			// console.log('POST /matches ', statusCode, body);
			return ev.status200(statusCode, el)
				&& ev.objectHasId(body, el)
		}
	}),
	addEvaluator({
		...defaultEvaluator,
		method: 'POST',
		title: '/matches  { new match object #2 }',
		resource: () => '/matches',
		body: () => getNewMatchObject2(getMatch1Winner(data)),
		checkResponse: (statusCode, body, el) => {
			data.newMatchId2 = body && body.id
			return ev.status200(statusCode, el)
				&& ev.objectHasId(body, el)
		}
	}),

	// GET /matches/:id
	addEvaluator({
		...defaultEvaluator,
		title: '/matches/:id',
		resource: () => '/matches/' + data.newMatchId1,
		checkResponse: (statusCode, body, el) => {
			return ev.status200(statusCode, el)
				&& ev.objectHasProp(body, 'winnerId', el)
				&& ev.objectHasProp(body, 'loserId', el)
		}
	}),
	// GET /matches  - must update data.matches for following test to work
	addEvaluator({
		...defaultEvaluator,
		title: '/matches',
		resource: () => '/matches',
		checkResponse: (statusCode, body, el) => {
			data.matches = body || []
			return ev.status200(statusCode, el)
				&& ev.isArray(body, el)
				&& ev.arrayHasData(body, el)
		}
	}),


	// GET /matchWinners/:id
	addEvaluator({
		...defaultEvaluator,
		title: '/matchWinners/:id',
		resource: () => '/matchWinners/' + getMatch1Winner(data),
		checkResponse: (statusCode, body, el) => {
			const winnerId = getMatch1Winner(data)
			let winnerCount = 0
			data.matches.forEach(m => {
				if( m.winnerId == winnerId ) winnerCount++;
			})
			if( body && body.length != winnerCount) {
				console.log(`GET /matchWinners id=${winnerId}, count=${winnerCount}`);
				console.log(`GET /matchWinners previous matches =`, data.matches);
				console.log(`GET /matchWinners server response =`, body);
			}
			return ev.status200(statusCode, el)
				&& ev.isArray(body, el)
				&& ev.arrayLength(winnerCount, body, el)
				&& ev.isMatchObject(body[0], el)
		}
	}),
	// GET /matchWinners/id-not-exist
	addEvaluator({
		...defaultEvaluator,
		title: '/matchWinners/not-exist',
		resource: () => '/matchWinners/id-that-does-not-exist',
		checkResponse: (statusCode, body, el) => {
			return ev.status404(statusCode, el)
		}
	}),

	// GET /winners
	addEvaluator({
		...defaultEvaluator,
		title: '/winners  (winningest 5 hamsters)',
		resource: () => '/winners',
		checkResponse: (statusCode, body, el) => {
			const maxWins = data.hamsters ? data.hamsters.reduce((acc, cur) => Math.max(cur.wins, acc), 0) : 0;
			if( isNaN(+maxWins) ) {
				console.log('You have an error in the database. There is (most likely) at least one (hamster) document that does not have a value for "wins". Clean up the database and try again.');
			}
			return ev.status200(statusCode, el)
				&& ev.isArray(body, el)
				&& ev.arrayLength(5, body, el)
				&& body.every(h => ev.isHamster(h))
				&& ev.hasWinValue(maxWins, body, el)
		}
	}),
	// GET /losers
	addEvaluator({
		...defaultEvaluator,
		title: '/losers  (5 most defeated hamsters)',
		resource: () => '/losers',
		checkResponse: (statusCode, body, el) => {
			const maxDefeats = data.hamsters ? data.hamsters.reduce((acc, cur) => Math.max(cur.defeats, acc), 0) : 0;
			return ev.status200(statusCode, el)
			&& ev.isArray(body, el)
			&& ev.arrayLength(5, body, el)
			&& body.every(h => ev.isHamster(h))
			&& ev.hasLoseValue(maxDefeats, body, el)
		}
	}),

	// DELETE /matches/:id
	addEvaluator({
		...defaultEvaluator,
		method: 'DELETE',
		title: '/matches/:id',
		resource: () => '/matches/' + data.newMatchId1,
		checkResponse: (statusCode, body, el) => {
			return ev.status200(statusCode, el)
		}
	}),
	// GET /matches/:id  (the removed match)
	addEvaluator({
		...defaultEvaluator,
		title: '/matches/:id  (the removed match)',
		resource: () => '/matches/' + data.newMatchId,
		checkResponse: (statusCode, body, el) => {
			return ev.status404(statusCode, el)
		}
	}),
	// DELETE /matches/:id  (the removed match)
	addEvaluator({
		...defaultEvaluator,
		method: 'DELETE',
		title: '/matches/:id  (the removed match)',
		resource: () => '/matches/' + data.newMatchId,
		checkResponse: (statusCode, body, el) => {
			return ev.status404(statusCode, el)
		}
	})
]

function getNewObject() {
	return {
	   "name":"Banan",
	   "age":5,
	   "favFood":"morot",
	   "loves":"springa i hamsterhjulet",
	   "imgName":"hamster-2.jpg",
	   "wins":0,
	   "defeats":0,
	   "games":0
	}
}
function getChangeObject() {
	return { wins: 5, games: 8 }
}
function getNewMatchObject1(winner) {
	return { winnerId: winner, loserId: '2222kjnkbbt' }
}
function getNewMatchObject2(loser) {
	return { winnerId: '2222kjnkbbt', loserId: loser }
}
function getMatch1Winner(data) {
	return data.matches ? data.matches[0].winnerId : '-'
}
