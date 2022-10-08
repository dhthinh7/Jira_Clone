import { Editor } from "@tinymce/tinymce-react";
import { Select, Slider } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_STATUS_SAGA, GET_PRIORITY_SAGA, GET_PROJECT_MEMBERS_SAGA } from "../../../redux/contains/contains";
const { Option } = Select;

export default function CreateTask() {

  const dispatch = useDispatch()

  let { listStatus } = useSelector(state => state.StatusReducer);
  let { listPriority } = useSelector(state => state.PriorityReducer);
  let { projectList, projectMembers } = useSelector(state => state.ProjectReducer);
  console.log('projectMembers', projectMembers)

  useEffect(() => {
    dispatch({ type: GET_ALL_STATUS_SAGA });
    dispatch({ type: GET_PRIORITY_SAGA });
    // dispatch({ type: GET_LIST_PROJECT });
    dispatch({ type: GET_PROJECT_MEMBERS_SAGA, projectId: 7808 });

  }, [])

  return <div className="container">
    <div className="form-group">
      <p>Project</p>
      <select name="projectId" id="" className="form-control">
        {projectList?.map(item => <option key={item.id}>{item.projectName}</option>)}
      </select>
    </div>
    <div className="form-group">
      <p>Task name</p>
      <input name="taskName" className="form-control" />
    </div>
    <div className="form-group">
      <div className="grid grid-cols-2 gap-5 ">
        <div>
          <p>Priority</p>
          <select name="priorityId" className="form-control">
            {listPriority?.map(item => <option key={item.priorityId}>{item.priority}</option>)}
          </select>
        </div>
        <div>
          <p>Task type</p>
          <select className="form-control" name="typeId">
            {listStatus?.map(item => <option key={item.statusId}>{item.statusName}</option>)}
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
            // options={userOptions}
            placeholder="Please select"
            optionFilterProp="label"
            // onChange={(values) => {
            //     //set lại giá trị cho lstUserAsign
            //     setFieldValue('listUserAsign',values);
            // }}
            onSelect={(value) => {

              console.log(value)

            }}
            style={{ width: '100%' }}
          >
            {projectMembers?.map(item => <Option key={item.userId}>{item.name}</Option>)}
          </Select>
          <div className="row mt-3">
            <div className="col-12">
              <p>Original Estimate</p>
              <input type="number" min="0" name="originalEstimate" defaultValue="0" className="form-control" height="30" />
            </div>
          </div>

        </div>
        <div className="col-6">
          <p>Time tracking</p>
          <Slider defaultValue={30} value={10} max={20} />
          <div className="row">
            <div className="col-6 text-left font-weight-bold">h logged</div>
            <div className="col-6 text-right font-weight-bold">h remaining</div>
          </div>
          <div className="row" style={{ marginTop: 5 }}>
            <div className="col-6">
              <p>Time spent</p>
              <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingSpent" />
            </div>

            <div className="col-6">
              <p>Time remaining</p>
              <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingRemaining" />
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
        // onEditorChange={(content, editor) => {
        //     setFieldValue('description', content);
        // }}
        />
      </div>
    </div>
  </div>;
}
