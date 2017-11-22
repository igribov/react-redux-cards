import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Board from './board';
import CardCreate from './card_create';
import NotFound from './not_found';
import Toaster from './toaster';
import AppStatus from '../containers/app_status';
import ButtonToolBar from '../containers/button_tool_bar';
import CardEdit from './card_edit';
import ActiveViewCardModal from './active_view_card_modal';
import Navigation from './navbar';
import {onServiceWorkerUpdateReady} from '../actions/sw';
import {bindActionCreators} from 'redux';

class App extends Component {

  constructor(props) {
    super(props);
    this.addListeners = this.addListeners.bind(this);
    this._trackInstalling = this._trackInstalling.bind(this);
  }

  componentDidMount() {
    if (
      'serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || window.location.hostname === 'localhost')
    ) {
      const reg = runtime.register();
      this.addListeners(reg);
    }
  }

  addListeners(reg) {

    registerEvents(reg, {
      onInstalled: () => {
        console.log('[SW] Installed');
      },
      onUpdateReady: () => {
        console.log('[SW] UpdateReady');
        this.props.onServiceWorkerUpdateReady();
      },
      onUpdated: () => {
        window.location.reload();
      },
    });

  }

  _trackInstalling(worker) {
    worker.addEventListener('statechange', () => {
      if (worker.state == 'installed') {
        this.props.onServiceWorkerUpdateReady(worker);
      }
    });
  }

  renderBoard() {

    const buttons = [
      {title: 'Create', to: '/card/create'}
    ];
    const {serverOnline} = this.props.appStatus;
    return (
      <div className="container-fluid">
        { serverOnline ? <div className="container-fluid"><ButtonToolBar buttons={buttons}/></div> : null }
        <Board serverOnline={!serverOnline}/>
      </div>
    );
  }

  render() {
    const {appStatus} = this.props;

    return (
      <div>
        <Toaster />
        <AppStatus
          serverOnline={appStatus.serverOnline}
          newVersionReady={appStatus.newVersionReady}
        />
        <BrowserRouter>
          <div>
            <Route path="*" component={Navigation}/>
            <div className="app container-fluid">
              <Switch>
                <Route exact path="/card/create" component={CardCreate}/>
                <Route exact path="/card/edit/:id" render={(props)=>(<CardEdit {...props} disable={!appStatus.serverOnline}/>)}/>
                <Route exact path="/" render={this.renderBoard.bind(this)}/>
                <Route exact path="/404" component={NotFound}/>
                <Redirect to="/404"/>
              </Switch>
            </div>
          </div>
        </BrowserRouter>
        <ActiveViewCardModal />
      </div>
    );
  }
}

function mapStateToProps({appStatus, toaster}) {
  return {appStatus, toaster};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onServiceWorkerUpdateReady,
  }, dispatch);
}

App.propTypes = {
  onServiceWorkerUpdateReady: PropTypes.func,
  appStatus: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
