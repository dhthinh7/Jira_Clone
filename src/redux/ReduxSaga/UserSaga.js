import { call, put, takeLatest, delay } from "redux-saga/effects";
import { userServices } from "../../Services/UserService";
import { STATUS_CODE, TOKEN, USER_LOGIN } from "../../utils/constain/setting";
import { history } from "../../utils/history";
import { JiraNotification } from "../../utils/JiraNotification/JiraNotification";
import { CLOSE_FORM_DRAWER, DELETE_USER_SAGA, EDIT_USER_SAGA, GET_LIST_PROJECT_SAGA, GET_USER, GET_USER_SAGA, HIDE_LOADER, LINK_TO_EFFECT_LOADER_SAGA, LOGOUT_SAGA, SHOW_LOADER, SIGNIN, SIGNUP, USER_SIGN_IN_SAGA, USER_SIGN_UP_SAGA } from "../contains/contains";

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
function* linkToSignupLoader(action) {
  yield put({ type: SHOW_LOADER });
  switch (action.actionType) {
    case SIGNIN:
      history.push('/login');
      break;
    case SIGNUP:
      history.push('/signup');
      break;
    default:
      break;
  }
  yield delay(300);
  yield put({ type: HIDE_LOADER });
}

export function* listenLinkToSignupLoader() {
  yield takeLatest(LINK_TO_EFFECT_LOADER_SAGA, linkToSignupLoader);
}

// Signup
function* signupSaga(action) {
  yield put({ type: SHOW_LOADER });
  try {
    const { data, status } = yield call(() => userServices.signUpUser(action.userSignup));
    if (status === STATUS_CODE.SUCCESS) {
      history.push('/login');
    }
  } catch (error) {
    console.log(error);
  }
  yield delay(300);
  yield put({ type: HIDE_LOADER });
}

export function* listenSignupSaga() {
  yield takeLatest(USER_SIGN_UP_SAGA, signupSaga);
}

// Logout
function* logoutSaga() {
  yield put({ type: SHOW_LOADER });
  yield localStorage.removeItem(TOKEN);
  yield localStorage.removeItem(USER_LOGIN);
  if (localStorage.getItem(TOKEN) === null) {
    yield put({
      type: GET_LIST_PROJECT_SAGA
    })
    history.push('/');
  }
  yield delay(500);
  yield put({ type: HIDE_LOADER });
}

export function* listenLogoutSaga() {
  yield takeLatest(LOGOUT_SAGA, logoutSaga);
}

// Delete user
function* deleteUser(action) {
  yield put({ type: SHOW_LOADER });
  try {
    const {data, status} = yield call(()=>userServices.deleteUser(action.userId))
    if (status === STATUS_CODE.SUCCESS) {
      yield put({type: GET_USER_SAGA, keyword: action.searchTemp});
      JiraNotification('success', 'Delete user successfully !');
    }
  } catch (error) {
    console.log(error.response);
    JiraNotification('error', 'Delete user failed !');
  }
  yield delay(500);
  yield put({ type: HIDE_LOADER });
}

export function* listenDeleteUser() {
  yield takeLatest(DELETE_USER_SAGA, deleteUser);
}

// Edit user
function* editUser(action) {
  yield put({ type: SHOW_LOADER });
  try {
    const {data, status} = yield call(()=>userServices.editUser(action.userEdit))
    if (status === STATUS_CODE.SUCCESS) {
      yield put({type: GET_USER_SAGA, keyword: action.searchTemp})
      yield put({type: CLOSE_FORM_DRAWER});
      JiraNotification('success', 'Edit user successfully !');

    }
  } catch (error) {
    console.log(error.response);
    JiraNotification('error', 'Edit user failed !');

  }
  yield delay(500);
  yield put({ type: HIDE_LOADER });
}

export function* listenEditUser() {
  yield takeLatest(EDIT_USER_SAGA, editUser);
}
