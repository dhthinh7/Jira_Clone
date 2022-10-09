import { call, put, takeLatest } from "redux-saga/effects"
import { typeService } from "../../Services/TypeService"
import { STATUS_CODE } from "../../utils/constain/setting";
import { GET_TYPE, GET_TYPE_SAGA } from "../contains/contains";

function *getAllSaga(){
  try {
    let {data, status} = yield call(()=>typeService.getAll());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TYPE,
        listType: data.content
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export function *listenTypeGetAllSaga() {
  yield takeLatest(GET_TYPE_SAGA, getAllSaga)
}