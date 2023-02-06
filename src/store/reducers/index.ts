import { combineReducers } from 'redux';

import menu from './menu';
import login from './login'

const reducers = combineReducers({ menu,login });

export default reducers;
