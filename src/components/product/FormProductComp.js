import React from "react";
import Select from 'react-select';
import CategoryServiceApi from "../../services/CategoryService";
import Swal from 'sweetalert2';
import BrandServiceApi from "../../services/BrandService";
import { InputNumber } from "antd";


export default class FormProductComp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      categories: this.props.category,
      brands: this.props.brand,
      ratingStart: "",
      name: this.props.name,
      description: this.props.description,
      richDescription: this.props.richDescription,
      image: this.props.image,
      price: this.props.price,
      qty: this.props.qty,
      selectedBrand: null,
      selectedCategory: null,
      isFeatured: this.props.isFeatured
    };
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeQty = this.onChangeQty.bind(this);
    this.onChangeBrand = this.onChangeBrand.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeProductName = this.onChangeProductName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeRichDescription = this.onChangeRichDescription.bind(this);
    this.onChangeIsFeatured = this.onChangeIsFeatured.bind(this);
    this.onChangeProductImage = this.onChangeProductImage.bind(this);

  }
  
  async componentDidMount(){
    await this.getCategoryList();
    await this.getBrandList();
  }

  async getCategoryList(){
    try{
      const response = await CategoryServiceApi.GetCategoryList();
      var categories = response.map(cat => ({
        label: cat.name,
        value: cat.name.toLowerCase().replace(/\s+/g, '-'),
        id: cat._id
      }));
      this.setState({ categories: categories });
      return categories;
    }catch(err){
      console.log('Category fecting error', err);
      Swal({
        title: 'Error!',
        text: 'Category fecting error.',
        icon: 'error',
      });
    }
  }

  async getBrandList(){
    try {
      const response = await BrandServiceApi.GetBrandList();
      var brands = response.map(br => ({
        label: br.name,
        value: br.name.toLowerCase().replace(/\s+/g, '-'),
        id: br._id
      }));
      this.setState({ brands: brands });
      return brands;
    } catch(err) {
      console.log('Brand fecting error', err);
      Swal({
        title: 'Error!',
        text: 'Brand fecting error.',
        icon: 'error',
      });
    }
  }
  
  onChangePrice(value){
    this.setState({
      price: value
    })
    this.props.onChangePrice(value);
  }

  onChangeQty(e){
    const value = e.target.value;
    this.setState({
      qty: value
    })

    this.props.onChangeQty(value);
  }

  onChangeBrand(selectedBrandOption){
    this.setState({ selectedBrand: selectedBrandOption })
    this.props.onChangeBrand(selectedBrandOption);
  }

  onChangeCategory(selectedCategory){
    this.setState({ selectedCategory: selectedCategory})
    this.props.onChangeCategory(selectedCategory);
  }

  onChangeProductName(e){
    const name = e.target.value;
    this.setState({ name: name });
    this.props.onChangeProductName(name);
  }

  onChangeDescription(e){
    const value = e.target.value;
    this.setState({ description: value });
    this.props.onChangeDescription(value);
  }
  
  onChangeRichDescription(e){
    const value = e.target.value;
    this.setState({ richDescription: value });
    this.props.onChangeRichDescription(value);
  }

  onChangeIsFeatured(e){
    const value = e.target.checked;
    this.setState({ isFeatured: value });
    this.props.onChangeIsFeatured(value);
  }

  onChangeProductImage(e){
    const file = e.target.files[0];
    this.setState({ image: file });
    this.props.onChangeProductImage(file);
  }

  render(){      
    return( 
      <>
        <div className="row">
          <div className="col-12">
            <div className="mb-3">
              <label for="productName" className="form-label">Product name</label>
              <input type="text" 
                className="form-control" 
                id="productName" 
                aria-describedby="nameHelp" 
                value={this.state.name} 
                onChange={(e) => this.onChangeProductName(e)}  
              />
            </div>
          </div>

          <div className="col-12">
            <div className="mb-3">
              <label for="description" className="form-label">Description</label>
              <input type="text" 
                className="form-control" 
                id="description" 
                aria-describedby="nameHelp" 
                value={this.state.description} 
                onChange={(e) => this.onChangeDescription(e)}  
              />
            </div>
          </div>

          <div className="col-12">
            <div className="mb-3">
              <label for="richDescription" className="form-label">Rich Description</label>
              <input type="text" 
                className="form-control" 
                id="richDescription" 
                aria-describedby="nameHelp" 
                value={this.state.richDescription} 
                onChange={(e) => this.onChangeRichDescription(e)}  />
            </div>
          </div>

          <div className="col-6">
            <div className="mb-3">
                <label for="brandName" className="form-label">Brand</label>
                <Select
                  className="js-example-basic-single"
                  classNamePrefix="select"
                  value={this.state.selectedBrand}
                  onChange={this.onChangeBrand}
                  options={this.state.brands}
                />
              </div>
          </div>

          <div className="col-6">
            <div className="mb-3">
                <label for="categoryName" className="form-label">Category</label>
                <Select
                  className="js-example-basic-single"
                  classNamePrefix="select"
                  value={this.state.selectedCategory}
                  options={this.state.categories}
                  onChange={this.onChangeCategory}
                />
              </div>
          </div>

          <div className="col-6">
            <div className="mb-3">
                <label for="price" className="form-label">Price</label>
                <div className="d-block">
                  <InputNumber 
                    addonAfter="$" 
                    className="w-100"
                    value={this.state.price}
                    step={0.00}
                    onChange={this.onChangePrice} 
                    size="large" />
                </div>
              </div>
          </div>

          <div className="col-6">
            <div className="mb-3">
              <label for="qty" className="form-label">Qty</label>
              <input type="number" 
                className="form-control"
                value={this.state.qty} 
                onChange={this.onChangeQty} />
            </div>
          </div>

          <div className="col-6">
            <div className="mb-3">
              <label for="image" className="form-label">Image</label>
              <input type="file" 
                className="form-control" 
                name="proImage" 
                defaultValue={this.state.image}
                onChange={this.onChangeProductImage}
              />
            </div>
          </div>

          <div className="col-6">
            <div className="mb-3">
              <label for="feature" className="form-label">Feature</label>
              <div className="form-check form-switch">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  role="switch" 
                  value={this.state.isFeatured}
                  id="flexSwitchCheckDefault" 
                  onChange={this.onChangeIsFeatured}
                  />
                <label className="form-check-label" for="flexSwitchCheckDefault">Default image is featured.</label>
              </div>            
              </div>
          </div>

        </div>
      </>
      
    )
  }
}