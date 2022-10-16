import { call, put, takeLatest, delay } from "redux-saga/effects";
import { projectCategoryService } from "../../Services/ProjectCategoryService";
import { STATUS_CODE, USER_LOGIN } from "../../utils/constain/setting";
import { history } from "../../utils/history";
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA, HIDE_LOADER, SHOW_LOADER } from "../contains/contains";

function* getProjectCategoryService() {
  yield put({ type: SHOW_LOADER });
  try {
    let { data, status } = yield call(() => projectCategoryService.getProjectCategory());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_CATEGORY,
        listCategory: data.content
      })
    }
  } catch (error) {
    console.log(error);
  }
  yield delay(300);
  yield put({ type: HIDE_LOADER });
}

export function* listenGetProjectCategoryService() {
  yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getProjectCategoryService);
}

