import React, { Component } from "react";
import { Button, Form, Input, Modal, Grid } from 'semantic-ui-react'

class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.showAdd,
      id: this.props.studentsLength + 1,
      name: '',
      lastname: '',
      courses: [],
      registeredCourses: {}
    }
  }

  async componentDidMount(){
    var getCourses = await JSON.parse(localStorage.getItem("classes"));
    this.setState({courses: getCourses})
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

 aaa(e){
  const val = e.target.checked;
  const name = e.target.name;
  let updatedCourses = Object.assign({}, this.state.registeredCourses, {[name]: val})
  this.setState({
    "registeredCourses": updatedCourses
  })
 }

 async createStudent(e){
   var registeredCourses = [];

   for(var propertyName in this.state.registeredCourses) {
      if(this.state.registeredCourses[propertyName]) registeredCourses.push(propertyName);
    }

   var newStudent =
        {
           "id": this.state.id,
           "name": this.state.name,
           "last": this.state.lastname,
           "classes": registeredCourses
         }

    var getStudents = await JSON.parse(localStorage.getItem("students"));
    getStudents.push(newStudent);

    localStorage.setItem("students", JSON.stringify(getStudents));

   this.setState({show: false})
   this.props.onResultChange();
 }

  render() {
    const { courses } = this.state;

    return (
    <Modal open={this.props.showAdd} onClose={this.modalClose.bind(this)}>
      <Modal.Content image>
        <Form onSubmit={this.createStudent.bind(this)}>
          <Form.Field control={Input}  label='First Name' placeholder='First Name' name="name" onChange={this.handleChange.bind(this)}/>
          <Form.Field control={Input}  label='Last Name' placeholder='Last Name' name="lastname"  onChange={this.handleChange.bind(this)}/>
          <Grid doubling columns={5}>
            {courses.map((item, i) => {
              return(
              <Grid.Column>
                <Form.Field key={i} label={item.name} name={item.name} onChange={this.aaa.bind(this)} value={this.state.registeredCourses[item.name]} control='input' type='checkbox' />
              </Grid.Column>
              )
            })}
          </Grid>
            <Button type='submit'>Submit</Button>
        </Form>
      </Modal.Content>
    </Modal>
    );
  }
}

export default AddStudent;
