import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import AddCourse from './Components/AddCourse';
import UpdateCourse from "./Components/UpdateCourse"

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      addCourse: false,
      updateCourse: false
    }
}

  async componentDidMount(){
    var getCourses = await JSON.parse(localStorage.getItem("classes")); //loading all the courses from localstorage
    this.setState({courses: getCourses})
  }

  async delete(course) {
    var getCourses = await JSON.parse(localStorage.getItem("classes"));//have to call localstorage again instead of this.state.courses

    var removeCourse = getCourses.find(element => { //searching array to find course index to delete
      if(element.id === course.id) return element.id;
      return null; //do nothing if element is not found
    });

    getCourses = getCourses.filter(course => course.id !== removeCourse.id); //remove the course from array by the found index

    localStorage.setItem("classes", JSON.stringify(getCourses)); //set localstorage equal to new value of getCourses

    this.componentDidMount(); //run componentDidMount to update view of changes

  }

  closeModal() { //whenever update or add gets closed
    this.setState({addCourse: false, updateCourse: false});
    this.componentDidMount();
  }

  render() {
    const { courses } = this.state;
    return (
      <div>
        <Button color='green' onClick={()=> this.setState({addCourse: true})}>Add New Class</Button>
        <Card.Group>
        {courses.map(item => {
          return(
            <Card key={item.id}>
              <Card.Content>
                <Card.Header>{item.name}</Card.Header>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button basic color='green' onClick={()=> this.setState({updateCourse: true, courseID: item.id})}>
                    Update
                  </Button>
                  <Button basic color='red' onClick={this.delete.bind(this, item)}>
                    Delete
                  </Button>
                </div>
              </Card.Content>
            </Card>
          )
        })}
      </Card.Group>
       {this.state.addCourse && <AddCourse coursesLength={courses.length} showAdd={this.state.addCourse} onResultChange={this.closeModal.bind(this)}/>}
       {this.state.updateCourse && <UpdateCourse courseID={this.state.courseID} showUpdate={this.state.updateCourse} onResultChange={this.closeModal.bind(this)}/>}
      </div>
    );
  }
}

export default Courses;
