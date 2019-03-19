import React, { Component } from 'react';
import './App.css';
import { Route } from "react-router-dom";

import Home from "./Pages/Home";
import Students from "./Pages/Student/Students";
import Courses from "./Pages/Courses/Courses";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={Home}/>
        <Route path="/courses" component={Courses}/>
        <Route path="/students" component={Students}/>
      </div>
    );
  }
}

export default App;
