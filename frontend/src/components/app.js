import React, {Component} from 'react';
import {connect} from 'react-redux';
import runtime from 'serviceworker-webpack-plugin/lib/runtime'
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents'
import applyUpdate from 'serviceworker-webpack-plugin/lib/browser/applyUpdate'
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Board from './board';
import CardCreate from './card_create';
import NotFound from './not_found';
import Toaster from './toaster';
import AppStatus from '../containers/app_status';
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
      const registration = runtime.register().then(this.addListeners);
    }
  }

  addListeners(reg) {
    const that = this;
    if (reg.waiting) {
      this.props.onServiceWorkerUpdateReady(reg.waiting);
      return;
    }
    if (reg.installing) {
      this._trackInstalling(reg.installing);
      return;
    }
    reg.addEventListener('updatefound', function() {
      that._trackInstalling(reg.installing);
    });

    //let refreshing;
    navigator.serviceWorker.addEventListener('controllerchange', function() {
      window.location.reload();
    });

  }

  _trackInstalling(worker) {
    worker.addEventListener('statechange', () => {
      if (worker.state == 'installed') {
        this.props.onServiceWorkerUpdateReady(worker);
      }
    });
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
    );
  }
}

function mapStateToProps({appStatus, toaster}) {
  return {appStatus, toaster};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({onServiceWorkerUpdateReady}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
