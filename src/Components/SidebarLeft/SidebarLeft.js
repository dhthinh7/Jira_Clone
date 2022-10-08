
import { Layout, Menu } from 'antd';
import React from 'react';
import './SidebarLeft.scss';

import {
  SearchOutlined,
  PlusOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import Logo from '../Logo/Logo';
import { useDispatch } from 'react-redux';
import { OPEN_FORM_DRAWER } from '../../redux/contains/contains';
import CreateProject from '../../Pages/CreateProject/CreateProject';
import CreateTask from '../Form/CreateTask/CreateTask';
const { Sider } = Layout;


export default function SidebarLeft() {
  const dispatch = useDispatch();
  return <div className='jr-leftSidebar'>
    <Layout>
      <Sider className='jr-leftSidebarSidebar'>
        <div className='logo'><Logo size={'2.5em'} /></div>
        <Menu className='jr-leftSidebarMenu' defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PlusOutlined style={{ fontSize: 20 }} />} onClick={() => {

          }}>
            <span className="mb-2" onClick={() => {
              dispatch({
                type: OPEN_FORM_DRAWER,
                title: 'Create Task',
                Component: <CreateTask />,
              })
              
            }}>Create task</span>
          </Menu.Item>
          <Menu.Item key="2" icon={<SearchOutlined style={{ fontSize: 20 }} />}>
            Search
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  </div>
    ;
}


