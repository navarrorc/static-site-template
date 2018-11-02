import React, { Component } from "react";

class Message extends Component {
  render() {
    return <div>Welcome to the {this.props.page} page!</div>;
  }
}

export default Message;
