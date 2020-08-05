
import config from '../../config.js';

export default (function() {

	async function getCityData(location) {
		if (!location) return;

		const CITY_LIST = require('../assets/current.city.list.json');
		const cities = CITY_LIST.filter(city => city.name.toLowerCase() == location);
		if (cities.length > 0) {
			cities.forEach(city => {				
				const cityInfo = `${city.name}, ${city.country}`;
				console.log(cityInfo);
			});
		}
	}

	async function getCurrentWeatherData(location) {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${config.API_KEY}`;
		const response = await fetch(url, { mode: 'cors' });
		const weatherData = await response.json();
		return weatherData;
	}

	async function get5DaysWeatherData(location) {
		const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${config.API_KEY}`;
		const response = await fetch(url, { mode: 'cors' });
		const weatherData = await response.json();
		return weatherData;
	}

	return {
		getCityData,
		getCurrentWeatherData,
		get5DaysWeatherData,
	}
})();