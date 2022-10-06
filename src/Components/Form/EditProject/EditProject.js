import { Editor } from '@tinymce/tinymce-react'
import { withFormik } from 'formik';
import React from 'react'
import * as Yup from 'yup';


export default function EditProject() {

    // const {
    //     values,
    //     touched,
    //     errors,
    //     handleChange,
    //     handleBlur,
    //     handleSubmit,
    //     setValues,
    //     setFieldValue
    // } = props;

    const handleSubmit = () => {

    }

    const handleChange = () => {

    }

    return (
        <form className="container-fuild" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-4">

                    <div className="form-group">
                        <p className="font-weight-bold">Project id</p>
                        <input disabled className="form-control" name="id" value={1} />
                    </div>


                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project name</p>
                        <input className="form-control" name="projectName" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project Category</p>
                        <select className="form-control" name="categoryId" >
                            <option value="">option1</option>
                            <option value="">option2</option>
                            <option value="">option3</option>
                            <option value="">option4</option>
                        </select>


                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <p className="font-weight-bold">Description</p>
                        <Editor
                            name="description123"
                            initialValue="{values.description}"
                            value="thinh doan"
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
                        />
                    </div>
                </div>
            </div>
        </form >
    )
}
