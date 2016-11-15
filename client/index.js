import React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import setAuthorizationToken from './utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import { setCurrentUser } from './actions/authActions'

import rootReducer from "./rootReducer";


import routes from './routes';

const store = createStore(
	rootReducer,
	//thunk dispatch ASYNC
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
		)
		
	)


if(localStorage.jwtToken) {
	const token = localStorage.jwtToken;

	setAuthorizationToken(token);
	store.dispatch(setCurrentUser(jwt.decode(token)));
}


render (
	<Provider store= { store }>
		<Router  history={ browserHistory } routes={ routes } />
	</Provider>,
	document.getElementById('app'))