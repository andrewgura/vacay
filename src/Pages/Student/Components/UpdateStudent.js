import React, { Component } from "react";
import { Button, Form, Input, Modal } from 'semantic-ui-react'

class UpdateStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.showAdd,
      name: '',
      lastname: '',
      courses: [],
      registeredCourses: []
    }
  }

  async componentDidMount(){
    var getStudents = await JSON.parse(localStorage.getItem("students"));
    var getCourses = await JSON.parse(localStorage.getItem("classes"));

    var currentStudent = getStudents.find(element => { //find the student to edit based off of props passed down from parent Student.js
      return element.id === this.props.studentID;
    });

    var registeredCourses = [];

    for(var i = 0; i < currentStudent.classes.length; i++) {
        var x = currentStudent.classes[i];
      registeredCourses.push({ [x]: true }) //Creating objects set to true based off of all the students classes he is in
    }

    var result = {};
    registeredCourses.map(item => { //loop creating single object to set to state to have default checkbox checked
      var name = Object.keys(item)[0];
      return result[name] = true;
    })

    this.setState({name: currentStudent.name, lastname: currentStudent.last, registeredCourses: result, courses: getCourses})
  }

  modalClose() {
   this.setState({ show: false });
   this.props.onResultChange();
 }

 handleChange(event){
   const target = event.target;
   const value = target.value;
   const name = target.name;
   this.setState({[name]: value});
 }

 handleCourse(e){ //Change handler for checkboxes since they are updated differently
  const val = e.target.checked;
  const name = e.target.name;
  let updatedCourses = Object.assign({}, this.state.registeredCourses, {[name]: val})
  this.setState({
    "registeredCourses": updatedCourses
  })
 }

 async update(e){
   var registeredCourses = [];

   for(var propertyName in this.state.registeredCourses) {
      if(this.state.registeredCourses[propertyName]) registeredCourses.push(propertyName); //Creating array of objects of the courses student is enrolled in
    }

   var newStudent =
        {
           "id": this.props.studentID,
           "name": this.state.name,
           "last": this.state.lastname,
           "classes": registeredCourses
         }

    var getStudents = await JSON.parse(localStorage.getItem("students"));

    var removeStudent = getStudents.find(element => {
      if(element.id === this.props.studentID) return element.id;
      return null;
    });

    getStudents = getStudents.filter(student => student.id !== removeStudent.id); //Have to remove student first before adding a new one since you cant update localstorage directly

    getStudents.push(newStudent);

    getStudents.sort((a, b) => b.id < a.id); //sort students by ID

    localStorage.setItem("students", JSON.stringify(getStudents));

   this.setState({show: false})
   this.props.onResultChange();
 }

  render() {
    const { courses } = this.state;

    return (
    <Modal open={this.props.showUpdate} onClose={this.modalClose.bind(this)}>
      <Modal.Content image>
        <Form onSubmit={this.update.bind(this)}>
          <Form.Field control={Input} label='First Name' value={this.state.name} name="name" onChange={this.handleChange.bind(this)}/>
          <Form.Field control={Input} label='Last Name' value={this.state.lastname} name="lastname"  onChange={this.handleChange.bind(this)}/>
           <div>
          {courses.map((item, i) => {
            return(
              <Form.Field key={i} label={item.name} name={item.name} checked={this.state.registeredCourses[item.name] ? true : null }
                onChange={this.handleCourse.bind(this)} value={this.state.registeredCourses[item.name]} control='input' type='checkbox' />
            )
          })}
        </div>
          <Button type='submit'>Submit</Button>
        </Form>
      </Modal.Content>
    </Modal>
    );
  }
}

export default UpdateStudent;
