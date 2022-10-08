import { call, put, takeLatest } from "redux-saga/effects";
import { statusService } from "../../Services/StatusService";
import { GET_ALL_STATUS, GET_ALL_STATUS_SAGA } from "../contains/contains";

function* getAllSaga() {
  try {
    const { data, status } = yield call(() => statusService.getAll());
    if (status === 200) {
      yield put({
        type: GET_ALL_STATUS,
        listStatus: data.content
      })
    }
  } catch (error) {
    console.log(error);
  }
}

export function* listenGetAllSaga() {
  yield takeLatest(GET_ALL_STATUS_SAGA, getAllSaga);
}