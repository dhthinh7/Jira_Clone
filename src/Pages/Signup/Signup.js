import React from 'react'
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { withFormik } from 'formik'
import * as Yup from 'yup';
import { connect } from 'react-redux';
import {  USER_SIGN_UP_SAGA } from '../../redux/contains/contains';
import { NavLink } from 'react-router-dom';
import "./Signup.scss";
function LoginPage(props) {
  const {
    errors,
    handleChange,
    handleSubmit,
  } = props;

  return (
    <form onSubmit={(e)=>{e.preventDefault(); handleSubmit()}} className="container" style={{ height: window.innerHeight }} >
      <div className="signup d-flex flex-column justify-content-center align-items-center w-1/4 mx-auto" style={{ height: '100%' }} >
        <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>Create Account</h3>
        <div className="d-flex mt-3 w-full" >
          <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="email" size="large" placeholder="Email" prefix={<MailOutlined />} />
        </div>
        <div className="text-danger text-left">{errors.email}</div>
        <div className="d-flex mt-3 w-full" >
          <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="name" size="large" placeholder="Name" prefix={<UserOutlined />} />
        </div>
        <div className="text-danger">{errors.name}</div>
        <div className="d-flex mt-3 w-full">
          <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="phoneNumber" name="phoneNumber" size="large" placeholder="PhoneNumber" prefix={<PhoneOutlined />} />
        </div>
        <div className="text-danger">{errors.phoneNumber}</div>
        <div className="d-flex mt-3 w-full">
          <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="password" name="passWord" size="large" placeholder="Password" prefix={<LockOutlined />} />
        </div>
        <div className="text-danger">{errors.passWord}</div>
        <div className="flex justify-between w-full">
          <Button htmlType="submit" size="large" style={{ minWidth: '100%', backgroundColor: 'rgb(102,117,223)', color: '#fff' }} className="signup-btn mt-5 border-0">Signup</Button>
        </div>
        <NavLink to="/login">Back to login <i className="fa fa-long-arrow-alt-left mt-3"></i></NavLink>
      </div>
    </form>
  )
}

const regExPhone = /(84[0-9]{8})|(0[0-9]{9})\b/g;
const LoginWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: '',
    name: '',
    phoneNumber: '',
    passWord: '',
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string().required('Email is required!').email('Email is invalid!'),
    name: Yup.string().required('Name is required!'),
    phoneNumber: Yup.string().required('Phone number is required!').matches(regExPhone, 'The phone number has wrong format').max(10, '10 digits'),
    passWord: Yup.string().min(6, 'Password must have min 6 characters').max(32, 'Password  have max 32 characters')
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: USER_SIGN_UP_SAGA,
      userSignup: values
    });
  },
  validateOnBlur: false,
  displayName: 'LoginPage',
})(LoginPage);

export default connect()(LoginWithFormik);