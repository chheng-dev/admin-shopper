import React, { Component } from "react";
import { Table, Space, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { TiTrash } from "react-icons/ti";
import BrandServiceApi from "../../services/BrandService";
import NoThumnail from "../../assets/images/placeholder-image.jpg";
import Swal from 'sweetalert2';


export default class BrandListComp extends Component{
  constructor(props) {
    super(props);
    this.state = {  
      loading: false,
      brands: []
    };
  }

  componentDidMount() {
    this.getBrandList();
  }

  async handleRemove(record){
    const brandId = record.id;
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
        await BrandServiceApi.deleteBrand(brandId);
        Swal.fire({
          title: "Deleted!",
          text: "Brand has been deleted.",
          icon: "success"
        });
      }
      this.getBrandList(); 
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete product.",
        icon: "error"
      });
      console.log('Brand with the given ID not found.');
    }
  }

  async getBrandList() {
    this.setState({ loading: true });
    try {
      const result = await BrandServiceApi.getBrandList();
      this.setState({ brands: result });
      console.log(result);
    } catch (err) {
      console.log('Error Fetching data', err);
    } finally {
      this.setState({ loading: false });
    }
  }


  render(){

    const columns = [
      {
        title: 'Image',
        dataIndex: 'image',
        render: (text, record) => (
          <div className='d-flex align-items-center'>
            {
              text === undefined  || text === '' || text != null ? (
                <img src={text} className="thumnail-image" alt={record.id}/>
              ) : (
                <img src={NoThumnail} className="thumnail-image" alt='avarar' />
              )
            }
          </div>
        )
      },
      {
        title: 'Name',
        dataIndex: 'name',
        render: (text) => (
          <>
            {text && (
              <span className="title-tag">
                {text}
              </span>
            )}
          </>
        )
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space>
            <Link to={`/brand/edit/${record.id}`}>
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
      <>
        <Spin spinning={this.state.loading} tip="Loading...">
          <div className='mb-2 d-flex justify-content-between align-items-center'>
            <div>
                <h5>Brands List</h5>
            </div>
            <div>
              <Link to={'/brand/create'} className='btn btn-primary btn-sm'>
                Add Brand
              </Link>
            </div>
          </div>
          <Table
            columns={columns}
            bordered
            dataSource={this.state.brands}
          />
        </Spin>
      </>
    )
  }
}