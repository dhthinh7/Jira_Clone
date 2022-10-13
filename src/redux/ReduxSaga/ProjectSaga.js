import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { projectService } from '../../Services/ProjectService';
import { STATUS_CODE } from '../../utils/constain/setting';
import { history } from '../../utils/history';
import { JiraNotification } from '../../utils/JiraNotification/JiraNotification';
import { ADD_USER_PROJECT_SAGA, CLOSE_FORM_DRAWER, CREATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, GET_LIST_PROJECT, GET_LIST_PROJECT_SAGA, GET_PROJECT_DETAIL, GET_PROJECT_DETAIL_SAGA, GET_PROJECT_DETAIL_SHOW_LOADING_ONE_TIME, HIDE_LOADER, REMOVE_USER_PROJECT_API, SHOW_LOADER, UPDATE_PROJECT_SAGA, UPDATE_STATUS_TASK_SAGA } from "../contains/contains";

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
        type: GET_PROJECT_DETAIL,
        projectDetail: data.content
      })
    }
  } catch (error) {
    history.push('./projectManagement');
    console.log(error);
  }
}

export function* listenGetProjectDetailSaga() {
  yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga)
}

// Get project detail and show loading only one time
function* getProjectDetailLoadingSaga(action) {
  let { projectId } = action;
  yield put({ type: SHOW_LOADER });
  yield put({ type: GET_PROJECT_DETAIL_SAGA, projectId });
  yield delay(500);
  yield put({ type: HIDE_LOADER });
}

export function* listenGetProjectDetailLoadingSaga() {
  yield takeLatest(GET_PROJECT_DETAIL_SHOW_LOADING_ONE_TIME, getProjectDetailLoadingSaga)
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
    let { data, status } = yield call(() => projectService.createProjectAuthorization(action.newProject))
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

// Update status task
function* updateStatusTaskSaga(action) {
  console.log("taskUpdateStatus", action.taskUpdateStatus);

  try {
    let { data, status } = yield call(() => projectService.updateStatusTask(action.taskUpdateStatus));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: action.taskUpdateStatus.projectId
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export function* listenUpdateStatusTaskSaga() {
  yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateStatusTaskSaga);
}