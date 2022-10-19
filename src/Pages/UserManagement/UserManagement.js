import { Button, Popconfirm, Table } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { DELETE_USER_SAGA, EDIT_USER, GET_LIST_PROJECT_SAGA, GET_USER_SAGA, LINK_TO_EFFECT_LOADER_SAGA, OPEN_FORM_DRAWER, SEARCH_TEMP, SIGNUP } from "../../redux/contains/contains";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import EditUser from "../../Components/EditUser/EditUser";
import './UserManagement.scss';

export default function UserManagement() {

  const dispatch = useDispatch();
  const refSearch = useRef(null);

  // Create temp userSearch to hold value in search input
  const { userSearch, searchTemp } = useSelector(state => state.UserReducer);
  const projectList = useSelector(state => state.ProjectReducer.projectList);

  // Get users who joined in project
  let listMembersJoinedProject = []
  projectList.forEach((item, index) => {
    item.members.forEach(item => {
      listMembersJoinedProject.push(item.userId);
    })
    listMembersJoinedProject.push(item.creator.id);
  })
  listMembersJoinedProject = listMembersJoinedProject.filter((val, index, array) => array.indexOf(val) === index);

  // Data binding to table
  const listUser = userSearch.map((item, index) => {
    return { ...item, stt: index + 1 }
  })

  useEffect(() => {
    dispatch({ type: GET_USER_SAGA, keyword: '' });
    dispatch({ type: GET_LIST_PROJECT_SAGA });
  }, [])

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const handleChange = (e) => {
    // Debounce search
    if (!refSearch) {
      clearTimeout(refSearch.current);
    }
    refSearch.current = setTimeout(() => {
      dispatch({ type: GET_USER_SAGA, keyword: e.target.value });
      dispatch({ type: SEARCH_TEMP, searchTemp: e.target.value });
    }, 300)
  }

  // Define column for user table
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      width: '10px',
      key: 'stt',
      sorter: (item1, item2) => {
        return item1.stt > item2.stt
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '30%',
      key: 'email'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (item1, item2) => {
        return item1.name?.trim().toLowerCase() > item2.name?.trim().toLowerCase() ? 1 : -1
      },
      // filterDropdown: () => {
      //   return <div>Search name</div>
      // },
      // filterIcon: (filtered) => (
      //   <SearchOutlined
      //     style={{
      //       color: filtered ? '#1890ff' : undefined,
      //     }}
      //   />
      // ),
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',
      render: (text, record, index) => {
        return <div>
          <button className="btn mr-2 btn-primary" onClick={() => {
            // Open drawer with edit user form
            dispatch({
              type: OPEN_FORM_DRAWER,
              custom: {
                title: 'User Edit',
                width: '40%',
                height: '50%'
              },
              Component: <EditUser />
            });

            // Dispatch current row to reducer
            dispatch({
              type: EDIT_USER,
              userEdit: record,
            });
          }}>
            Edit
          </button>
          {listMembersJoinedProject.find((item, index) => record.userId === item) ? <button className="btn btn-danger user-created-project disabled">Delete</button> :
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => {
                dispatch({ type: DELETE_USER_SAGA, userId: record.userId, searchTemp: searchTemp });
              }}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn btn-danger">Delete</button>
            </Popconfirm>
          }
        </div>
      },
    },
  ];

  // Update layout
  return <div className="jr-user-management">
    <div className="us-create">
      <span className="font-semibold text-base m-0 hover:cursor-pointer hover:text-red-500 duration-300 text-blue-700 underline" onClick={() => {
        dispatch({
          type: LINK_TO_EFFECT_LOADER_SAGA,
          actionType: SIGNUP
        })
      }}>Create User</span>
    </div>
    <div className="input-search flex items-center justify-between my-3">
      <input type="text" name="" id="" className="form-control mr-3 focus:shadow-none" placeholder="seach ..." onChange={handleChange} />
      <Button type="primary" size="large" className="border-none border-transparent border-0" onClick={() => {
        dispatch({ type: GET_USER_SAGA, keyword: searchTemp });
      }}>Primary</Button>
    </div>
    <div className="jr-user-table">
      <Table columns={columns} dataSource={listUser} rowKey={"userId"} onChange={onChange} rowClassName={(record, index) => {
        return index % 2 !== 0 ? 'user-row-table bg-slate-100' : 'user-row-table'
      }} />
    </div>
  </div>;
}
