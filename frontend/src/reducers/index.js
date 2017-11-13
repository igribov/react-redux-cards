import { combineReducers } from 'redux';
import CardsReduser from './reducer_cards';
import ToasterReduser from './reducer_toaster';
import ActiveViewCardReduser from './reducer_active_view_card';
import { reducer as formReducer } from 'redux-form';
import { dialogReducer } from 'redux-dialog';

const rootReducer = combineReducers({
  cards: CardsReduser,
  form: formReducer,
	dialogReducer: dialogReducer,
	activeViewCard: ActiveViewCardReduser,
  toaster: ToasterReduser
});

export default rootReducer;
