import { createStore, applyMiddleware } from 'redux';
import looger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [looger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;