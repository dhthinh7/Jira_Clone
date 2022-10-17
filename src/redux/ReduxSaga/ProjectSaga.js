import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { projectService } from '../../Services/ProjectService';
import { STATUS_CODE, USER_LOGIN } from '../../utils/constain/setting';
import { history } from '../../utils/history';
import { JiraNotification } from '../../utils/JiraNotification/JiraNotification';
import { ADD_USER_PROJECT_SAGA, CHANGE_ASSIGNES, CHANGE_TASK_MODAL, CLOSE_FORM_DRAWER, CREATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, GET_LIST_PROJECT, GET_LIST_PROJECT_SAGA, GET_PROJECT_DETAIL, GET_PROJECT_DETAIL_SAGA, GET_PROJECT_DETAIL_SHOW_LOADING_ONE_TIME, GET_TASK_DETAIL_SAGA, GET_TASK_LIST, HIDE_LOADER, REMOVE_USER_ASSIGN, REMOVE_USER_PROJECT_API, SHOW_LOADER, UPDATE_PROJECT_SAGA, UPDATE_STATUS_TASK_SAGA, UPDATE_TASK_SAGA } from "../contains/contains";

// Get all project
function* getListProjectSaga() {
  if (localStorage.getItem(USER_LOGIN)) {
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
  if (localStorage.getItem(USER_LOGIN)) {
    yield put({ type: GET_PROJECT_DETAIL_SAGA, projectId });
  } else {
    history.push('login');
  }
  yield delay(300);
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
  yield put({type: SHOW_LOADER});
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
  yield delay(300)
  yield put({type: HIDE_LOADER});
}

export function* listenCreateProjectAuthorizationSaga() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProjectAuthorizationSaga);
}

// Update status task
function* updateStatusTaskSaga(action) {
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

// Get Task detail
function* getTaskDetailSaga(action) {
  try {
    let { data, status } = yield call(() => projectService.getTaskDetail(action.taskId));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_LIST,
        taskDetailModal: data.content
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export function* listenGetTaskDetailSaga() {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

// Update task
function* updateTaskSaga(action) {
  switch (action.actionType) {
    case CHANGE_TASK_MODAL:
      const { name, value } = action
      yield put({
        type: CHANGE_TASK_MODAL,
        name,
        value
      })
      break;
    case REMOVE_USER_ASSIGN:
      const { userId } = action;
      yield put({
        type: REMOVE_USER_ASSIGN,
        userId
      });
      break;
    case CHANGE_ASSIGNES:
      const { userSelected } = action;
      yield put({
        type: CHANGE_ASSIGNES,
        userSelected
      });
      break;
    default:
      break;
  }

  // Prepare data to as object that load to API
  let { taskDetailModal } = yield select(state => state.TaskDetailReducer);
  const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
    return user.id;
  });
  const taskUpdateApi = { ...taskDetailModal, listUserAsign }
  try {
    let { data, status } = yield call(() => projectService.updateTask(taskUpdateApi));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: taskDetailModal.projectId
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export function* listenUpdateTaskSaga() {
  yield takeLatest(UPDATE_TASK_SAGA, updateTaskSaga);
}