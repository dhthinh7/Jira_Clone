import React, { useEffect, useState } from "react";
import './MainMenu.scss';
import '../SidebarLeft/SidebarLeft.scss';
import {
  CreditCardOutlined,
  SettingOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { history } from "../../utils/history";

import { FaBars } from 'react-icons/fa';
import { MdAddTask } from 'react-icons/md';
import CreateTask from "../Form/CreateTask/CreateTask";
import { OPEN_FORM_DRAWER } from "../../redux/contains/contains";


export default function MenuMain() {
  let [activeClassForKanboard, setActiveClassForKanboard] = useState('');
  let [screenWidth, setScreenWidth] = useState(window.innerWidth);
  let [isShow, setIsShow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    //Gọi api để lấy dữ liệu thẻ select
    dispatch({ type: 'GET_ALL_PROJECT_CATEGORY_SAGA' });
  }, []);

  useEffect(() => {
      history.location.pathname.includes("projectDetail") ? setActiveClassForKanboard('menuActived') : setActiveClassForKanboard('')
  }, [history.location]);

  useEffect(() => {
    window.addEventListener('resize', getScreenWidth);
    return () => window.removeEventListener('resize', window.addEventListener('resize', getScreenWidth));
  }, [screenWidth]);

  const handleClick = (e) => {
    // handleActived(e);
    setIsShow(false)
  }

  const handleActived = (e) => {
    // const elements = document.querySelectorAll([".jira-menu .menuActived"]);
    // console.log("elements",elements);
    // elements.forEach((item => {
    //   console.log("elements item",item);
    //   item.classList.remove('menuActived');
    //   item.classList.remove('active');
    // }))
    // e.currentTarget.classList.add('menuActived');
    // console.log("e.currentTarget.classList", e.currentTarget.classList);
  }

  const getScreenWidth = () => {
    let screenWidth = window.innerWidth;
    setScreenWidth(screenWidth);
  }

  const handleShowMenu = () => {
    setIsShow(!isShow);
  }

  return <div className={`${!isShow ? "" : "overlap"} jira-menu fixed ml-16 pl-3 pr-0 pt-0 pb-6}`}>
    <div className="jira_menuSmallScreen" onClick={handleShowMenu}>
      <FaBars />
    </div>
    <div className={`${!isShow ? "jira-hideControl" : "jira-showControl"} jira-menuFull`}>
      <div className="jira-menuAvatar py-6 px-1 flex align-middle">
        <div className="w-10 h-10 bg-cover bg-center rounded-full mr-4" alt="avatar" />
        <div>
          <p className="text-gray-900 py-0 my-0">Jira Cloning 1.0</p>
          <p className="py-0 my-0">Software propject</p>
        </div>
      </div>
      <div className={`${screenWidth < 768.9 ? "jira-menuItemSmall " : "jira-menuItem isDisplay"} text-base active`} onClick={() => {
        setIsShow(false);
        dispatch({
          type: OPEN_FORM_DRAWER,
          custom: {
            title: 'Create Task',
          },
          Component: <CreateTask />,
        })

      }}><MdAddTask />
      </div>
      <NavLink to='/kanboard' className={`${screenWidth < 768.9 ? "jira-menuItemSmall" : "jira-menuItem"} text-base active ${activeClassForKanboard}`} activeClassName="menuActived" onClick={handleClick}>
        <span className="icon mr-2"><CreditCardOutlined /></span>
        <span className="text">Kanban Board</span>
      </NavLink>
      <NavLink to='/projectManagement' className={`${screenWidth < 768.9 ? "jira-menuItemSmall" : "jira-menuItem"} text-base `} activeClassName="menuActived" onClick={handleClick}>
        <span className="icon mr-2"><SettingOutlined /></span>
        <span className="text">Project management</span>
      </NavLink>
      <NavLink to='/createProject' className={`${screenWidth < 768.9 ? "jira-menuItemSmall" : "jira-menuItem"} text-base `} activeClassName="menuActived" onClick={handleClick}>
        <span className="icon mr-2"><PlusCircleOutlined /></span>
        <span className="text">Create project</span>
      </NavLink>
      <NavLink to='/userManagement' className={`${screenWidth < 768.9 ? "jira-menuItemSmall" : "jira-menuItem"} text-base `} activeClassName="menuActived" onClick={handleClick}>
        <span className="icon mr-2"><i className="fa fa-users-cog"></i></span>
        <span className="text">User Management</span>
      </NavLink>
      <NavLink to='/' className="jira-menuItem jira-menuItem--unsupported text-base">
        <span className="icon mr-2"><i className="fa fa-truck"></i></span>
        <span className="text text--unsupported">Release</span>
        <span className="text text--replace">Unsupported</span>
      </NavLink>
      <NavLink to='/' className="jira-menuItem jira-menuItem--unsupported text-base">
        <span className="icon mr-2"><i className="fa fa-equals mr-1" /></span>
        <span className="text text--unsupported">Issues and filters</span>
        <span className="text text--replace">Unsupported</span>
      </NavLink>
      <NavLink to='/' className="jira-menuItem jira-menuItem--unsupported text-base">
        <span className="icon mr-2"><i className="fa fa-paste mr-1" /></span>
        <span className="text text--unsupported">Pages</span>
        <span className="text text--replace">Unsupported</span>
      </NavLink>
      <NavLink to='/' className="jira-menuItem jira-menuItem--unsupported text-base">
        <span className="icon mr-2"><i className="fa fa-location-arrow mr-1" /></span>
        <span className="text text--unsupported">Report</span>
        <span className="text text--replace">Unsupported</span>
      </NavLink>
    </div>
  </div>
}
