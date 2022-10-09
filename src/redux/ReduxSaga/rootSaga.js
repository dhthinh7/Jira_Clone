import { all } from "redux-saga/effects"
import { listenCreateTaskSaga } from "./CreatTaskSaga"
import { listenPrioritySaga } from "./PrioritySaga"
import { listenAdddUserProjectSaga, listenDeleteProjectSaga, listenGetListProjectSaga, listenGetProjectDetailSaga, listenRemoveUserSaga } from "./ProjectSaga"
import { listenGetAllSaga } from "./StatusSaga"
import { listenTypeGetAllSaga } from "./TypeSaga"
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
    listenTypeGetAllSaga(),
    listenCreateTaskSaga(),
    listenDeleteProjectSaga(),
  ])
}