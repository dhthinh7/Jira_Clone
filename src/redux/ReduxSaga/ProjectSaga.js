import { call, put, takeLatest } from 'redux-saga/effects';
import { projectService } from '../../Services/ProjectService';
import { STATUS_CODE } from '../../utils/constain/setting';
import { GET_LIST_PROJECT, GET_LIST_PROJECT_SAGA } from "../contains/contains";

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