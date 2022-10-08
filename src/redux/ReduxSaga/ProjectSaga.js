import { call, put, takeLatest } from 'redux-saga/effects';
import { projectService } from '../../Services/ProjectService';
import { userServices } from '../../Services/UserService';
import { STATUS_CODE } from '../../utils/constain/setting';
import { ADD_USER_PROJECT_SAGA, GET_LIST_PROJECT, GET_LIST_PROJECT_SAGA, GET_PROJECT_MEMBERS, GET_PROJECT_MEMBERS_SAGA, GET_USER, REMOVE_USER, REMOVE_USER_PROJECT_API } from "../contains/contains";

// Get all project
function* getListProjectSaga() {
  try {
    const { data, status } = yield call(() => projectService.getAllProject());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_LIST_PROJECT,
        projectList: data.content
      })
    }
  } catch (err) {
    console.log(err);
  }
}

export function* listenGetListProjectSaga() {
  yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga)
}

// Get project detail
function *getProjectDetailSaga(action) {
  try {
    let {data, status} = yield call(()=>projectService.getProjectDetail(action.projectId));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_MEMBERS,
        projectMembers: data.content.members
      })
    }
  } catch (error) {
    console.log(error);
  }
}

export function *listenGetProjectDetailSaga() {
  yield takeLatest(GET_PROJECT_MEMBERS_SAGA, getProjectDetailSaga)
}



// Remove user all project
function* removeUserSaga(action) {
  try {
    const { status } = yield call(() => projectService.removeUser(action.userIdProject) );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_LIST_PROJECT_SAGA
    })
    }
  } catch (err) {
    console.log(err);
  }
}

export function* listenRemoveUserSaga() {
  yield takeLatest(REMOVE_USER_PROJECT_API, removeUserSaga)
}


// Add user to project
function *addUserProjectSaga(action) {
  try {
    const {data, status} = yield call(()=>projectService.assignUserProject(action.userProject))
  
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_LIST_PROJECT_SAGA,
      })
    }
  } catch (err) {
    console.log(err)
  }
}

export function *listenAdddUserProjectSaga() {
  yield takeLatest(ADD_USER_PROJECT_SAGA, addUserProjectSaga);
}