import { Button, Input } from "antd";
import React, { useEffect } from "react";
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined } from '@ant-design/icons';
import { connect, useSelector } from "react-redux";
import * as Yup from 'yup';
import { withFormik } from "formik";
import { useDispatch } from "react-redux";
import { EDIT_USER_SAGA, GET_USER_SAGA, SET_SUBMIT_TASK } from "../../redux/contains/contains";
import { REGEX_EMAIL, REGEX_PHONE } from "../../utils/constain/setting";

function EditUser(props) {
  const dispatch = useDispatch();

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = props;


  useEffect(() => {
    dispatch({ type: SET_SUBMIT_TASK, callBackSubmit: handleSubmit });
  }, []);

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className="container" >
      <div className="d-flex flex-column justify-content-center align-items-center w-3/4 mx-auto" style={{ height: '100%' }} >
        <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>USER ID: {props.userEdit.userId}</h3>
        <div className="d-flex mt-3 w-full" >
          <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="name" size="large" placeholder="Name" prefix={<UserOutlined />} value={values.name} />
        </div>
        <div className="text-danger text-start">{errors.name}</div>
        <div className="d-flex mt-3 w-full" >
          <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="email" size="large" placeholder="Email" prefix={<MailOutlined />} value={values.email} />
        </div>
        <div className="text-danger text-left">{errors.email}</div>
        <div className="d-flex mt-3 w-full">
          <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="phoneNumber" name="phoneNumber" size="large" placeholder="PhoneNumber" prefix={<PhoneOutlined />} value={values.phoneNumber} />
        </div>
        <div className="text-danger">{errors.phoneNumber}</div>
        <div className="d-flex mt-3 w-full">
          <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="password" name="password" size="large" placeholder="Enter new password" prefix={<LockOutlined />} value={values.password} />
        </div>
        <div className="text-danger">{errors.password}</div>
      </div>
    </form>
  )
}

const UserEditWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { userEdit } = { ...props };
    return {
      id: userEdit.userId,
      password: '',
      email: userEdit.email,
      name: userEdit.name,
      phoneNumber: userEdit.phoneNumber,
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().required('Email is required!').matches(REGEX_EMAIL, 'Email is invalid!'),
    name: Yup.string().required('Name is required!'),
    phoneNumber: Yup.string().required('Phone number is required!').matches(REGEX_PHONE, '10 digits'),
    password: Yup.string().min(6, 'Password must have min 6 characters').max(32, 'Password  have max 32 characters'),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: EDIT_USER_SAGA,
      userEdit: values,
      searchTemp: props.searchTemp
    });
  },
  validateOnBlur: false,
  displayName: 'LoginPage',
})(EditUser);

const mapStateToProps = (state) => {
  return {
    userEdit: state.UserReducer.userEdit,
    searchTemp: state.UserReducer.searchTemp
  }
}

export default connect(mapStateToProps)(UserEditWithFormik);
