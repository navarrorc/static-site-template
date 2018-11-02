import React from "react";
import { create } from "react-test-renderer";
import Timer from "../components/Timer";

test("snapshot", () => {
  const c = create(<Timer />);
  expect(c.toJSON()).toMatchSnapshot();
});
