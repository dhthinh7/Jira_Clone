import {applyMiddleware, combineReducers, createStore } from 'redux';
import ProjectReducer from './reducers/ProjectReducer';
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from './ReduxSaga/rootSaga';
import { UserReducer } from './reducers/UserReducer';
import { DrawerReducer } from './reducers/DrawerReducer';
import { StatusReducer } from './reducers/StatusReducer';
import { PriorityReducer } from './reducers/PriorityReducer';

// Creat redux-saga
const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
  ProjectReducer,
  UserReducer,
  DrawerReducer,
  StatusReducer,
  PriorityReducer
})

const store = createStore(rootReducer, applyMiddleware(middleWareSaga));

middleWareSaga.run(rootSaga);

export default store;