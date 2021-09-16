import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {createStore ,applyMiddleware} from 'redux';

import rootreducer from './reducers/index';

const loggerMiddleware = createLogger();

export default createStore(
    rootreducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ));