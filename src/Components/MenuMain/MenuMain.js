import React, { useRef } from "react";
import './MainMenu.scss';
import '../SidebarLeft/SidebarLeft.scss';
import {
  CreditCardOutlined,
  SettingOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import { NavLink } from "react-router-dom";


export default function MenuMain() {

  const ref = useRef();

  const handleClick = (e) => {
    // const elements = document.querySelectorAll([".jira-menu .actived"]);
    // elements[0].classList.remove('actived');
    // e.currentTarget.classList.add('actived');
    handleActived(e);
  }

  const handleActived = (e) => {
    const elements = document.querySelectorAll([".jira-menu .actived"]);
    elements[0].classList.remove('actived');
    e.currentTarget.classList.add('actived');
  }

  return <div className="jira-menu fixed ml-16 pl-3 pr-0 pt-0 pb-6">
    <div className="jira-menuAvatar py-6 px-1 flex align-middle">
      <div className="w-10 h-10 bg-cover bg-center rounded-full mr-4" alt="avatar" />
      <div>
        <p className="text-gray-900 py-0 my-0">Jira Cloning 1.0</p>
        <p className="py-0 my-0">Software propject</p>
      </div>
    </div>
    <NavLink to='/' className="jira-menuItem text-base actived" onClick={handleClick}>
      <span className="icon mr-4"><CreditCardOutlined /></span>
      <span className="text">Kaban Board</span>
    </NavLink>
    <NavLink to='/' className="jira-menuItem text-base" onClick={handleClick}>
      <span className="icon mr-4"><SettingOutlined /></span>
      <span className="text">Project management</span>
    </NavLink>
    <NavLink to='/' className="jira-menuItem text-base" onClick={handleClick}>
      <span className="icon mr-4"><PlusCircleOutlined /></span>
      <span className="text">Create project</span>
    </NavLink>
    <br />
    <NavLink to='/' className="jira-menuItem jira-menuItem--unsupported text-base">
      <span className="icon mr-4"><i className="fa fa-truck"></i></span>
      <span className="text text--unsupported">Release</span>
      <span className="text text--replace">Unsupported</span>
    </NavLink>
    <NavLink to='/' className="jira-menuItem jira-menuItem--unsupported text-base">
      <span className="icon mr-4"><i className="fa fa-equals mr-1" /></span>
      <span className="text text--unsupported">Issues and filters</span>
      <span className="text text--replace">Unsupported</span>
    </NavLink>
    <NavLink to='/' className="jira-menuItem jira-menuItem--unsupported text-base">
      <span className="icon mr-4"><i className="fa fa-paste mr-1" /></span>
      <span className="text text--unsupported">Pages</span>
      <span className="text text--replace">Unsupported</span>
    </NavLink>
    <NavLink to='/' className="jira-menuItem jira-menuItem--unsupported text-base">
      <span className="icon mr-4"><i className="fa fa-location-arrow mr-1" /></span>
      <span className="text text--unsupported">Report</span>
      <span className="text text--replace">Unsupported</span>
    </NavLink>
  </div>
}
