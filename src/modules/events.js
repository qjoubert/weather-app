import app from './app';

export default (function() {

	const locationForm = document.querySelector('form');
	const locationInput = document.querySelector('.location-input');

	function addAllEventListeners() {
		locationForm.addEventListener('submit', (e) => {
			app.onFormSubmit(e);
		});

		locationInput.addEventListener('input', (e) => {
			app.onLocationInput(e);
		});
	}

	return {
		addAllEventListeners,
	}
})();