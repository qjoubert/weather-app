import dom from './dom';
import weatherApi from './weatherApi';

export default (function() {

	function getTypedCity() {
		return sessionStorage.getItem('typedCityInputVal');
	}

	function init() {
		dom.initEventListeners();
	}

	function onFormSubmit(e) {
		e.preventDefault();
		storeTypedCity('');
		const cityInput = e.target.firstElementChild;
		const city = cityInput.value;
		const cityId = cityInput.getAttribute('data-id');

		cityInput.blur();
		cityInput.value = '';
		cityInput.setAttribute('data-id', '');
		dom.clearSuggestions();

		weatherApi
			.getCurrentWeather(city.toLowerCase(), cityId)
			.then(weatherData => {
				dom.displayCurrentWeather(city, weatherData)
			})
			.catch(error => console.log(error));

		weatherApi
			.get5DaysWeather(city, cityId)
			.then(data => console.log('5 days weather data:', data))
			.catch(error => console.log(error));
	}

	function onCityInput(e) {
		const cityInput = e.target;
		const city = cityInput.value.toLowerCase();
		if (!city) return;
		storeTypedCity(city);

		const cities = weatherApi.getCities(city);
		dom.displaySuggestions(cities);
	}

	function storeTypedCity(val) {
		sessionStorage.setItem('typedCityInputVal', val);
	}

	return {
		getTypedCity,
		init,
		onFormSubmit,
		onCityInput,
	}
})();