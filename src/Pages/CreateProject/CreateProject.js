import React from "react";
import './CreateProject.scss';

import * as yup from 'yup';
import { Editor } from '@tinymce/tinymce-react';

export default function CreateProject() {
  return <div className="jr-createPro ml-72 px-16 pt-10 w-full">
    <h1 className="font-semibold">Create Project</h1>
    <form className="jr-createProForm p-4">
      <div className="jr-formGroup mb-7">
        <h2 className="mb-3">Name</h2>
        <input type="text" name="projectName" id="" className="jr-formControl" />
      </div>
      <div className="jr-formGroup mb-7">
        <p className="mb-3">Description</p>
        <Editor

          name="description"

          init={{
            selector: 'textarea#myTextArea',

            height: 200,
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
        // onEditorChange={handleEditorChange}
        />
      </div>
      <div className="jr-formGroup mb-7">
        <select name="categoryId" className="jr-formControl">
          <option value="">Dự án web</option>
          <option value="">Dự án phần mềm</option>
          <option value="">Dự án di động</option>
        </select>
      </div>
      <button className="btn btn-outline-primary" type="submit">Create project</button>
    </form>

  </div>;
}
