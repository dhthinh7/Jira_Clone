import { Button, Drawer } from 'antd';
import React, { useState } from 'react';
import CreateTask from '../Components/Form/CreateTask/CreateTask';
import EditProject from '../Components/Form/EditProject/EditProject';

export default function DrawerJira() {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
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
        title="Creat task"
        placement="right"
        onClose={onClose}
        open={open}
        height='100%'
        width="720px"
        footer={renderFooterDrawer()}
      >
        {/* <CreateTask/> */}
        <EditProject/>
      </Drawer>
    </>
  );
}
