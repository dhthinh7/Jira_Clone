import { call, put, takeLatest } from "redux-saga/effects";
import { priorityService } from "../../Services/PriorityService"
import { GET_PRIORITY, GET_PRIORITY_SAGA } from "../contains/contains";

function* PrioritySaga() {
  try {
    let { data, status } = yield call(() => priorityService.getAll());
    if (status === 200) {
      yield put({
        type: GET_PRIORITY,
        listPriority: data.content
      })
    }

  } catch (error) {
    console.log(error)
  }
}

export function* listenPrioritySaga() {
  yield takeLatest(GET_PRIORITY_SAGA, PrioritySaga);
}