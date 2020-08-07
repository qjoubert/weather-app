
import config from '../../config.js';

export default (function() {

	function getCities(inputVal) {
		const CITY_LIST = require('../assets/current.city.list.json');
		const cities = [];

		for (const city of CITY_LIST) {
			if (city.name.toLowerCase() == inputVal) {
				const sameCity = cities.find(c => {
					return c.name == city.name && c.country == city.country;
				});
				if (sameCity) continue;
				cities.push(city);
			}
		}

		if (cities.length > 0) return cities;
		else return null;
	}

	async function getCurrentWeather(city, cityId = null) {
		const url = 
			cityId ? `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&lang=fr&appid=${config.API_KEY}` : 
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${config.API_KEY}`;

		const response = await fetch(url, { mode: 'cors' });
		const weather = await response.json();
		return weather;
	}

	async function get5DaysWeather(city, cityId = null) {
		const url = 
			cityId ? `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=metric&appid=${config.API_KEY}` :
			`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${config.API_KEY}`;
		const response = await fetch(url, { mode: 'cors' });
		const weather = await response.json();
		return weather;
	}

	// async function getWeatherIcon(key) {
	// 	const url = `http://openweathermap.org/img/wn/${key}@2x.png`;
		
	// }

	return {
		getCities,
		getCurrentWeather,
		get5DaysWeather,
	}
})();