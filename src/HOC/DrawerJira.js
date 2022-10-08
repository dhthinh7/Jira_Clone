import { Button, Drawer } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_FORM_DRAWER } from '../redux/contains/contains';

export default function DrawerJira() {
  const {isOpen, title, Component} = useSelector(state=>state.DrawerReducer);
  const dispatch = useDispatch();
  
  const onClose = () => {
    dispatch({
      type: CLOSE_FORM_DRAWER
    })
  };

  const renderFooterDrawer = () => {
    return <div className='text-right'>
      <Button type="primary" className='mr-2'>Submit</Button>
      <Button onClick={onClose}>Cancel</Button>
    </div>
  }

  return (
    <>
      <Drawer
        title={title}
        placement="right"
        onClose={onClose}
        open={isOpen}
        height='100%'
        width="720px"
        footer={renderFooterDrawer()}
      >
        {/* <CreateTask/> */}
        {/* <EditProject/> */}
        {Component}
      </Drawer>
    </>
  );
}
