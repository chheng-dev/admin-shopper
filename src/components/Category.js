import React, { Component } from 'react';
import { Table, Space, Spin } from 'antd';
import { Link } from 'react-router-dom';
import CategoryServiceApi from '../services/CategoryService';
import { FaRegEdit } from "react-icons/fa";
import { TiTrash } from "react-icons/ti";
import Swal from 'sweetalert2';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      categories: [],
      loading: false
    };
  }

  componentDidMount() {
    this.getCategoryList();
  }

  async getCategoryList() {
    this.setState({ loading: true });
    try {
      const result = await CategoryServiceApi.getCategoriesList();
      this.setState({ categories: result });
    } catch (err) {
      console.log('Error Fetching data', err);
    } finally {
      this.setState({ loading: false });
    }
  }

  async handleRemove(record) {
    const categoryId = record.id;
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });
  
      if (result.isConfirmed) {
        await CategoryServiceApi.deleteCategoryById(categoryId);
        Swal.fire({
          title: "Deleted!",
          text: "Category has been deleted.",
          icon: "success"
        });
      }
      this.getCategoryList(); 
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete product.",
        icon: "error"
      });
      console.log('Category with the given ID not found.');
    }
  }

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        render: text => <span>{text}</span>,
      },
      {
        title: 'Color',
        dataIndex: 'color',
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

    return (
      <>
        <Spin spinning={this.state.loading} tip="Loading...">
          <div className='mb-2 d-flex justify-content-between align-items-center'>
            <div>
              <h5>Categoris List</h5>
            </div>
            <div>
              <Link to={'/category/create'} className='btn btn-primary btn-sm'>
                Add Category
              </Link>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={this.state.categories}
            bordered
          />
        </Spin>
      </>
    );
  }
}

export default Category;
