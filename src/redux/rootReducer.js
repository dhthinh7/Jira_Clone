import {applyMiddleware, combineReducers, createStore } from 'redux';
import ProjectReducer from './reducers/ProjectReducer';
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from './ReduxSaga/rootSaga';
import { UserReducer } from './reducers/UserReducer';
import { DrawerReducer } from './reducers/DrawerReducer';
import { StatusReducer } from './reducers/StatusReducer';
import { PriorityReducer } from './reducers/PriorityReducer';
import { TypeReducer } from './reducers/TypeReducer';
import { ProjectCategoryReducer } from './reducers/ProjectCategoryReducer';
import { LoadingReducer } from './reducers/LoadingReducer';
import { TaskDetailReducer } from './reducers/TaskReducer';
import { CommentReducer } from './reducers/CommentReducer';

// Creat redux-saga
const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
  ProjectReducer,
  UserReducer,
  DrawerReducer,
  StatusReducer,
  PriorityReducer,
  TypeReducer,
  ProjectCategoryReducer,
  LoadingReducer,
  TaskDetailReducer,
  CommentReducer,
})

const store = createStore(rootReducer, applyMiddleware(middleWareSaga));

middleWareSaga.run(rootSaga);

export default store;