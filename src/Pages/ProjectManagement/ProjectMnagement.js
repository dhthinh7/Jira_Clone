import React, { useState } from "react";
import { Button, Space, Table, Tag } from 'antd';
import { useEffect } from "react";
import { projectService } from "../../Services/ProjectService";
import { useDispatch, useSelector } from "react-redux";
import { GET_LIST_PROJECT_SAGA } from "../../redux/contains/contains";

export default function ProjectManagement() {
  const dispatch = useDispatch();
  const projectList = useSelector(state => state.ProjectReducer.projectList);

  useEffect(() => {
    dispatch({ type: GET_LIST_PROJECT_SAGA })

  }, [])

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
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
      width: '30%'
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
      onFilter: (value, record) => record.address.includes(value),
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
        return <Tag color="green">{record.creator?.name}</Tag>
      }
    },
    {
      title: 'Members',
      key: 'members',
      ellipsis: true,
      render: ()=>{
        return <>Update later</>
      }
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      sorter: (a, b) => a.address.length - b.address.length,
      ellipsis: true,
      render: ()=>{
        return <>Update later</>
      }
    },

  ];

  return <div className="ml-72 p-16 w-full">
    <h3>Project management</h3>

    <Space style={{ marginBottom: 16 }}>
      <Button onClick={setAgeSort}>Sort age</Button>
      <Button onClick={clearFilters}>Clear filters</Button>
      <Button onClick={clearAll}>Clear filters and sorters</Button>
    </Space>
    <Table tableLayout="fixed" pageSize={15} columns={columns} rowKey={"id"} dataSource={projectList} onChange={handleChange} />
  </div>;

}