import { call, takeLatest, put } from "redux-saga/effects"
import { commentServices } from "../../Services/CommentServices"
import { STATUS_CODE } from "../../utils/constain/setting";
import { DELETE_COMMENT_SAGA, GET_ALL_COMMENTS, GET_ALL_COMMENTS_SAGA, INSERT_COMMENT_SAGA, UPDATE_COMMENT_SAGA } from "../contains/contains";

// Get all comments of task
function* getAllCommentsSaga(action) {
  try {
    let { data, status } = yield call(() => commentServices.getAllComments(action.taskId));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_COMMENTS,
        listComments: data.content
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export function* listenGetAllCommentsSaga() {
  yield takeLatest(GET_ALL_COMMENTS_SAGA, getAllCommentsSaga);
}

// Insert comment
function* insertCommentSaga(action) {
  try {
    let { data, status } = yield call(() => commentServices.insertComment(action.objectComment));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_COMMENTS_SAGA,
        taskId: action.objectComment.taskId
      })
    }
  } catch (error) {
    console.log(error);
  }
}

export function* listenInsertComment() {
  yield takeLatest(INSERT_COMMENT_SAGA, insertCommentSaga);
}

// Update comment
function* updateCommentSaga(action) {
  try {
    let { data, status } = yield call(() => commentServices.updateComment(action.id, action.contentComment));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_COMMENTS_SAGA,
        taskId: action.taskId
      })
    }
  } catch (error) {
    console.log(error);
  }
}

export function* listenUpdateCommentSaga() {
  yield takeLatest(UPDATE_COMMENT_SAGA, updateCommentSaga);
}

// Delete comment
function* deleteCommentSaga(action) {
  try {
    if (window.confirm("This comment will be deleted")) {
      let { data, status } = yield call(() => commentServices.deleteComment(action.idComment));
      if (status === STATUS_CODE.SUCCESS) {
        yield put({
          type: GET_ALL_COMMENTS_SAGA,
          taskId: action.taskId
        })
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export function* listenDeleteCommentSaga() {
  yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}