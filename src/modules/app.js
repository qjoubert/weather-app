import events from './events';
import weatherApi from './weatherApi';

export default (function() {

	function init() {
		events.addAllEventListeners();
	}

	function onFormSubmit(e) {
		e.preventDefault();
		const locationInput = e.target.firstElementChild;
		const location = locationInput.value.toLowerCase();

		locationInput.value = '';
		locationInput.blur();

		weatherApi
			.getCurrentWeatherData(location)
			.then(data => console.log('current weather data:', data))
			.catch(error => console.log(error));

		weatherApi
			.get5DaysWeatherData(location)
			.then(data => console.log('5 days weather data:', data))
			.catch(error => console.log(error));
	}

	function onLocationInput(e) {
		const locationInput = e.target;
		const location = locationInput.value.toLowerCase();

		weatherApi.getCityData(location);
	}

	return {
		init,
		onFormSubmit,
		onLocationInput,
	}
})();