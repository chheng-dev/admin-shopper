import React, {Component} from "react";
import { Table, Space, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { TiTrash } from "react-icons/ti";

export default class UserListComp extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      users: [],
      loading: false
    };
  }

  render(){
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: 'Image',
        dataIndex: 'avatar',
        render: text => <span>{text}</span>,
      },
      {
        title: 'First name',
        dataIndex: 'firstname',
        render: text => <span>{text}</span>,
      },
      {
        title: 'Last name',
        dataIndex: 'lastname',
        render: (text, record) => (
          <div className='d-flex align-items-center'>
            <Space>
              <span>{text}</span>
              <input type="color" value={text} disabled style={{ "height": "20px", "border": "none", "border-raduis": "5px"}}/>
            </Space>
          </div>
        )
      },
      {
        title: 'Email',
        dataIndex: 'email',
        render: (text, record) => (
          <div className='d-flex align-items-center'>
            <Space>
              <span>{text}</span>
              <input type="color" value={text} disabled style={{ "height": "20px", "border": "none", "border-raduis": "5px"}}/>
            </Space>
          </div>
        )
      },
      {
        title: 'Role',
        dataIndex: 'role',
        render: (text, record) => (
          <div className='d-flex align-items-center'>
            <Space>
              <span>{text}</span>
              <input type="color" value={text} disabled style={{ "height": "20px", "border": "none", "border-raduis": "5px"}}/>
            </Space>
          </div>
        )
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space>
            <Link to={`/category/edit/${record.id}`}>
              <button className='btn btn-secondary btn-sm'>
                <FaRegEdit />
              </button>
            </Link>
            <button onClick={() => this.handleRemove(record)} className='btn btn-danger btn-sm'>
              <TiTrash className='text-lg'/>
            </button>
          </Space>
        ),
      },
    ];
    return(
      <Spin spinning={this.state.loading} tip="Loading...">
        <div className='mb-2 d-flex justify-content-between align-items-center'>
          <div>
            <h5>Users List</h5>
          </div>
          <div>
            <Link to={'/setting/user/create'} className='btn btn-primary btn-sm'>
              Add Category
            </Link>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={this.state.users}
          bordered
        />
      </Spin>
    )
  }
}