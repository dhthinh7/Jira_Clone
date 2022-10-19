import { Editor } from '@tinymce/tinymce-react'
import { withFormik } from 'formik';
import React from 'react'
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { GET_ALL_PROJECT_CATEGORY_SAGA, SET_SUBMIT_TASK, UPDATE_PROJECT_SAGA } from '../../../redux/contains/contains';


function EditProject(props) {

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
        dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA });
        dispatch({ type: SET_SUBMIT_TASK, callBackSubmit: handleSubmit })
    }, []);


    return (
        <form className="container-fuild" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project id</p>
                        <input disabled className="form-control" name="id" value={values.id} />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project name</p>
                        <input className="form-control" name="projectName" onChange={handleChange} value={values.projectName} />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project Category</p>
                        <select className="form-control" name="categoryId" value={values.categoryId} onChange={handleChange}>
                            {props.listCategory?.map((item, index) => <option key={index} value={item.id}>{item.projectCategoryName}</option>)}
                        </select>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <p className="font-weight-bold">Description</p>
                        <Editor
                            name="description123"
                            initialValue={props.projectEdit.description}
                            value = {values.description}

                            init={{
                                selector: 'textarea#myTextArea',
                                height: 150,

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
                                setFieldValue('description', content);
                            }}
                        />
                    </div>
                </div>
            </div>
        </form >
    )
}

const EditProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { projectEdit } = {...props};

        return {
            id: projectEdit?.id,
            projectName: projectEdit.projectName,
            // creator: projectEdit.creator.id,
            description: projectEdit.description,
            categoryId: projectEdit.categoryId
        }
    },
    validationSchema: Yup.object().shape({

    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: UPDATE_PROJECT_SAGA,
            projectUpdate: values,
        })

    },
    displayName: 'EditProjectForm',
})(EditProject);

const mapStateToProps = (state) => ({
    projectEdit: state.ProjectReducer.projectEdit,
    listCategory: state.ProjectCategoryReducer.listCategory
})

export default connect(mapStateToProps)(EditProjectForm);
