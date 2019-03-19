import React, { Component } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import AddStudent from './Components/AddStudent';
import UpdateStudent from './Components/UpdateStudent';

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      addStudent: false,
      updateStudent: false,
      studentID: 0
    }
}

  async componentDidMount(){
    var getStudents = await JSON.parse(localStorage.getItem("students"));//loading all the students from localstorage
    this.setState({students: getStudents})
  }

  async delete(student) {
    var getStudents = await JSON.parse(localStorage.getItem("students"));//have to call localstorage again instead of this.state.students

    var removeStudent = getStudents.find(element => {//searching array to find student index to delete
      if(element.id === student.id) return element.id;
      return null;//do nothing if element is not found
    });

    getStudents = getStudents.filter(student => student.id !== removeStudent.id);//remove the student from array by the found index

    localStorage.setItem("students", JSON.stringify(getStudents));//set localstorage equal to new value of getStudents

    this.componentDidMount(); //run componentDidMount to update view of changes

  }

  closeModal() { //whenever update or add gets closed
    this.setState({addStudent: false, updateStudent: false});
    this.componentDidMount();
  }

  render() {
    const { students } = this.state;
    return (
      <div>
        <Button color='green' onClick={()=> this.setState({addStudent: true})}>Add New Student</Button>
        <Card.Group>
        {students.map(item => {
          return(
            <Card key={item.id}>
              <Card.Content>
                <Image floated='right' size='mini' src='https://cdn1.iconfinder.com/data/icons/mix-color-4/502/Untitled-1-512.png' height="100px" width="100px"/>
                <Card.Header>{item.name} {item.last}</Card.Header>
                <Card.Meta>Classes:</Card.Meta>
                <Card.Description>
                  {item.classes.map((classes,i) => {
                    return(
                      <p key={i}>{classes}</p>
                    )
                  })}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button basic color='green' onClick={()=> this.setState({updateStudent: true, studentID: item.id})}>
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
       {this.state.addStudent && <AddStudent studentsLength={students.length} showAdd={this.state.addStudent} onResultChange={this.closeModal.bind(this)}/>}
       {this.state.updateStudent && <UpdateStudent studentID={this.state.studentID} showUpdate={this.state.updateStudent} onResultChange={this.closeModal.bind(this)}/>}
      </div>
    );
  }
}

export default Students;
