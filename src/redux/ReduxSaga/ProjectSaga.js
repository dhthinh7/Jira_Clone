import { call, put, takeLatest } from 'redux-saga/effects';
import { projectService } from '../../Services/ProjectService';
import { STATUS_CODE } from '../../utils/constain/setting';
import { history } from '../../utils/history';
import { JiraNotification } from '../../utils/JiraNotification/JiraNotification';
import { ADD_USER_PROJECT_SAGA, CLOSE_FORM_DRAWER, CREATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, GET_LIST_PROJECT, GET_LIST_PROJECT_SAGA, GET_PROJECT_MEMBERS, GET_PROJECT_MEMBERS_SAGA, REMOVE_USER_PROJECT_API, UPDATE_PROJECT_SAGA } from "../contains/contains";

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
function* getProjectDetailSaga(action) {
  try {
    let { data, status } = yield call(() => projectService.getProjectDetail(action.projectId));
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

export function* listenGetProjectDetailSaga() {
  yield takeLatest(GET_PROJECT_MEMBERS_SAGA, getProjectDetailSaga)
}

// Remove user all project
function* removeUserSaga(action) {
  try {
    const { status } = yield call(() => projectService.removeUser(action.userIdProject));
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
function* addUserProjectSaga(action) {
  try {
    const { status } = yield call(() => projectService.assignUserProject(action.userProject))

    if (status === STATUS_CODE.SUCCESS) {
      JiraNotification('success', 'Add members successfully !');
      yield put({
        type: GET_LIST_PROJECT_SAGA,
      })
    }
  } catch (err) {
    console.log(err)
  }
}

export function* listenAddUserProjectSaga() {
  yield takeLatest(ADD_USER_PROJECT_SAGA, addUserProjectSaga);
}

// Delete Project
function* deleteProjectSaga(action) {
  try {
    let { status } = yield call(() => projectService.deleteProject(action.projectId));
    if (status === STATUS_CODE.SUCCESS) {
      JiraNotification('success', 'Delete project successfully !');
      yield put({ type: GET_LIST_PROJECT_SAGA });
    }
  } catch (error) {
    JiraNotification('error', 'Delete project fail !');
    console.log(error);
  }
}

export function* listenDeleteProjectSaga() {
  yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}

// Update Project
function* updateProjectSaga(action) {
  try {
    let { status } = yield call(() => projectService.updateProject(action.projectUpdate));
    if (status === STATUS_CODE.SUCCESS) {
      JiraNotification('success', 'Update project successfully !');
      yield put({
        type: CLOSE_FORM_DRAWER
      })
      // Reload list project
      yield put({
        type: GET_LIST_PROJECT_SAGA
      })
    }
  } catch (error) {
    JiraNotification('error', 'Update project fail !');
    console.log(error)
  }
}

export function* listenUpdateProjectSaga() {
  yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}

// Create Project
function* createProjectAuthorizationSaga(action) {
  try {
    let {data, status} = yield call(()=>projectService.createProjectAuthorization(action.newProject))
    if (status === STATUS_CODE.SUCCESS) {
      JiraNotification('success', 'Create project successfully !');
      history.push('/')
    }
  } catch (error) {
    JiraNotification('error', 'Create project fail !')
    console.log(error)
  }
}

export function* listenCreateProjectAuthorizationSaga() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProjectAuthorizationSaga);
}
