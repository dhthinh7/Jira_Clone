import React, { useEffect } from "react";
import './CreateProject.scss';

import * as yup from 'yup';
import { Editor } from '@tinymce/tinymce-react';
import { connect, useDispatch } from "react-redux";
import { withFormik } from "formik";
import { CREATE_PROJECT_SAGA, GET_ALL_PROJECT_CATEGORY_SAGA } from "../../redux/contains/contains";

function CreateProject(props) {

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setFieldValue
  } = props;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT_CATEGORY_SAGA
    })
  }, []);

  return <div className="jr-createPro ml-72 px-16 pt-10 w-full">
    <h1 className="font-semibold">Create Project</h1>
    <form className="jr-createProForm p-4" onSubmit={handleSubmit}>
      <div className="jr-formGroup mb-7">
        <h2 className="mb-3">Name</h2>
        <input type="text" name="projectName" className="jr-formControl" onChange={handleChange}/>
      </div>
      <div className="jr-formGroup mb-7">
        <p className="mb-3">Description</p>
        <Editor
          name="description"
          init={{
            // selector: 'textarea#myTextArea',
            height: 200,
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
            setFieldValue('description', content)
          }}
        />
      </div>
      <div className="jr-formGroup mb-7">
        <select name="categoryId" className="jr-formControl" value={values.id} onChange={handleChange}>
          {props.listCategory.map((item, index) => <option key={index} value={item.id}>{item.projectCategoryName}</option>)}
        </select>
      </div>
      <button className="btn btn-outline-primary" type="submit">Create project</button>
    </form>
  </div>;
}

const createProjectFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      projectName: '',
      description: '',
      categoryId: props.listCategory[0]?.id,
    }
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: CREATE_PROJECT_SAGA,
      newProject: values
    })
  },
  displayName: 'CreateProjectFormik',
})(CreateProject)


const mapStateToProps = (state => ({
  listCategory: state.ProjectCategoryReducer.listCategory
}))

export default connect(mapStateToProps)(createProjectFormik)