import {applyMiddleware, combineReducers, createStore } from 'redux';
import ProjectReducer from './reducers/ProjectReducer';
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from './ReduxSaga/rootSaga';
import { UserReducer } from './reducers/UserReducer';

// Creat redux-saga
const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
  ProjectReducer,
  UserReducer
})

const store = createStore(rootReducer, applyMiddleware(middleWareSaga));

middleWareSaga.run(rootSaga);

export default store;