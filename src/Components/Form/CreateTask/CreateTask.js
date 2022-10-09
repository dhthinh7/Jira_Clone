import { Editor } from "@tinymce/tinymce-react";
import { Select, Slider } from "antd";
import { withFormik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { CREATE_TASK_SAGA, GET_ALL_STATUS_SAGA, GET_PRIORITY_SAGA, GET_PROJECT_MEMBERS_SAGA, GET_TYPE_SAGA, SET_SUBMIT_CREATE_TASK } from "../../../redux/contains/contains";

function CreateTask(props) {

  const dispatch = useDispatch()
  let [timeTracking, setTimeTracking] = useState({
    timeSpending: 0,
    timeRemaining: 0
  })

  let { listStatus } = useSelector(state => state.StatusReducer);
  let { listPriority } = useSelector(state => state.PriorityReducer);
  let { projectList, projectMembers } = useSelector(state => state.ProjectReducer);
  

  // Create props for useFormik: useFormik có tất cả các props từ props 
  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue
  } = props;

  useEffect(() => {
    dispatch({ type: GET_ALL_STATUS_SAGA });
    dispatch({ type: GET_PRIORITY_SAGA });
    dispatch({ type: GET_TYPE_SAGA });
    dispatch({ type: SET_SUBMIT_CREATE_TASK, callBackSubmit: handleSubmit })
  }, [])

  

  return <> <form className="container" onSubmit={handleSubmit}>
    <div className="form-group">
      <p>Project</p>
      <select name="projectId" className="form-control" onChange={(e) => {
        dispatch({ type: GET_PROJECT_MEMBERS_SAGA, projectId: e.target.value })
        setFieldValue('projectId', e.target.value)
        
      }}>
        {projectList?.map((item, index) => <option key={index} value={item.id}>{item.projectName}</option>)}
      </select>
    </div>
    <div className="form-group">
      <p>Task name</p>
      <input name="taskName" className="form-control" value={values.taskName} onChange={handleChange} />
    </div>
    <div className="form-group">
      <p>Status</p>
      <select name="statusId" className="form-control" onChange={handleChange}>
        {listStatus?.map((item, index) => <option key={index} value={item.statusId}>{item.statusName}</option>)}
      </select>
    </div>
    <div className="form-group">
      <div className="grid grid-cols-2 gap-5 ">
        <div>
          <p>Priority</p>
          <select name="priorityId" className="form-control" onChange={handleChange}>
            {listPriority?.map((item, index) => {
              return <option key={index} value={item.priorityId}>{item.priority}</option>
            })}
          </select>
        </div>
        <div>
          <p>Task type</p>
          <select className="form-control" name="typeId" onChange={handleChange}>
            {props.listType?.map((item, index) => <option key={index} value={item.id}>{item.taskType}</option>)}
          </select>
        </div>
      </div>

    </div>

    <div className="form-group">
      <div className="row">
        <div className="col-6">
          <p>Assignees</p>
          <Select
            mode="multiple"
            // size={size}
            options={projectMembers.map((item) => {
              return { value: item.userId, label: item.name }
            })}
            placeholder="Please select"
            optionFilterProp="label"
            onChange={(values) => {
              // Assign selected user to task
              setFieldValue('listUserAssign', values);
            }}

            style={{ width: '100%' }}
          >
            {/* {projectMembers?.map(item => <Option key={item.userId}>{item.name}</Option>)} */}
          </Select>
          <div className="row mt-3">
            <div className="col-12">
              <p>Original Estimate</p>
              <input type="number" min="0" name="originalEstimate" defaultValue="0" className="form-control" height="30" onChange={handleChange} />
            </div>
          </div>

        </div>
        <div className="col-6">
          <p>Time tracking</p>
          <Slider defaultValue={20} value={timeTracking.timeSpending} max={Number(values.originalEstimate)} />
          <div className="row">
            <div className="col-6 text-left font-weight-bold">{timeTracking.timeSpending}h logged</div>
            <div className="col-6 text-right font-weight-bold">{timeTracking.timeRemaining}h remaining</div>
          </div>
          <div className="row" style={{ marginTop: 5 }}>
            <div className="col-6">
              <p>Time spent</p>
              <input type="number" defaultValue={0} min="0" className="form-control" name="timeTrackingSpent" onChange={e => {
                setTimeTracking({
                  ...timeTracking,
                  timeSpending: e.target.value,
                  timeRemaining: values.originalEstimate - e.target.value
                });
                setFieldValue('timeTrackingSpent', e.currentTarget.value);
                setFieldValue('timeTrackingRemaining', values.originalEstimate - e.target.value);
              }}></input>
            </div>

            <div className="col-6">
              <p>Time remaining</p>
              <input type="number" value={timeTracking.timeRemaining} min="0" className="form-control" readOnly />
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <p>Description</p>
        <Editor
          name="description"
          init={{
            selector: 'textarea#myTextArea',
            height: 200,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor', 'searchreplace visualblocks code fullscreen', 'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
          }}
          onEditorChange={(content, editor) => {
            setFieldValue('description', content);
          }}
        />
      </div>
    </div>
    {/* <button type="submit">submit</button> */}
  </form>;
  </>
}

const createTaskFormik = withFormik({
  enableReinitialize: true,

  mapPropsToValues: (props) => {
    const { projectList, listPriority, listType, listStatus } = props;
    return {
      taskName: '',
      description: '',
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: projectList[0]?.id,
      typeId: listType[0]?.id,
      priorityId: listPriority[0]?.priorityId,
      listUserAssign: [],
      statusId: listStatus[0]?.statusId
    }
  },

  // Custom sync validation
  validate: values => {

  },

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({ type: CREATE_TASK_SAGA, taskObject: values })
  },

  displayName: 'createTaskForm',
})(CreateTask);

const mapStateToProps = (state) => {
  return {
    projectList: state.ProjectReducer.projectList,
    projectMembers: state.ProjectReducer.projectMembers,
    listPriority: state.PriorityReducer.listPriority,
    listStatus: state.StatusReducer.listStatus,
    listType: state.TypeReducer.listType
  }
}

export default connect(mapStateToProps)(createTaskFormik);