import { all } from "redux-saga/effects"
import { listenDeleteCommentSaga, listenGetAllCommentsSaga, listenInsertComment, listenUpdateCommentSaga } from "./CommentSaga"
import { listenCreateTaskSaga } from "./CreatTaskSaga"
import { listenPrioritySaga } from "./PrioritySaga"
import { listenGetProjectCategoryService } from "./ProjectCategorySaga"
import { listenAddUserProjectSaga, listenCreateProjectAuthorizationSaga, listenDeleteProjectSaga, listenGetListProjectSaga, listenGetProjectDetailLoadingSaga, listenGetProjectDetailSaga, listenGetTaskDetailSaga, listenRemoveUserSaga, listenUpdateProjectSaga, listenUpdateStatusTaskSaga, listenUpdateTaskSaga } from "./ProjectSaga"
import { listenGetAllSaga } from "./StatusSaga"
import { listenTypeGetAllSaga } from "./TypeSaga"
import { listenGetUserSaga, listenLinkToSignupLoader, listenSignInUserSaga, listenSignupSaga } from "./UserSaga"

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
    // listenCreateProjectSaga()
    listenCreateProjectAuthorizationSaga(),
    listenUpdateStatusTaskSaga(),
    listenGetProjectDetailLoadingSaga(),
    listenGetTaskDetailSaga(),
    listenUpdateTaskSaga(),
    listenGetAllCommentsSaga(),
    listenInsertComment(),
    listenUpdateCommentSaga(),
    listenDeleteCommentSaga(),
    listenSignInUserSaga(),
    listenLinkToSignupLoader(),
    listenSignupSaga(),
  ])
}