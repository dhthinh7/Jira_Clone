import { call, put, takeLatest } from "redux-saga/effects"
import { projectService } from "../../Services/ProjectService"
import { STATUS_CODE } from "../../utils/constain/setting";
import { JiraNotification } from "../../utils/JiraNotification/JiraNotification";
import { CLOSE_FORM_DRAWER, CREATE_TASK_SAGA, GET_PROJECT_DETAIL_SAGA } from "../contains/contains";

function* createTaskSaga(action) {
  try {
    let { status } = yield call(() => projectService.createTask(action.taskObject));
    if (status === STATUS_CODE.SUCCESS) {
      JiraNotification('success', 'Create task successfully !');

      yield put({
        type: CLOSE_FORM_DRAWER
      })
      
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: action.taskObject.projectId
      })
    }
  } catch (error) {
    JiraNotification('error', 'Create task fail !');
    console.log(error)
  }
}

export function* listenCreateTaskSaga() {
  yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}