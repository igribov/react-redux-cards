import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import {connect} from 'react-redux';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { createCard, updateCard } from '../actions';

class CardForm extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  renderInput(field) {
    const {meta: {touched, error}} = field;
    const hasDanger = touched && error;

    return (
      <div className={`form-group ${hasDanger ? ' has-danger' : ''}`}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type={field.type || 'text'}
          {...field.input}
        />
        <div className="text-help">
          {hasDanger ? error : ''}
        </div>
      </div>
    );
  }

  renderTextarea(field) {
    const {meta: {touched, error}} = field;
    const hasDanger = touched && error;

    return (
      <div className={`form-group ${hasDanger ? ' has-danger' : ''}`}>
        <label>{field.label}</label>
        <textarea
          className="form-control"
          rows="5"
          {...field.input}>
        </textarea>
        <div className="text-help">
          {hasDanger ? error : ''}
        </div>
      </div>
    );
  }

  renderDatePicker(field) {
    const {meta: {touched, error}} = field;
    const hasDanger = touched && error;

    return (
      <div className={`form-group ${hasDanger ? ' has-danger' : ''}`}>
        <label>{field.label}</label>
        <DatePicker
          dateFormat="Y-M-D"
          className="form-control"
          selected={field.input.value ? moment(field.input.value) : null}
          {...field.input}>
        </DatePicker>
        <div className="text-help">
          {hasDanger ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    if(!values.id) {
      this.props.dispatch(this.props.createCard(values))
        .then(() => this.props.onAfterSubmit());

    } else {
      this.props.dispatch(this.props.updateCard(values))
        .then(() => this.props.onAfterSubmit());
    }
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="id"
          type="hidden"
          component={this.renderInput}
        />
        <Field
          label="Title For Task"
          name="title"
          component={this.renderInput}
        />
        <Field
          label="Description"
          name="description"
          component={this.renderTextarea}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        &nbsp;
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'Enter a title';
  }
  if (!values.description) {
    errors.description = 'Enter a description';
  }

  // if errors is empty, the form is ready to submit
  return errors;
}

export default reduxForm({
  validate,
  form: 'CardForm', // unique value
})(
  connect(null, {createCard, updateCard})(CardForm)
);