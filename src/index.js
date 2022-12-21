import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from './Redux/Store';
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import App from './App.jsx';

ReactDOM.render(
	<Provider store={Store}>
		<ToastContainer/>

		<App />
	</Provider>,
	document.getElementById('root')
);
