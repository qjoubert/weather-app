'use strict';

import './styles/main.scss';
import app from './modules/app';

document.querySelector('form').addEventListener('submit', (e) => {
	app.onFormSubmit(e);
});