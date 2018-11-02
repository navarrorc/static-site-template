import React, { Component } from "react";
import styled from "react-emotion";
import colors from "./colors";

const Container = styled("div")`
  color: ${colors.light};
  display: inline-block;
  padding: 0.25rem;
  font-size: 2rem;
  border: 5px solid ${colors.primary};

  span {
    background-color: ${colors.dark};
  }
`;

class Timer extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { seconds: 0 };
  // } /* no need as we are using the transform-class-properties bable puglin, see the package.json file

  state = {
    seconds: 0
  };

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Container style={{ margin: "1rem" }}>
        <span>Seconds: {this.state.seconds}</span>
      </Container>
    );
  }
}

export default Timer;
