import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import promise from 'redux-promise';
import Board from './components/board';
import CardCreate from './components/card_create';
import NotFound from './components/not_found';
import Toaster from './components/toaster';
import CardEdit from './components/card_edit';
import axiosMiddleware from './middlewares/axios_middleware';
import client from './services/axios';
import ActiveViewCardModal from './components/active_view_card_modal';
import reducers from './reducers';
import Navigation from './containers/navbar';
import './style/style.styl';

const createStoreWithMiddleware = applyMiddleware(promise, axiosMiddleware(client))(createStore);
/**/

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <div>
      <Toaster />
      <BrowserRouter>
        <div>
          <Route path="*" component={Navigation}/>
          <div className="app container-fluid">
            <Switch>
              <Route exact path="/card/create" component={CardCreate}/>
              <Route exact path="/card/edit/:id" component={CardEdit}/>
              <Route exact path="/" component={Board}/>
              <Route exact path="/404" component={NotFound}/>
              <Redirect to="/404"/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
      <ActiveViewCardModal />
    </div>
  </Provider>
  , document.querySelector('#app'));
