import React, { Component } from "react";
import { Button, Form, Input, Modal } from 'semantic-ui-react'

class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.showAdd,
      id: this.props.coursesLength + 1,
      name: ''
    }
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

 async createStudent(e){
   var newCourse =
        {
           "id": this.state.id,
           "name": this.state.name
         }

    var getCourses = await JSON.parse(localStorage.getItem("classes"));
    getCourses.push(newCourse);

    localStorage.setItem("classes", JSON.stringify(getCourses));

   this.setState({show: false})
   this.props.onResultChange();
 }

  render() {
    return (
    <Modal open={this.props.showAdd} onClose={this.modalClose.bind(this)}>
      <Modal.Content image>
        <Form onSubmit={this.createStudent.bind(this)}>
          <Form.Field control={Input} label='Class Name' placeholder='Class Name' name="name" onChange={this.handleChange.bind(this)}/>
          <Button type='submit'>Submit</Button>
        </Form>
      </Modal.Content>
    </Modal>
    );
  }
}

export default AddCourse;
