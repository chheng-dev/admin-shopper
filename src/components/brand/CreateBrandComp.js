import React, { Component } from "react";
import FormBrandComp from "./FormBrandComp";
import BrandServiceApi from "../../services/BrandService";
import Swal from 'sweetalert2';


export default class CreateBrandComp extends Component{
  constructor(props) {
    super(props);
    this.state = {  
      brandName: "",
      image: null
    };
  }

  componentDidMount(){

  }

  handleBrandNameChange = (brandName) => {
    this.setState({ brandName });
  };

  handleBrandImageChange = (image) => {
    this.setState({ image: image });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { brandName, image } = this.state
    try{
      if(brandName.trim()){
        const formData = new FormData();
        formData.append("image", image);
        formData.append('name', brandName);
        await BrandServiceApi.createBrand(formData);
        Swal.fire({
          icon: "success",
          title: "Product has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        this.setState({ brandName: '', image: null });
      } else {
        Swal.fire({
          title: 'Info!',
          text: 'Please fill out all fields.',
          icon: 'info',
        });
      }
    }catch(err){
      Swal.fire({
        title: 'Error!',
        text: 'Failed to save brand.',
        icon: 'error',
      });
    }
  }

 render(){
  return(
    <>
      <h5>Create Brand</h5>
      <form onSubmit={this.handleSubmit}>
          <FormBrandComp className="mt-2" 
            image={this.state.image}
            brandName={this.state.brandName}
            onBrandNameChange={this.handleBrandNameChange}
            onBrandImageChange={this.handleBrandImageChange}
          />
          <button type="submit" className="btn btn-primary mt-4">Create</button>
        </form>
    </>
  )
 } 
}