import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LINK_TO_EFFECT_LOADER_SAGA, LOGOUT_SAGA, SIGNIN, SIGNUP } from "../../redux/contains/contains";
import { USER_LOGIN } from "../../utils/constain/setting";
import './HeaderAccount.scss';

export default function HeaderAccount() {

  const dispatch = useDispatch();
  const ref = useRef(null)

  const [isShow, setIsShow] = useState(false);

  const handleMouse = (event) => {
    if (ref.current?.contains(event.target)) {
      setIsShow(true);
    } else if (!event.target.className.includes('arrow')) {
      setIsShow(false);
    }
  }

  useEffect(()=>{
    // Add event mousedown to close modal when click  outside modal
    window.addEventListener("mousedown", handleMouse);
    return () => {
      window.removeEventListener("mousedown", handleMouse);
    }
  }, [])

  const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
  
  const renderModal = () => {
    return <div className={ isShow ? "jr-head-modal showModal" : 'jr-head-modal hideModal'} ref={ref}>
      <button type="button" className="btn-header" style={{ backgroundColor: '#0368FF' }} onClick={() => {dispatch({ type: LOGOUT_SAGA })}}>Logout</button>
    </div>
  }

  if (userLogin) {
    return <div className="jr-head-account flex justify-end items-center">
      <h3 className="font-semibold text-base m-0 mr-2">Chào!, <span>{userLogin.name}</span></h3>
      <div className="avatar">
        <img src={userLogin.avatar} alt="" className="w-10 rounded-full" />
      </div>
      <button className="arrow ml-2" onClick={() => {setIsShow(!isShow)}}></button>
      {renderModal()}
    </div>;
  } else {
    return <div className="jr-head-account flex justify-end items-center">
      <i className="icon-login fa fa-hand-point-right text-base text-blue-700"></i>
      <h3 className="font-semibold text-base m-0 ml-2 hover:cursor-pointer hover:text-red-500 duration-300 text-blue-700" onClick={() => {
        dispatch({
          type: LINK_TO_EFFECT_LOADER_SAGA,
          actionType: SIGNIN
        })
      }}>Login</h3>
      <span className="mx-2">/</span>
      <h3 className="font-semibold text-base m-0 hover:cursor-pointer hover:text-red-500 duration-300 text-blue-700" onClick={() => {
        dispatch({
          type: LINK_TO_EFFECT_LOADER_SAGA,
          actionType: SIGNUP
        })
      }}>Register</h3>
    </div>;
  }
}
