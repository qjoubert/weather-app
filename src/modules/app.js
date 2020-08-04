
export default (function() {

	function onFormSubmit(e) {
		e.preventDefault();
		const locationInput = e.target.firstElementChild;
		const location = locationInput.value;

		console.log(location);
		locationInput.value = '';
	}

	return {
		onFormSubmit,
	}
})();