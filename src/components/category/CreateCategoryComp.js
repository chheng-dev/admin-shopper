import React from "react";
import FormCategoryComp from "./FormCategoryComp";
import { Space } from 'antd';
import { CiSaveDown2 } from "react-icons/ci";
import CategoryServiceApi from "../../services/CategoryService";
import Swal from "sweetalert2";
export default class CreateCategoryComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: '',
    };

    this.onChangeColor = this.onChangeColor.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  onChangeName(value){
    this.setState({ name: value });
  }

  onChangeColor(value){
    this.setState({ color: value});
  }

  // async handleSubmit(e){
  //   e.preventDefault();

  //   try {
  //     const {name, color} = this.state;
      
  //     const formData = {
  //       name: name,
  //       color: color
  //     }

  //     if(name.trim()){
  //       await CategoryServiceApi.createCategory(formData);
  //       Swal.fire({
  //         icon: "success",
  //         title: "Category has been saved",
  //         showConfirmButton: false,
  //         timer: 1500
  //       });
  //       this.setState({ name: '', color: '' });
  //     } else {
  //       Swal({
  //         title: 'Info!',
  //         text: 'Please fill out all fields.',
  //         icon: 'info',
  //       });
  //     }
  //   } catch(err){
  //     console.log('Error creating category:', err);
  //     Swal({
  //       title: 'Error!',
  //       text: 'Failed to save cateogry.',
  //       icon: 'error',
  //     });
  //     throw err;
  //   }

  // }
  async handleSubmit(e) {
    e.preventDefault();
  
    try {
      const { name, color } = this.state;
  
      if (name.trim()) {
        const formData = {
          name: name,
          color: color
        };
  
        await CategoryServiceApi.createCategory(formData);
        Swal.fire({
          icon: "success",
          title: "Category has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        
        this.setState({ name: '', color: '' });
      } else {
        Swal({
          title: 'Info!',
          text: 'Please fill out the name field.',
          icon: 'info',
        });
      }
    } catch(err) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to save category.',
        icon: 'error',
      });
    }
  }
  

  render() {
    return (
      <>
        <h5>Create Category</h5>

        <div className="bg-white pt-4 category-content">
          <form onSubmit={this.handleSubmit}>
            <FormCategoryComp onChangeName={this.onChangeName}
                            onChangeColor={this.onChangeColor}
                            name={this.state.name}
                            color={this.state.color}
            />
            <Space>
              <button type="button" className="btn btn-outline-secondary">Cancel</button>
              <button type="submit" className="btn btn-primary">
                <Space>
                  <CiSaveDown2 />
                  <span>
                    Create
                  </span>
                </Space>
              </button>
            </Space>
          </form>
        </div>
      </>
    )
  }
}
