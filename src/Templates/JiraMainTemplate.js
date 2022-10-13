import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import MenuMain from "../Components/MenuMain/MenuMain";
import Modal from "../Components/Modal/Modal";
import SidebarLeft from "../Components/SidebarLeft/SidebarLeft";
import './JiraMainTemplate.scss';

const MainJiraTemplate = styled.div({
  height: "100vh",
  fontWeight: "300",
  fontFamily: '"Roboto", sans-serif'
})

// Define HOC for main template
export default function JiraMainTemplate(props) {
  const { Component, ...restParam } = props;
  return <Route {...restParam} render={(propsRoute => {
    return <>
      <MainJiraTemplate className="jira flex">
        <SidebarLeft />
        <MenuMain />
        <Component {...propsRoute} />
        {/* <Modal /> */}
      </MainJiraTemplate>;

    </>
  })}>
  </Route>
}
