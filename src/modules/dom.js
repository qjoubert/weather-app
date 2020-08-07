import app from './app';
import formatter from './formatter';

export default (function() {

	const suggestionsList = document.querySelector('.suggestions-list');
	const cityForm = document.querySelector('form');
	const cityInput = document.querySelector('.city-input');

	function clearSuggestions() {
		while (suggestionsList.firstElementChild) {
			suggestionsList.firstElementChild.remove();
		}
		suggestionsList.style.display = 'none';
	}

	function createSuggestion(city) {
		const li = document.createElement('li');
		const btn = document.createElement('button');

		li.classList.add('suggestion-list__item');
		btn.classList.add('suggestion-btn');
		btn.textContent = `${city.name}, ${city.country}`;
		btn.setAttribute('data-id', city.id);

		li.append(btn);
		return li;
	}

	function displayCurrentWeather(city, weatherData) {
		const container = document.querySelector('.current-weather-display');
		const weather = weatherData.weather[0];
		const main = weatherData.main;
		const wind = weatherData.wind;

		container.querySelector('.city-name').textContent = weatherData.name;
		container.querySelector('.date').textContent = new Date().toLocaleDateString();
		container.querySelector('.weather-description').textContent = weather.description;
		container.querySelector('.weather-icon').src = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
		container.querySelector('.weather-icon').alt = 'an icon representing the current weather';
		container.querySelector('.temperature').textContent = `${main.temp}°C`;
		container.querySelector('.feels-like').textContent = `température ressentie: ${main.feels_like}°C`;
		container.querySelector('.humidity').textContent = `humidité: ${main.humidity} %`;
		container.querySelector('.pressure').textContent = `pression: ${main.pressure} hPa`;
		container.querySelector('.wind-speed').textContent = `vitesse du vent: ${wind.speed} m/s`;
		container.querySelector('.wind-direction').textContent = `direction du vent: ${formatter.windDegToText(wind.deg)}`;
	}

	function displaySuggestions(cities) {
		while (suggestionsList.firstElementChild) {
			suggestionsList.firstElementChild.remove();
		}

		if (!cities) {
			suggestionsList.style.display = 'none';
			return;
		};

		cities.forEach(city => {
			const li = createSuggestion(city);
			suggestionsList.append(li);
		});

		suggestionsList.style.display = 'block';
	}

	function initEventListeners() {
		cityForm.addEventListener('submit', (e) => {
			app.onFormSubmit(e);
		});

		cityInput.addEventListener('input', (e) => {
			app.onCityInput(e);
		});

		cityInput.addEventListener('focus', () => {
			document.addEventListener('keydown', selectCitySuggestion);

			cityInput.addEventListener('blur', () => {
				document.removeEventListener('keydown', selectCitySuggestion);
			});
		});
	}

	function selectCitySuggestion(e) {
		// keyCode 38 = up arrow
		// keyCode 40 = down arrow
		if (e.keyCode != 38 && e.keyCode != 40) return;

		const selected = suggestionsList.querySelector('button.selected');
		const suggestions = [...document.querySelectorAll('.suggestion-btn')];

		if (suggestions.length == 0) return;

		if (!selected) {
			const index = e.keyCode == 40 ? 0 : suggestions.length - 1;
			const newSelection = suggestions[index];
			newSelection.classList.add('selected');

			cityInput.value = newSelection.textContent;
			cityInput.setAttribute('data-id', newSelection.getAttribute('data-id'));
		} else {
			const currentIndex = suggestions.findIndex(btn => btn.classList.contains('selected'));
			const newIndex = e.keyCode == 40 ? currentIndex + 1 : currentIndex - 1;

			selected.classList.remove('selected');

			if (suggestions[newIndex]) {
				const newSelection = suggestions[newIndex];
				newSelection.classList.add('selected');
				cityInput.value = newSelection.textContent;
				cityInput.setAttribute('data-id', newSelection.getAttribute('data-id'));
			} else {
				cityInput.value = app.getTypedCity();
				cityInput.setAttribute('data-id', '');
			}
		}
	}

	function updateBodyBg(className) {
		document.body.classList.remove('clear-sky', '')
	}

	return {
		clearSuggestions,
		displayCurrentWeather,
		displaySuggestions,
		initEventListeners,
		updateBodyBg,
	}
})();