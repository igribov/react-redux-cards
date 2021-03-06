import React, {Component} from 'react';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import {connect} from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import _ from 'lodash';
import 'react-datepicker/dist/react-datepicker.css';
import { createCard, updateCard } from '../actions';
import { COLUMNS_CONFIG } from './board';

const CARD_STATUSES = _.reduce(COLUMNS_CONFIG, (res, conf, key) => {
  return {...res, [key]: conf.title };
}, {});

export const FORM_TYPE_CREATE = 'FORM_TYPE_CREATE';
export const FORM_TYPE_UPDATE = 'FORM_TYPE_UPDATE';

class CardForm extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    const methodName = values.id ? 'update' : 'create';

    return this.props[`${methodName}Card`](values)
      .then(action => {
        const {error} = action;
        if (error && !error.response.ok) {
          const formErrors = _.reduce(error.response.data, (res, item) => {
            return { ...res, [item.property_path] : item.message };
          }, {});

          throw new SubmissionError(formErrors);
        }
        this.props.onAfterSubmit(action.payload.data);
      });
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
          {...field.input} />
        <div className="text-help">
          {hasDanger ? error : ''}
        </div>
      </div>
    );
  }

  renderSelect(field) {
    const {meta: {touched, error}} = field;
    const hasDanger = touched && error;

    return (
      <div className={`form-group ${hasDanger ? ' has-danger' : ''}`}>
        <label>{field.label}</label>
        <select className="form-control" {...field.input}>
          {
            _.map(field.options, (opt, val) => <option value={val} key={val}>{opt}</option>)
          }
        </select>
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

  render() {
    const {handleSubmit, updateForm, disable} = this.props;
    // todo delete id field from form
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        {
          updateForm ?
            <Field
              name="id"
              type="hidden"
              component={this.renderInput} />
            :
            null
        }
        <Field
          label="Title"
          name="title"
          component={this.renderInput} />
        {
          updateForm ?
            <Field
              label="Status"
              name="status"
              options={CARD_STATUSES}
              component={this.renderSelect} />
            :
            null
        }
        <Field
          label="Description"
          name="description"
          component={this.renderTextarea} />
        <button disabled={disable} type="submit" className="btn btn-primary">{updateForm ? 'Update' : 'Create'}</button>
        &nbsp;
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  ['title', 'description'].forEach((requiredFiled) => {
    if (!values[requiredFiled]) {
      errors[requiredFiled] = 'Enter ' + requiredFiled;
    }
  });

  // if errors is empty, the form is ready to submit
  return errors;
}

CardForm.propTypes = {
  onAfterSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  updateForm: PropTypes.bool,
  disable: PropTypes.bool
};

export default reduxForm({
  validate,
  form: 'CardForm', // unique value
})(
  connect(null, {createCard, updateCard})(CardForm)
);
