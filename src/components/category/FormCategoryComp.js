
import React from "react";

export default class FormCategoryComp extends React.Component {
  render() {
    const { name, color, onChangeName, onChangeColor } = this.props;

    return (
      <div>
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">Category Name</label>
          <input type="text" className="form-control" id="categoryName" aria-describedby="nameHelp" value={name} onChange={(e) => onChangeName(e.target.value)} />
        </div>
        <div className="mb-3 pb-5">
          <label htmlFor="color" className="form-label">Color</label>
          <input type="color" className="form-control w-25" id="color" value={color} onChange={(e) => onChangeColor(e.target.value)} />
        </div>
      </div>
    );
  }
}
