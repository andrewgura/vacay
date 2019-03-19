import React from "react";
import ReactDOM from "react-dom";
import Students from "./Students";
import { BrowserRouter } from "react-router-dom";

it('renders without crashing', () => {
  const wrapper = shallow(
    <Students/>
  );

  expect(wrapper).toMatchSnapshot();
})

it('renders correctly again', () => {
  const wrapper = render(
    <Students/>
  );

  expect(wrapper).toMatchSnapshot();
})
