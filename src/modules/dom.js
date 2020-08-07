import app from './app';

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

	return {
		clearSuggestions,
		displaySuggestions,
		initEventListeners,
	}
})();