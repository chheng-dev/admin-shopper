import React from "react";
import { Drawer } from "antd";
import FormCategoryComp from "./FormCategoryComp";

export default class DrawerCreateCategoryComp extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.onClose = this.props.onClose.bind(this);
  }
  onClose() {
    if(this.props.onClose){
      this.props.onClose();
    }
  };

  render(){
    return(
      <Drawer
        title={this.props.title}
        placement="right"
        closable={true}
        onClose={this.onClose}
        visible={this.props.visible}
        width={400}
      >
        <FormCategoryComp />
      </Drawer>

    )
  }
}