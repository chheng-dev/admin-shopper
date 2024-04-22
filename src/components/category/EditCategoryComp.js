import React from "react";
import FormCategoryComp from "./FormCategoryComp";
import Swal from "sweetalert2";
import { Space } from "antd";
import { CiSaveDown2 } from "react-icons/ci";
import CategoryServiceApi from "../../services/CategoryService";

export default class EditCategoryComp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      categoryId: this.props.match.params.id,
      name: "",
      color: ""
    };
  
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  async componentDidMount(){
    if(this.state.categoryId){
      await this.getCategoryById(this.state.categoryId);
    }
  }

  async getCategoryById(id){
    try {
      const response = await CategoryServiceApi.getCategoryById(id);
      this.setState({ name: response.name, color: response.color });
    } catch(err){
      console.error('Error fetching category:', err);
      Swal({
        title: 'Error!',
        text: 'Failed to fetch category details.',
        icon: 'error',
      });

    }
  }
  
  onChangeName(value){
    this.setState({ name: value });
  }

  onChangeColor(value){
    this.setState({ color: value });
  }

  async handleUpdate(e) {
    e.preventDefault();
  
    try {
      const { name, color, categoryId } = this.state;
      const formData = {
        name: name, 
        color: color
      }
  
      if (name.trim()) {
        if (categoryId) {
          await CategoryServiceApi.updateCategoryById(categoryId, formData);
          Swal.fire({
            icon: "success",
            title: "Category has been updated",
            showConfirmButton: false,
            timer: 1500
          });
        }
      } else {
        Swal.fire({
          title: 'Info!',
          text: 'Please fill out all fields.',
          icon: 'info',
        });
      }
  
    } catch (err) {
      console.error('Error updating category:', err);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update category.',
        icon: 'error',
      });
    }
  }
  
  


  render(){
    return( 
      <>
        <h5>Edit Category</h5>

        <div className="bg-white pt-4 category-content">
          <form onSubmit={this.handleUpdate}>
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
                    Update
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