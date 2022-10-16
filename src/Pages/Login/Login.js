import React from 'react'
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined, TwitterOutlined } from '@ant-design/icons';
import { withFormik, Formik } from 'formik'
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { USER_SIGN_IN_SAGA } from '../../redux/contains/contains';
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
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }} >
        <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>Login cyberbugs</h3>
        <div className="d-flex mt-3" >
          <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="email" size="large" placeholder="email" prefix={<UserOutlined />} />
        </div>
        <div className="text-danger">{errors.email}</div>
        <div className="d-flex mt-3">
          <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="password" name="password" size="large" placeholder="password" prefix={<LockOutlined />} />
        </div>
        <div className="text-danger">{errors.password}</div>
        <Button htmlType="submit" size="large" style={{ minWidth: 300, backgroundColor: 'rgb(102,117,223)', color: '#fff' }} className="mt-5">Login</Button>
        <div className="social mt-3 d-flex">
          <Button style={{ backgroundColor: 'rgb(59,89,152)' }} shape="circle" size={"large"}>
            <span className="font-weight-bold" style={{ color: '#fff' }} >F</span>
          </Button>
          <Button type="primary ml-3" shape="circle" icon={<TwitterOutlined />} size={"large"}>
          </Button>
        </div>
      </div>
    </form>
  )
}

const LoginWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: ''
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string().required('Email is required!').email('Email is invalid!'),
    password: Yup.string().min(6, 'Password must have min 6 characters').max(32, 'Password  have max 32 characters')
  }),
  handleSubmit: ({ email, password }, { props, setSubmitting }) => {
    // setSubmitting(true);
    props.dispatch({
      type: USER_SIGN_IN_SAGA,
      userLogin: {
        email: email,
        password: password
      }
    });
  },
  validateOnBlur: false,
  handleBlur: () => {
    alert("handle blur");
  },
  displayName: 'LoginPage',
})(LoginPage);

export default connect()(LoginWithFormik);