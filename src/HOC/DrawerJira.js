import { Button, Drawer } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_FORM_DRAWER } from '../redux/contains/contains';

export default function DrawerJira() {
  const {isOpen, custom, Component, callBackSubmit} = useSelector(state=>state.DrawerReducer);
  const dispatch = useDispatch();
  
  const onClose = () => {
    dispatch({
      type: CLOSE_FORM_DRAWER
    })
  };

  const renderFooterDrawer = () => {
    return <div className='text-right'>
      <Button type="primary" className='mr-2' onClick={callBackSubmit}>Submit</Button>
      <Button onClick={onClose}>Cancel</Button>
    </div>
  }

  return (
    <>
      <Drawer
        title={custom.title}
        placement={custom.placement}
        onClose={onClose}
        open={isOpen}
        height={custom.height}
        width={custom.width}
        footer={renderFooterDrawer()}
      >
        {Component}
      </Drawer>
    </>
  );
}
