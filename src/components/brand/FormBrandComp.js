import React, { Component } from "react";


export default class FormBrandComp extends Component{
  constructor(props) {
    console.log(props)
    super(props);
    this.state = {  
      name: this.props.name,
      image: this.props.image,
      imageUrl: this.props.image || "",
    };
  
    this.onBrandNameChange = this.onBrandNameChange.bind(this);
    this.onBrandImageChange = this.onBrandImageChange.bind(this);
  }

  onBrandNameChange(e) {
    const name = e.target.value;
    this.setState({ name });
    this.props.onBrandNameChange(name);
  };

  onBrandImageChange(e){
    const image = e.target.files[0];
    const imageUrl = URL.createObjectURL(image);
    this.setState({ image, imageUrl });
    this.props.onBrandImageChange(image, this.props.image);
  } 

 render(){
  return(
    <>  
      <div className="row">
        <div className="col-12">
          <div className="mb-3">
            <label for="name" className="form-label">Brand name</label>
            <input type="text" 
              className="form-control" 
              value={this.props.name}
              onChange={this.onBrandNameChange}
            />
          </div>
        </div>

        <div className="col-12">
          <div className="mb-3">
            <label for="image" className="form-label">Image</label>
            <input 
              type="file" 
              className="form-control" 
              defaultValue={this.props.image}
              onChange={this.onBrandImageChange}  
            />
          </div>
        </div>

        <div className="col-12">
          <div className="mb-3">
            <img src={this.props.image} className="meduim-thumnail-image" alt="Preview" />
          </div>
        </div>
      </div>      
    </>
  )
 } 
}

