import React, { Component } from "react";
import "./Hello.css";

class Hello extends Component {
  state = {
    message: ""
  };
  handleButtonClick = () => {
    alert("You clicked the button!");
  };
  handleMessageChange = event => {
    this.setState({
      message: event.target.value
    });
  };
  render() {
    return (
      <div className="Hello">
        <h1>
          {" "}
          Hello from{" "}
          <a
            style={{ color: "white" }}
            href="https://reactjs.org/"
            target="_blank"
          >
            {this.props.name}
          </a>
        </h1>
        <h2>API_KEY: {process.env.API_KEY}</h2>
        <h2>API_SECRET: {process.env.API_SECRET}</h2>
        <button onClick={this.handleButtonClick}>Click Me!</button>
        <br />
        <br />
        <input
          onChange={this.handleMessageChange}
          type="text"
          value={this.state.message}
          placeholder="Type Message"
          style={{ marginRight: "1rem" }}
        />
        <span>{this.state.message}</span>
      </div>
    );
  }
}

export default Hello;
