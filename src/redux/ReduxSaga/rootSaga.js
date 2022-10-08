import { all } from "redux-saga/effects"
import { listenPrioritySaga } from "./PrioritySaga"
import { listenAdddUserProjectSaga, listenGetListProjectSaga, listenGetProjectDetailSaga, listenRemoveUserSaga } from "./ProjectSaga"
import { listenGetAllSaga } from "./StatusSaga"
import { listenGetUserSaga } from "./UserSaga"

export function* rootSaga() {
  yield all([
    listenGetListProjectSaga(),
    listenRemoveUserSaga(),
    listenGetUserSaga(),
    listenAdddUserProjectSaga(),
    listenGetAllSaga(),
    listenPrioritySaga(),
    listenGetProjectDetailSaga(),
  ])
}