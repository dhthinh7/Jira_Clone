// Get user with keyword

import { call, put, takeLatest, delay } from "redux-saga/effects";
import { userServices } from "../../Services/UserService";
import { STATUS_CODE, TOKEN, USER_LOGIN } from "../../utils/constain/setting";
import { history } from "../../utils/history";
import { GET_USER, GET_USER_SAGA, HIDE_LOADER, LINK_TO_SIGNUP_EFFECT_SAGA, SHOW_LOADER, USER_SIGN_IN_SAGA } from "../contains/contains";

// Get all user
function* getUserSaga(action) {
  try {
    const { data, status } = yield call(() => userServices.getUser(action.keyword))

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

export function* listenGetUserSaga() {
  yield takeLatest(GET_USER_SAGA, getUserSaga);
}

// Login
function* signInUserSaga(action) {
  yield put({ type: SHOW_LOADER });
  try {
    const { data, status } = yield call(() => userServices.signInUser(action.userLogin));
    if (status === STATUS_CODE.SUCCESS) {
      localStorage.setItem(TOKEN, data.content.accessToken);
      localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

      yield put({
        type: USER_LOGIN,
        userLogin: data.content
      })

      history.push('/')
    }
  } catch (error) {
    console.log(error);
  }
  yield delay(300);
  yield put({ type: HIDE_LOADER });
}

export function* listenSignInUserSaga() {
  yield takeLatest(USER_SIGN_IN_SAGA, signInUserSaga);
}

// Link to signup
function* linkToSignupLoader() {
  yield put({type: SHOW_LOADER});
  history.push('/signup');
  yield delay(300);
  yield put({type: HIDE_LOADER});
}

export function* listenLinkToSignupLoader() {
  yield takeLatest(LINK_TO_SIGNUP_EFFECT_SAGA, linkToSignupLoader);
}
