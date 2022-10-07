// Get user with keyword

import { call, put, takeLatest } from "redux-saga/effects";
import { userServices } from "../../Services/UserService";
import { STATUS_CODE } from "../../utils/constain/setting";
import { ADD_USER_PROJECT_SAGA, GET_LIST_PROJECT_SAGA, GET_USER, GET_USER_SAGA } from "../contains/contains";

function *getUserSaga(action) {
  try {
    const {data, status} = yield call(()=>userServices.getUser(action.keyword))
  
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER,
        userSearch: data.content
      })
    }
  } catch (err) {
    console.log(err)
  }
}

export function *listenGetUserSaga() {
  yield takeLatest(GET_USER_SAGA, getUserSaga);
}

