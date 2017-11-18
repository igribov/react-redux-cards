import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

class Toaster extends Component {

  render() {
    const {errors, error, success} = this.props;

    console.log('render --> ', this.props);

    if(errors && typeof errors.length != 'undefined') {
      const message = errors.map(err => err.message).join('');
      toast.error(message);
    }

    if(error) {
      toast.error(error.message);
    }

    if(success) {
      toast.success(success.message);
    }

    return <ToastContainer
          position="top-right"
          autoClose={1000}
          newestOnTop={true}
          pauseOnHover/>
  }
}

function mapStateToProps({toaster}) {
    return toaster;
}

export default connect(mapStateToProps)(Toaster);
