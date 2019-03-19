import React, { Component } from 'react';
import * as data from './data.json';
import { Menu } from 'semantic-ui-react';



class Home extends Component {

  /*
    Setting up localstorage with some defaults with data from data.json file
    Only runs if it hasn't run already to keep new values in localstorage
  */
  componentDidMount(){
    if(!localStorage.students) localStorage.setItem("students", JSON.stringify(data.students));
    if(!localStorage.classes) localStorage.setItem("classes", JSON.stringify(data.classes));

  }

  render() { //Treating Home.js as the NavBar as well 
    return (
      <Menu>
        <Menu.Item
          href="/students"
          style={{width: "50%", textAlign: "center"}}
        >
          Students
        </Menu.Item>

        <Menu.Item
          href="/courses"
          style={{width: "50%"}}
        >
          Classes
        </Menu.Item>

      </Menu>
    );
  }
}

export default Home;
