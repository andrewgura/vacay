import React, { Component } from "react";
import { Button, Form, Input, Modal } from 'semantic-ui-react'

class UpdateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.showAdd,
      name: ''
    }
  }

  async componentDidMount(){
    var getCourses = await JSON.parse(localStorage.getItem("classes"));

    var currentCourse = getCourses.find(element => {
      return element.id === this.props.courseID;
    });

    this.setState({name: currentCourse.name})
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

 async update(e){
   var newCourse =
        {
           "id": this.props.courseID,
           "name": this.state.name
         }

    var getCourses = await JSON.parse(localStorage.getItem("classes"));

    var removeCourse = getCourses.find(element => {
      if(element.id === this.props.courseID) return element.id;
      return null;
    });

    getCourses = getCourses.filter(student => student.id !== removeCourse.id); //Have to remove course first before adding a new one since you cant update localstorage directly

    getCourses.push(newCourse);

    getCourses.sort((a, b) => b.id < a.id); //Sort courses based off of ID

    localStorage.setItem("classes", JSON.stringify(getCourses));

   this.setState({show: false})
   this.props.onResultChange();
 }

  render() {
    return (
    <Modal open={this.props.showUpdate} onClose={this.modalClose.bind(this)}>
      <Modal.Content image>
        <Form onSubmit={this.update.bind(this)}>
          <Form.Field control={Input} label='Class Name' value={this.state.name} name="name" onChange={this.handleChange.bind(this)}/>
          <Button type='submit'>Submit</Button>
        </Form>
      </Modal.Content>
    </Modal>
    );
  }
}

export default UpdateCourse;
