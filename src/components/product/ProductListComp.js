import React, { Component } from 'react';
import { Table, Space, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { TiTrash } from "react-icons/ti";
import ProductServiceApi from '../../services/ProductService';
import Swal from 'sweetalert2';


class ProductListComp extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      loading: false,
      products: []
    };
  }

  componentDidMount(){
    this.getProductList();
  }
  
  async getProductList(){
    this.setState({ loading: true });
    try{
      const result = await ProductServiceApi.GetProductList();
      this.setState({ products: result });
    } catch(err) {
      console.log('Error Fecting data', err);
    } finally {
      this.setState({ loading: false });
    }
  }

  async handleRemove(record) {
    const productId = record._id;
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
        await ProductServiceApi.DeleteProduct(productId);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete product.",
        icon: "error"
      });
    }
  }
  
  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Image',
        dataIndex: 'image',
        width: 120,
        render: (text, record) => (
          <img src={text} alt={`${record._id}`} width={60} />
        )
      },
      {
        title: 'Brand',
        dataIndex: 'brand'
      },
      {
        title: 'Category',
        dataIndex: 'category'
      },
      {
        title: 'Qty',
        dataIndex: 'qty'
      },
      {
        title: 'Price',
        dataIndex: 'price',
        width: 100,
        render: (text, record) => (
          <p className='text-center'>
            { text }
          </p>
        )
      },
      {
        title: 'Is Featured',
        dataIndex: 'isFeatured',
        width: 120,
      },
      {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        width: 100,    
        render: (text, record) => (
          <Space>
            <Link to={`/product/edit/${record._id}`}>
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
                <h5>Products List</h5>
            </div>
            <div>
              <Link to={'/product/create'} className='btn btn-primary btn-sm'>
                Add Product
              </Link>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={this.state.products}
            bordered
            scroll={{
              x: 1300,
            }}        
          />
        </Spin>
      </>
    );
  }
}

export default ProductListComp;
