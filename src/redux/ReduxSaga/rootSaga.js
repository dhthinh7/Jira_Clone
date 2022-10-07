import { all } from "redux-saga/effects"
import { listenGetListProjectSaga } from "./ProjectSaga"

export function *rootSaga() {
  yield all([
    listenGetListProjectSaga(),
  ]) 
}