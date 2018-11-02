import React, { Component } from "react";
import Loadable from "react-loadable";

const LoadableMessage = Loadable({
  loader: () => import("./Message" /*webpackChunkName: "Message"*/),
  loading() {
    return <h1>Loading ...</h1>;
  }
});

class Contact extends Component {
  state = {
    page: "Contact"
  };

  render() {
    return (
      <div>
        <LoadableMessage page={this.state.page} />
      </div>
    );
  }
}

export default Contact;
