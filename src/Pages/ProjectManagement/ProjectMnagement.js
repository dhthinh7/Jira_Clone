import React, { useState } from "react";
import { AutoComplete, Avatar, Button, Popconfirm, Popover, Table, Tag } from 'antd';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_USER_PROJECT_SAGA, DELETE_PROJECT_SAGA, EDIT_PROJECT, GET_LIST_PROJECT_SAGA, GET_USER_SAGA, OPEN_FORM_DRAWER, REMOVE_USER_PROJECT_API } from "../../redux/contains/contains";
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'
import EditProject from "../../Components/Form/EditProject/EditProject";

export default function ProjectManagement() {

  const [value, setValue] = useState('');
  const [options, setOptions] = useState([])

  const dispatch = useDispatch();
  const projectList = useSelector(state => state.ProjectReducer.projectList);
  const { userSearch } = useSelector(state => state.UserReducer)

  useEffect(() => {
    dispatch({ type: GET_LIST_PROJECT_SAGA })

  }, []);

  const onSearch = (searchText) => {

    dispatch({
      type: GET_USER_SAGA,
      keyword: searchText
    })

    setOptions(userSearch?.map((user) => {
      return { label: user.name, value: user.userId.toString() }
    }))
  };

  const onChange = (data) => {
    setValue(data);
  };


  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      ellipsis: true,
      width: '10%'
    },
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'projectName',
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
      ellipsis: true,
      width: '20%'
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      key: 'categoryName',
      sorter: (item2, item1) => {
        let projectName1 = item1.categoryName?.trim().toLowerCase();
        let projectName2 = item2.categoryName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
      ellipsis: true,
    },
    {
      title: 'Creator',
      // dataIndex: 'creator',
      key: 'creator',
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.creator.includes(value),
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.name.trim().toLowerCase();
        let creator2 = item2.creator?.name.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
      ellipsis: true,
      render: (text, record, index) => {
        return <Tag color="green">{text.creator?.name}</Tag>
      }
    },
    {
      title: 'Members',
      key: 'members',
      ellipsis: true,
      render: (text, record, index) => {
        return <div>
          {text.members?.slice(0, 3).map((member, index) => {
            return <Popover key={index} content={() => {
              return <table className="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>avatar</th>
                    <th>name</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {text.members?.map((item, index) => {
                    return <tr key={index}>
                      <td>{item.userId}</td>
                      <td><img src={item.avatar} width="30" height="30" style={{ borderRadius: '15px' }} /></td>
                      <td>{item.name}</td>
                      <td>
                        <button onClick={() => {
                          dispatch({
                            type: REMOVE_USER_PROJECT_API,
                            userIdProject: {
                              userId: item.userId,
                              projectId: text.id
                            }
                          })

                        }} className="btn btn-danger" style={{ borderRadius: '50%' }}>X</button>
                      </td>
                    </tr>
                  })}
                </tbody>
              </table>
            }}>
              <Avatar key={index} src={member.avatar} />
            </Popover>
          })}
          {text.members?.length > 3 ? <Avatar>...</Avatar> : ''}
          <Popover placement="rightTop" title={"Add user"} content={() => {
            return <AutoComplete
              options={options}
              style={{
                width: 200,
              }}
              value={value}
              onSelect={(valueSelect, option) => {
                setValue(option.label);
                //Gọi api gửi về backend
                dispatch({
                  type: ADD_USER_PROJECT_SAGA,
                  userProject: {
                    projectId: text.id,
                    userId: valueSelect
                  }
                })
              }}
              onSearch={onSearch}
              onChange={onChange}
              placeholder="input here" />
          }} trigger="click">
            <Button style={{ borderRadius: '50%' }}>+</Button>
          </Popover>
        </div>
      }
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      sorter: (a, b) => a.address.length - b.address.length,
      ellipsis: true,
      render: (text, record, index) => {
        return <div>
          <button className="btn mr-2 btn-primary" onClick={() => {
            const action = {
              type: OPEN_FORM_DRAWER,
              title: 'Edit Project',
              Component: <EditProject />,
            }

            // Open drawer with edit Project Form
            dispatch(action);

            // Dispatch current row to reducer
            const actionEditProject = {
              type: EDIT_PROJECT,
              projectEdit: text
            }
            dispatch(actionEditProject);
          }}>
            <FormOutlined style={{ fontSize: 17 }} />
          </button>
          <Popconfirm
            title="Are you sure to delete this project?"
            onConfirm={() => {
              dispatch({ type: DELETE_PROJECT_SAGA, projectId: text.id });
            }}

            okText="Yes"
            cancelText="No"
          >
            <button className="btn btn-danger">
              <DeleteOutlined style={{ fontSize: 17 }} />
            </button>
          </Popconfirm>

        </div>
      },
    },

  ];

  return <div className="ml-72 p-16 w-full">
    <h1 className="font-semibold">Project management</h1>
    <Table className="p-4" tableLayout="fixed" columns={columns} rowKey={"id"} dataSource={projectList} onChange={handleChange} />
  </div>;

}