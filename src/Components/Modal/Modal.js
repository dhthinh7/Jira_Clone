import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GET_ALL_STATUS_SAGA, GET_TYPE_SAGA } from "../../redux/contains/contains";
import ReactHtmlParser from "react-html-parser";
import { Editor } from "@tinymce/tinymce-react";

export default function Modal() {

  const dispatch = useDispatch();

  let { taskDetailModal } = useSelector(state => state.TaskDetailReducer);
  let { listType } = useSelector(state => state.TypeReducer);
  let { listStatus } = useSelector(state => state.StatusReducer);


  const [visibleEditor, setVisibleEditor] = useState(false);
  const [historyContent, setHistoryContent] = useState(taskDetailModal.description);
  const [content, setContent] = useState(taskDetailModal.description);


  console.log("dataaaaaaaaaaaaaaaaaaaaa", taskDetailModal)
  useEffect(() => {
    dispatch({ type: GET_TYPE_SAGA });
    dispatch({ type: GET_ALL_STATUS_SAGA });

  }, [])


  const handleChange = (e) => {
    console.log("e,target", e.target.value);
  }

  const renderDescription = () => {
    const jsxDescription = ReactHtmlParser(taskDetailModal.description);
    return <div>
      {visibleEditor ? <div> <Editor
        name="description"
        initialValue={taskDetailModal.description}
        init={{
          selector: 'textarea#myTextArea',
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help'
        }}
        onEditorChange={(content, editor) => {
          setContent(content);
        }}
      />

        <button className="btn btn-primary m-2" onClick={() => {
          // dispatch({
          //   type: HANDLE_CHANGE_POST_API_SAGA,
          //   actionType: CHANGE_TASK_MODAL,
          //   name: 'description',
          //   value: content
          // })
          setVisibleEditor(false);
        }}>Save</button>
        <button className="btn btn-primary m-2" onClick={() => {
          // dispatch({
          //   type: HANDLE_CHANGE_POST_API_SAGA,
          //   actionType: CHANGE_TASK_MODAL,
          //   name: 'description',
          //   value: historyContent
          // })

          //    dispatch({
          //         type: CHANGE_TASK_MODAL,
          //         name: 'description',
          //         value: historyContent
          //     })
          setVisibleEditor(false)
        }}>Close</button>
      </div> : <div onClick={() => {

        setHistoryContent(taskDetailModal.description);
        setVisibleEditor(!visibleEditor);

      }}>{jsxDescription}</div>}


    </div>
  }

  return (
    <div className="modal fade show" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
      <div className="modal-dialog modal-info max-w-5xl">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title">
              <i className="fa fa-bookmark" />
              <select name="typeId" value={taskDetailModal.taskTypeDetail.id} onChange={handleChange}>
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
                    <p>Description</p>
                    {renderDescription()}
                  </div>
                  <div className="comment">
                    <h6>Comment</h6>
                    <div className="block-comment" style={{ display: 'flex' }}>
                      <div className="avatar">
                        {/* <img src={require("../../../assets/img/download (1).jfif")} alt='xyz' /> */}
                      </div>
                      <div className="input-comment">
                        <input type="text" placeholder="Add a comment ..." />
                        <p>
                          <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                          <span>press
                            <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                            to comment</span>
                        </p>
                      </div>
                    </div>
                    <div className="lastest-comment">
                      <div className="comment-item">
                        <div className="display-comment" style={{ display: 'flex' }}>
                          <div className="avatar">
                            {/* <img src={require("../../../assets/img/download (1).jfif")} alt='xyz' /> */}
                          </div>
                          <div>
                            <p style={{ marginBottom: 5 }}>
                              Lord Gaben <span>a month ago</span>
                            </p>
                            <p style={{ marginBottom: 5 }}>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Repellendus tempora ex
                              voluptatum saepe ab officiis alias totam ad
                              accusamus molestiae?
                            </p>
                            <div>
                              <span style={{ color: '#929398' }}>Edit</span>
                              •
                              <span style={{ color: '#929398' }}>Delete</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="status">
                    <h6>STATUS</h6>
                    <select name="statusId" className="custom-select" value={taskDetailModal.statusId} onChange={(e) => {

                      handleChange(e)

                      // const action = {
                      //     type:UPDATE_STATUS_TASK_SAGA,
                      //     taskUpdateStatus: {
                      //         taskId:taskDetailModal.taskId,
                      //         statusId:e.target.value,
                      //         projectId:taskDetailModal.projectId

                      //     }
                      // }

                      // // // console.log('action',action);
                      // console.log('taskupdatestatus',{
                      //     taskId:taskDetailModal.taskId,
                      //     statusId:e.target.value
                      // })

                      // dispatch(action)


                    }}>
                      {listStatus.map((status, index) => {
                        return <option value={status.statusId} key={index}>{status.statusName}</option>
                      })}
                    </select>

                  </div>
                  <div className="assignees">
                    <h6>ASSIGNEES</h6>
                    <div className="row">
                      <div>Temp Assignees</div>
                      {/* {
                        taskDetailModal.assigness?.map((user, index) => {
                          return <div className="col-6  mt-2 mb-2" key={index}>
                            <div key={index} style={{ display: 'flex' }} className="item">


                              <div className="avatar">
                                <img src={user.avatar} alt={user.avatar} />
                              </div>
                              <p className="name mt-1 ml-1">
                                {user.name}
                                <i className="fa fa-times" style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => {

                                  dispatch({
                                    type: HANDLE_CHANGE_POST_API_SAGA,
                                    actionType: REMOVE_USER_ASSIGN,
                                    userId: user.id
                                  })

                                  // dispatch({
                                  //     type:REMOVE_USER_ASSIGN,
                                  //     userId:user.id
                                  // })
                                }} />
                              </p>
                            </div>
                          </div>
                        })
                      } */}

                      <div className="col-6  mt-2 mb-2">
                        <div>Temp Assignees</div>

                        {/* <Select
                          options={projectDetail.members?.filter(mem => {
                            let index = taskDetailModal.assigness?.findIndex(us => us.id === mem.userId);
                            if (index !== -1) {
                              return false;
                            }
                            return true;
                          }).map((mem, index) => {
                            return { value: mem.userId, label: mem.name };
                          })}
                          optionFilterProp="label"
                          style={{ width: '100%' }}
                          name="lstUser"
                          value="+ Add more"
                          className="form-control"
                          onSelect={(value) => {
                            if (value == '0') {
                              return;
                            }
                            let userSelected = projectDetail.members.find(mem => mem.userId == value);
                            userSelected = { ...userSelected, id: userSelected.userId };

                            dispatch({
                              type: HANDLE_CHANGE_POST_API_SAGA,
                              actionType: CHANGE_ASSIGNESS,
                              userSelected
                            })

                            //dispatchReducer
                            // dispatch({
                            //     type: CHANGE_ASSIGNESS,
                            //     userSelected
                            // })
                          }}>


                        </Select> */}
                      </div>
                    </div>
                  </div>
                  {/* <div className="reporter">
                                    <h6>REPORTER</h6>
                                    <div style={{ display: 'flex' }} className="item">
                                        <div className="avatar">
                                            <img src={require("../../../assets/img/download (1).jfif")} alt='xyz' />
                                        </div>
                                        <p className="name">
                                            Pickle Rick
                <i className="fa fa-times" style={{ marginLeft: 5 }} />
                                        </p>
                                    </div>
                                </div> */}
                  <div className="priority" style={{ marginBottom: 20 }}>
                    <h6>PRIORITY</h6>
                    {/* <select name="priorityId" className="form-control" value={taskDetailModal.priorityId} onChange={(e) => {
                      handleChange(e);
                    }}>
                      {arrPriority.map((item, index) => {
                        return <option key={index} value={item.priorityId}>{item.priority}</option>
                      })}


                    </select> */}
                    <select name="" id="">
                      <option value="">option1</option>
                      <option value="">option2</option>
                    </select>
                  </div>
                  <div className="estimate">
                    <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                    {/* <input name="originalEstimate" type="text" className="estimate-hours" value={taskDetailModal.originalEstimate} onChange={(e) => {
                      handleChange(e);
                    }} /> */}
                  </div>
                  <div className="time-tracking">
                    <h6>TIME TRACKING</h6>
                    {

                      // renderTimeTracking()
                    }

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
