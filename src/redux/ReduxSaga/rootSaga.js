import { all } from "redux-saga/effects"
import { listenCreateTaskSaga } from "./CreatTaskSaga"
import { listenPrioritySaga } from "./PrioritySaga"
import { listenGetProjectCategoryService } from "./ProjectCategorySaga"
import { listenAddUserProjectSaga, listenDeleteProjectSaga, listenGetListProjectSaga, listenGetProjectDetailSaga, listenRemoveUserSaga, listenUpdateProjectSaga } from "./ProjectSaga"
import { listenGetAllSaga } from "./StatusSaga"
import { listenTypeGetAllSaga } from "./TypeSaga"
import { listenGetUserSaga } from "./UserSaga"

export function* rootSaga() {
  yield all([
    listenGetListProjectSaga(),
    listenRemoveUserSaga(),
    listenGetUserSaga(),
    listenAddUserProjectSaga(),
    listenGetAllSaga(),
    listenPrioritySaga(),
    listenGetProjectDetailSaga(),
    listenTypeGetAllSaga(),
    listenCreateTaskSaga(),
    listenDeleteProjectSaga(),
    listenGetProjectCategoryService(),
    listenUpdateProjectSaga(),
  ])
}