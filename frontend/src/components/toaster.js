import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class Toaster extends Component {

  constructor(props) {
    super(props);
    this.dismissToast = this.dismissToast.bind(this);
  }

  dismissToast(toastId, delay) {
    setTimeout(() => toast.dismiss(toastId), delay);
  }

  render() {
    const {errors, error, success} = this.props;
    const autoClose = this.props.autoClose || 2000;

    if (errors && typeof errors.length != 'undefined') {
      const message = errors.map(err => err.message).join('');
      this.dismissToast(toast.error(message), autoClose);
    }

    if (error) {
      this.dismissToast(toast.error(error.message), autoClose);
    }

    if (success) {
      this.dismissToast(toast.success(success.message), autoClose);
    }

    return (
      <ToastContainer
        position="top-right"
        autoClose={autoClose}
        newestOnTop={true}/>
    );
  }
}

function mapStateToProps({toaster}) {
  return toaster;
}

Toaster.propTypes = {
  errors: PropTypes.array,
  error: PropTypes.object,
  success: PropTypes.object,
  autoClose: PropTypes.number
};

export default connect(mapStateToProps)(Toaster);
