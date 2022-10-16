import React from 'react'
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined, TwitterOutlined } from '@ant-design/icons';
import { withFormik, Formik } from 'formik'
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { USER_SIGN_IN_SAGA } from '../../redux/contains/contains';
import { NavLink } from 'react-router-dom';
function LoginPage(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  return (
    <form onSubmit={handleSubmit} className="container" style={{ height: window.innerHeight }} >
      <div className="d-flex flex-column justify-content-center align-items-center w-1/4 mx-auto" style={{ height: '100%' }} >
        <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>Create Account</h3>
        <div className="d-flex mt-3 w-full" >
          <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="email" size="large" placeholder="email" prefix={<UserOutlined />} />
        </div>
        <div className="text-danger text-left">{errors.email}</div>
        <div className="d-flex mt-3 w-full" >
          <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="name" size="large" placeholder="name" prefix={<UserOutlined />} />
        </div>
        <div className="text-danger">{errors.name}</div>
        <div className="d-flex mt-3 w-full">
          <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="phoneNumber" name="phoneNumber" size="large" placeholder="phoneNumber" prefix={<LockOutlined />} />
        </div>
        <div className="text-danger">{errors.phoneNumber}</div>
        <div className="d-flex mt-3 w-full">
          <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="password" name="passWord" size="large" placeholder="password" prefix={<LockOutlined />} />
        </div>
        <div className="text-danger">{errors.passWord}</div>
        <div className="flex justify-between w-full">
          <Button htmlType="submit" size="large" style={{ minWidth: '100%', backgroundColor: 'rgb(102,117,223)', color: '#fff' }} className="mt-5">Signup</Button>
        </div>
      </div>
    </form>
  )
}

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
    phoneNumber: Yup.string().required('Phone number is required!').min(10, '10 digits').max(10, '10 digits'),
    passWord: Yup.string().min(6, 'Password must have min 6 characters').max(32, 'Password  have max 32 characters')
  }),
  handleSubmit: ({ email, name, phoneNumber, passWord }, { props, setSubmitting }) => {
    alert("On going")
    // props.dispatch({
    //   type: USER_SIGN_IN_SAGA,
    //   userLogin: {
    //     email: email,
    //     password: password
    //   }
    // });
  },
  validateOnBlur: false,
  handleBlur: () => {
    alert("handle blur");
  },
  displayName: 'LoginPage',
})(LoginPage);

export default connect()(LoginWithFormik);