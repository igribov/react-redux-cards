import React, {Component} from 'react';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import {connect} from 'react-redux';
//import moment from 'moment';
import _ from 'lodash';
import 'react-datepicker/dist/react-datepicker.css';
import { createCard, updateCard } from '../actions';
import { COLUMNS_CONFIG } from './board';

const CARD_STATUSES = _.reduce(COLUMNS_CONFIG, (res, conf, key) => {
  return {...res, [key]: conf.title };
}, {});


class CardForm extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    const methodName = values.id ? 'update' : 'create';

    return this.props[`${methodName}Card`](values)
      .then(({error}) => {
        if(error && error.response.status == 400) {
          const formErrors = _.reduce(error.response.data, (res, item) => {
            return { ...res, [item.property_path] : item.message };
          }, {});

          throw new SubmissionError(formErrors);
        }
        this.props.onAfterSubmit();
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
          {...field.input}
        />
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
        <select
          className="form-control"
          {...field.input}
        >
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
    const {handleSubmit} = this.props;
    // todo delete id field from form
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="id"
          type="hidden"
          component={this.renderInput}
        />
        <Field
          label="Заголовок"
          name="title"
          component={this.renderInput}
        />
        <Field
          label="Статус"
          name="status"
          options={CARD_STATUSES}
          component={this.renderSelect}
        />
        <Field
          label="Описание"
          name="description"
          component={this.renderTextarea}
        />
        <button type="submit" className="btn btn-primary">Отправить</button>
        &nbsp;
        <Link to="/" className="btn btn-danger">Отмена</Link>
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
