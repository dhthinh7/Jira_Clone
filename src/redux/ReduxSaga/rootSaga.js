import { all } from "redux-saga/effects"
import { listenAdddUserProjectSaga, listenGetListProjectSaga, listenRemoveUserSaga } from "./ProjectSaga"
import { listenGetUserSaga } from "./UserSaga"

export function* rootSaga() {
  yield all([
    listenGetListProjectSaga(),
    listenRemoveUserSaga(),
    listenGetUserSaga(),
    listenAdddUserProjectSaga(),

  ])
}