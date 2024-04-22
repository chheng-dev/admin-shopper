import React, { Component } from "react";

export default class GetBrandListComp extends Component{
  constructor(props) {
    super(props);
    this.state = {  
      brandName: "",
      image: ''
    };
  }

  render(){
    return(
      <>
        <h5>Brand List</h5>
      </>
    )
  }
}