import React, { Component } from "react";
import Loadable from "react-loadable";

const LoadableMessage = Loadable({
  loader: () => import("./Message" /*webpackChunkName: "Message"*/),
  loading() {
    return <h1>Loading ...</h1>;
  }
});

class About extends Component {
  state = {
    page: "About"
  };

  render() {
    return (
      <div>
        <LoadableMessage page={this.state.page} />
      </div>
    );
  }
}

export default About;
