import React, { Component } from "react";
import ReactSummernote from "react-summernote";


export default class RichTextEditor extends Component {
  onChange = (content) => {
    console.log("onChange", content);
  };
  render() {
    return (
      <ReactSummernote
        options={{
          disableDragAndDrop: true,
          height: 200,
          toolbar: [
            ["style", ["style"]],
            ["font", ["bold", "underline", "clear"]],
            ["fontname", ["fontname"]],
            ["para", ["ul", "ol", "paragraph"]],
            ["table", ["table"]],
            ["insert", ["link", "picture", "video"]],
            ["view", ["fullscreen", "codeview"]]
          ]
        }}
        onChange={this.onChange}
      />
    );
  }
}
