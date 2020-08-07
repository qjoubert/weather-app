
export default (function() {

	function windDegToText(deg) {
		let windDirection;
		const table = {
			N : { from: 348.75, to: 11.25 },
			NNE: { from: 11.25, to: 33.75 },
			NE: { from: 33.75, to: 56.25 },
			ENE: { from: 56.25, to: 78.75 },
			E: { from: 78.75, to: 101.25 },
			ESE: { from: 101.25, to: 123.75 },
			SE: { from: 123.75, to: 146.25 },
			SSE: { from: 146.25, to: 168.75 },
			S: { from: 168.75, to: 191.25 },
			SSW: { from: 191.25, to: 213.75 },
			SW: { from: 213.75, to: 236.25 },
			WSW: { from: 236.25, to: 258.75 },
			W: { from: 258.75, to: 281.25 },
			WNW: { from: 281.25, to: 303.75 },
			NW: { from: 303.75, to: 326.25 },
			NNW: { from: 326.25, to: 348.75}
		}

		for (const key of Object.keys(table)) {
			if (deg >= table[key].from && deg < table[key].to) {
				windDirection = key;
				break;
			}
		}

		return windDirection;
	}

	return {
		windDegToText,
	};
})();