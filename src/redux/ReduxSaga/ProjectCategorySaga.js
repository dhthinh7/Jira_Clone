import { call, put, takeLatest } from "redux-saga/effects";
import { projectCategoryService } from "../../Services/ProjectCategoryService";
import { STATUS_CODE } from "../../utils/constain/setting";
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from "../contains/contains";

function* getProjectCategoryService() {
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
}

export function* listenGetProjectCategoryService() {
  yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getProjectCategoryService);
}

