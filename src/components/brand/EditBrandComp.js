import React, { Component } from "react";
import FormBrandComp from "./FormBrandComp";
import BrandServiceApi from "../../services/BrandService";
import Swal from 'sweetalert2';


export default class EditBrandComp extends Component{
  constructor(props) {
    super(props);
    this.state = {  
      loading: false,
      name: "",
      image: "",
      brandId: this.props.match.params.id
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.onBrandNameChange = this.onBrandNameChange.bind(this);
    this.onBrandImageChange = this.onBrandImageChange.bind(this);
  }

  componentDidMount(){
    const { brandId } = this.state;
    this.getBrandById(brandId);
  }

  onBrandNameChange(newName){
    this.setState({ name: newName });
  };

  onBrandImageChange(image, oldImage){
    this.setState({ image: image });
  }

  async getBrandById(id){
    try{
      const response = await BrandServiceApi.getBrandById(id);
      this.setState({ 
        name: response.name, 
        image: response.image
       });
    } catch(err){
      console.log('Brand with given ID not found.');
      Swal({
        title: 'Error!',
        text: 'Brand with given ID not found.',
        icon: 'error',
      });
    }

  }

  async handleUpdate(e) {
    e.preventDefault();
  
    const { name, image } = this.state;  
  
    try {
      if (name.trim()) {
        const formData = new FormData();
        formData.append('name', name);
  
        if (image) {
          formData.append('image', image);
        }
  
        await BrandServiceApi.updateBrand(this.state.brandId, formData);
        Swal.fire({
          icon: "success",
          title: "Product has been updated successfully",
          showConfirmButton: false,
          timer: 1500
        });
      }  else {
        Swal.fire({
          title: 'Info!',
          text: 'Please fill out all fields.',
          icon: 'info',
        });
      }
    } catch(err) {
      console.error('Error updating brand:', err);
      Swal({
        title: 'Error!',
        text: 'Failed to save brand.',
        icon: 'error',
      });
    }
  }
  
  
  render(){
    return(
      <>
      <h5>Edit Brand</h5>
      <form onSubmit={this.handleUpdate}>
        <FormBrandComp className="mt-2" 
          image={this.state.image}
          name={this.state.name}
          onBrandNameChange={this.onBrandNameChange}
          onBrandImageChange={this.onBrandImageChange}
        />
        <button type="submit" className="btn btn-primary mt-4">Update</button>
      </form>
    </>
    )
  }
}




