import React from "react";
import FormProductComp from "./FormProductComp";
import ProductServiceApi from "../../services/ProductService";
import Swal from 'sweetalert2';


export default class CreateProductComp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      price: 0,
      qty: 0,
      brand: null,
      category: null,
      name: '',
      description: '',
      richDescription: '',
      isFeatured: false,
      image: null,
    };
    this.onChangeQty = this.onChangeQty.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeBrand = this.onChangeBrand.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeProductName = this.onChangeProductName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeRichDescription = this.onChangeRichDescription.bind(this);
    this.onChangeIsFeatured = this.onChangeIsFeatured.bind(this);
    this.onChangeProductImage = this.onChangeProductImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  onChangePrice(value){
    this.setState({ price: value});
  }
  
  onChangeQty(value){
    this.setState({ qty: value })
  }

  onChangeBrand(selectedBrand){
    this.setState({ brand: selectedBrand });
  }

  onChangeCategory(selectedCategory){
    this.setState({ category: selectedCategory });
  }

  onChangeProductName(name){
    this.setState({ name: name })
  }

  onChangeDescription(description){
    this.setState({ description: description })
  }

  onChangeRichDescription(richDescription){
    this.setState({ richDescription: richDescription })
  }

  onChangeIsFeatured(value){
    this.setState({ isFeatured: value });
  }

  onChangeProductImage(file){
    console.log('file', file);
    this.setState({ image: file });
  }
  
  async handleSubmit(e){
    e.preventDefault();

    const {price, name, brand, category, description, richDescription, image, qty, isFeatured } = this.state;
    try{
      if (name.trim()){
        const formData = new FormData();

        formData.append('name', name);
        formData.append('price', price);
        formData.append('brand', brand.id);
        formData.append('category', category.id);
        formData.append('description', description);
        formData.append('richDescription', richDescription);
        formData.append('qty', qty);
        formData.append('image', image);
        formData.append('isFeatured', isFeatured);

        await ProductServiceApi.CreateProduct(formData);

        Swal.fire({
          icon: "success",
          title: "Product has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        this.initailizeForm();
      }
    } catch(err) {
      console.error('Error creating brand:', err);
      Swal({
        title: 'Error!',
        text: 'Failed to save brand.',
        icon: 'error',
      });
      throw err;
    }
  } 

  initailizeForm(){
    this.setState({
      name: '',
      price: 0,
      qty: 0,
      category: [],
      brand: [],
      image: null,
      isFeatured: false,
      description: '',
      richDescription: ''
    });
  }

  render(){
    return( 
      <>
        <h5>Create Product</h5>
        <form onSubmit={this.handleSubmit}>
          <FormProductComp 
            name={this.state.name}
            price= {this.state.price}
            qty= {this.state.qty}
            category= {this.state.category}
            brand= {this.state.brand}
            image= {this.state.image}
            isFeatured={this.state.isFeatured}
            description= {this.state.description}
            richDescription={this.state.richDescription}
            className="mt-2" 
            onChangePrice={this.onChangePrice}
            onChangeQty={this.onChangeQty}
            onChangeBrand={this.onChangeBrand}
            onChangeCategory={this.onChangeCategory}
            onChangeProductName={this.onChangeProductName}
            onChangeDescription={this.onChangeDescription}
            onChangeRichDescription={this.onChangeRichDescription}
            onChangeIsFeatured={this.onChangeIsFeatured}
            onChangeProductImage={this.onChangeProductImage}
            />
          <button type="submit" className="btn btn-primary mt-4">Create</button>
        </form>
      </>

    )
  }
}