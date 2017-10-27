import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise';

import Board from './components/board';
import CardCreate from './components/card_create';
import CardEdit from './components/card_edit';
import ActiveViewCardModal from './components/active_view_card_modal';
import reducers from './reducers';

import './style/style.styl';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<div>
			<BrowserRouter>
				<Switch>
					<Route path="/card/create" component={CardCreate}/>
					<Route path="/card/edit/:id" component={CardEdit}/>
					<Route path="/" component={Board}/>
				</Switch>
			</BrowserRouter>
			<ActiveViewCardModal />
		</div>
	</Provider>
	, document.querySelector('#app'));
