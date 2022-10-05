
import { Layout, Menu } from 'antd';
import React from 'react';
import './SidebarLeft.scss';

import {
  SearchOutlined,
  PlusOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import Logo from '../Logo/Logo';
const { Sider } = Layout;


function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(<Logo size={'1.5em'} />),
  getItem('SEARCH ISSUE', '2', <SearchOutlined />),
  getItem('CREATE', '3', <PlusOutlined />),
  getItem('ABOUT', '6', <QuestionCircleOutlined />),
];

export default function SidebarLeft() {
  return <div className='jr-leftSidebar'>
    <Layout>
      <Sider className='jr-leftSidebarSidebar'>
        <Menu className='jr-leftSidebarMenu' defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
    </Layout>
  </div>
  ;
}


