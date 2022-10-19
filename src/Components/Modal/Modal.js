import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CHANGE_ASSIGNES, CHANGE_TASK_MODAL, DELETE_COMMENT_SAGA, GET_ALL_STATUS_SAGA, GET_PRIORITY_SAGA, GET_TYPE_SAGA, INSERT_COMMENT_SAGA, REMOVE_USER_ASSIGN, UPDATE_COMMENT_SAGA, UPDATE_TASK_SAGA } from "../../redux/contains/contains";
import ReactHtmlParser from "react-html-parser";
import { Editor } from "@tinymce/tinymce-react";
import { Select } from "antd";
import { USER_LOGIN } from "../../utils/constain/setting";

export default function Modal(props) {
  const dispatch = useDispatch();

  let buttonEdit = "hover:cursor-pointer duration-200";
  let { taskDetailModal } = useSelector(state => state.TaskDetailReducer);
  let { listType } = useSelector(state => state.TypeReducer);
  let { listStatus } = useSelector(state => state.StatusReducer);
  let { projectDetail } = useSelector(state => state.ProjectReducer);
  let { listPriority } = useSelector(state => state.PriorityReducer);
  let { listComments } = useSelector(state => state.CommentReducer);
  let userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));

  const [visibleEditor, setVisibleEditor] = useState(false);
  const [content, setContent] = useState(taskDetailModal.description);
  const [comment, setComment] = useState('');
  const [commentEdit, setCommentEdit] = useState({
    id: null,
    contentEditing: comment
  });

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    dispatch({ type: GET_TYPE_SAGA });
    dispatch({ type: GET_ALL_STATUS_SAGA });
    dispatch({ type: GET_PRIORITY_SAGA });
  }, [])

  // Close Editor after modal is turn off
  useEffect(() => {
    setVisibleEditor(false);
  }, [taskDetailModal])

  const handleChange = (e) => {
    let { name, value } = e.target;
    dispatch({
      type: UPDATE_TASK_SAGA,
      actionType: CHANGE_TASK_MODAL,
      name: name,
      value: value
    })
  }

  const handleChangeComment = (e) => {
    let { value } = e.target;
    value ? setShowButton(true) : setShowButton(false);
    setComment(value);

  }

  const handleChangeEdit = (e) => {
    setCommentEdit({ ...commentEdit, contentEditing: e.target.value })
  }

  const renderDescription = () => {
    const jsxDescription = ReactHtmlParser(taskDetailModal.description);
    return <div>
      {visibleEditor ? <div> <Editor
        name="description"
        initialValue={taskDetailModal.description}
        init={{
          selector: 'textarea#myTextArea',
          height: 250,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
        }}
        onEditorChange={(content, editor) => {
          setContent(content);
        }}
      />

        <button className="btn btn-primary m-2" onClick={() => {
          dispatch({
            type: UPDATE_TASK_SAGA,
            actionType: CHANGE_TASK_MODAL,
            name: 'description',
            value: content
          })
          setVisibleEditor(false);
        }}>Save</button>
        <button className="btn btn-primary m-2" onClick={() => {
          setVisibleEditor(false)
        }}>Close</button>
      </div> : <div onClick={() => {
        setVisibleEditor(!visibleEditor);
      }}>{jsxDescription.length > 0 ? jsxDescription : <div className="h-10" style={{ backgroundColor: '#F4F5F7' }}></div>}</div>}
    </div>
  }

  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;
    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percent = Math.round(Number(timeTrackingSpent) / max * 100)
    return <div>
      {/* Bootstrap */}
      <div className="flex">
        <i className="fa fa-clock mr-1" style={{ marginTop: '1px' }} />
        <div style={{ width: '100%' }}>
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p className="logged">{Number(timeTrackingSpent)}h logged</p>
            <p className="estimate-time">{Number(timeTrackingRemaining)}h remaining</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <input type="number" min={0} className="form-control" name="timeTrackingSpent" onChange={handleChange} />
        </div>
        <div className="col-6">
          <input type="number" min={0} className="form-control" name="timeTrackingRemaining" onChange={handleChange} />
        </div>
      </div>
    </div>
  }

  return (
    <div className="modal fade show" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
      <div className="modal-dialog modal-info max-w-5xl">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title">
              <i className="fa fa-bookmark" />
              <select name="typeId" value={taskDetailModal.typeId} onChange={handleChange}>
                {listType.map((item, index) => {
                  return <option key={index} value={item.id}>{item.taskType}</option>
                })}
              </select>
              <span>{taskDetailModal.taskName}</span>
            </div>
            <div style={{ display: 'flex' }} className="task-click">
              <div>
                <i className="fab fa-telegram-plane" />
                <span style={{ paddingRight: 20 }}>Give feedback</span>
              </div>
              <div>
                <i className="fa fa-link" />
                <span style={{ paddingRight: 20 }}>Copy link</span>
              </div>
              <i className="fa fa-trash-alt='xyz'" style={{ cursor: 'pointer' }} />
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="issue">This is an issue of type: Task.</p>
                  <div className="description">
                    <h6>Description</h6>
                    {renderDescription()}
                  </div>
                  <div className="comment">
                    <h6 className="my-3">Comment</h6>
                    <div className="block-comment" style={{ display: 'flex' }}>
                      <div className="avatar mr-3">
                        <img src={userLogin?.avatar} className="rounded-full" alt='xyz' />
                      </div>
                      <div className="input-comment w-full">
                        <input className="form-control" type="text" onChange={handleChangeComment} value={comment} placeholder="Add comment ..." />
                        {showButton ? <div className="my-3 flex justify-end">
                          <button type="button" className="btn btn-primary text-blue-800 mr-1" onClick={() => {
                            dispatch({
                              type: INSERT_COMMENT_SAGA,
                              objectComment: {
                                taskId: taskDetailModal.taskId,
                                contentComment: comment
                              }
                            })
                            setShowButton(false);
                            setComment('');
                          }}>Save</button>
                          <button type="button" className="btn btn-secondary text-blue-800" onClick={() => {
                            setShowButton(false);
                            setComment('');
                          }}>Cancel</button>
                        </div> : ''}
                        {!showButton && <p className="mb-4">Type to comment</p>}
                      </div>
                    </div>
                    <div className="latest-comment">
                      {listComments?.map((item, index) => {
                        return <div key={index} className="comment-item mb-3">
                          <div className={item.user.userId === userLogin?.id ? "display-comment justify-end" : "display-comment"} style={{ display: 'flex' }}>
                            <div className="avatar mr-3">
                              <img src={item.user.avatar} className="rounded-full w-10" alt='xyz' />
                            </div>
                            {/* Align to right and format color when comment user is user login */}
                            <div className={!(item.id === commentEdit.id) ? "max-w-3/4" : 'w-3/4'}>
                              <p style={{ marginBottom: 5 }} className={item.user.userId === userLogin?.id ? "text-blue-600 font-semibold break-words" : 'font-semibold'}>{item.user.name}</p>
                              {!(item.id === commentEdit.id) ? <p key={index} style={{ marginBottom: 5 }}>{item.contentComment}</p> : <input className="form-control focus:shadow-none size text-sm w-full" type="text" onChange={handleChangeEdit} value={commentEdit.contentEditing} />}
                              <div>
                                {!(item.id === commentEdit.id) ? <>
                                  <span className={buttonEdit + " hover:text-blue-700"} onClick={(e) => {
                                    // Get id of item that was clicked and set initial contentEditing = item.contentComment
                                    setCommentEdit({ ...commentEdit, id: item.id, contentEditing: item.contentComment })
                                  }}>Edit</span> • <span className={buttonEdit + " hover:text-red-700"} onClick={() => {
                                    dispatch({
                                      type: DELETE_COMMENT_SAGA,
                                      idComment: item.id,
                                      taskId: taskDetailModal.taskId
                                    })
                                  }}>Delete</span>
                                </> : <>
                                  <span className={buttonEdit + " hover:text-blue-700"} onClick={() => {
                                    // Reset id of commentEdit to null and dispatch action to saga
                                    setCommentEdit({ ...commentEdit, id: null });
                                    dispatch({
                                      type: UPDATE_COMMENT_SAGA,
                                      id: item.id,
                                      contentComment: commentEdit.contentEditing,
                                      taskId: taskDetailModal.taskId
                                    });
                                  }}>Confirm</span> • <span className={buttonEdit + " hover:text-red-700"} onClick={() => {
                                    // Reset id of commentEdit to null
                                    setCommentEdit({ ...commentEdit, id: null })
                                  }}>Cancel</span>
                                </>}
                              </div>
                            </div>
                          </div>
                        </div>
                      })}
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="status">
                    <h6 className="mb-3">STATUS</h6>
                    <select name="statusId" className="custom-select" value={taskDetailModal.statusId} onChange={(e) => { handleChange(e) }}>
                      {listStatus.map((status, index) => <option value={status.statusId} key={index}>{status.statusName}</option>)}
                    </select>
                  </div>
                  <div className="assignees">
                    <h6 className="my-3">ASSIGNEES</h6>
                    <div className="row">
                      {
                        taskDetailModal.assigness?.map((user, index) => {
                          return <div className="col-6" key={index}>
                            <div key={index} style={{ display: 'flex' }} className="item align-middle">
                              <div className="avatar">
                                <img className="rounded-full w-8" src={user.avatar} alt={user.avatar} />
                              </div>
                              <p className="name mt-1 ml-1">
                                {user.name}
                                <i className="fa fa-times" style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => {
                                  dispatch({
                                    type: UPDATE_TASK_SAGA,
                                    actionType: REMOVE_USER_ASSIGN,
                                    userId: user.id
                                  })
                                }} />
                              </p>
                            </div>
                          </div>
                        })
                      }

                      <div className="col-6  mt-2 mb-2">
                        <Select
                          // Filter member that have not assigned to current task
                          options={projectDetail.members?.filter(mem => {
                            let index = taskDetailModal.assigness?.findIndex(us => us.id === mem.userId);
                            return index !== -1 ? false : true;
                          }).map((mem, index) => {
                            return { value: mem.userId, label: mem.name };
                          })}
                          optionFilterProp="label"
                          style={{ width: '100%' }}
                          name="lstUser"
                          value="+ Add more"
                          className="form-control"
                          onSelect={(value) => {
                            if (value === '0') return
                            let userSelected = projectDetail.members.find(mem => mem.userId === value);
                            userSelected = { ...userSelected, id: userSelected.userId };
                            dispatch({
                              type: UPDATE_TASK_SAGA,
                              actionType: CHANGE_ASSIGNES,
                              userSelected
                            })
                          }}>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="reporter">
                    <h6 className="my-3">REPORTER</h6>
                    <div className="item flex align-middle">
                      <div className="avatar">
                        <img src={projectDetail.creator?.avatar} alt='missing' className="rounded-full mr-3 w-12 items-center" />
                      </div>
                      <p className="name text-lg m-0">{projectDetail.creator?.name}</p>
                    </div>
                  </div>
                  <div className="priority" style={{ marginBottom: 20 }}>
                    <h6 className="my-3">PRIORITY</h6>
                    <select name="priorityId" className="form-control" value={taskDetailModal.priorityId} onChange={(e) => {
                      handleChange(e);
                    }}>
                      {listPriority.map((item, index) => {
                        return <option key={index} value={item.priorityId}>{item.priority}</option>
                      })}
                    </select>
                  </div>
                  <div className="estimate">
                    <h6 className="my-3">ORIGINAL ESTIMATE (HOURS)</h6>
                    <input name="originalEstimate" type="text" className="estimate-hours" value={taskDetailModal.originalEstimate} onChange={(e) => {
                      handleChange(e);
                    }} />
                  </div>
                  <div className="time-tracking mb-3">
                    <h6 className="my-3">TIME TRACKING</h6>
                    {renderTimeTracking()}
                  </div>
                  <div style={{ color: '#929398' }}>Create at a month ago</div>
                  <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
