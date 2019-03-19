import React from "react";
import ReactDOM from "react-dom";
import Courses from "./Courses";
import { BrowserRouter } from "react-router-dom";

it('renders without crashing', () => {
  const wrapper = shallow(
    <Courses/>
  );

  expect(wrapper).toMatchSnapshot();
})

it('renders correctly again', () => {
  const wrapper = render(
    <Courses/>
  );

  expect(wrapper).toMatchSnapshot();
})
