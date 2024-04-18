import React from "react";
import { withRouter } from "react-router";
import axios from "axios";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

class CourseBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCancelDailog: false,
      isOpen:false,
      timeSlotList:[],
      reason:'',
      bookingDate:'2022-11-01',
      selectedTimeSlot:'',
      shouldAlertDisplay:false
    };
  }


  handleCancel = (e) =>{
    e.stopPropagation();
    this.setState({isOpen:false})

  }

  

  handleEnroll=()=>{
    this.setState({
      isOpen:true
    })
  }

  handleSubmit=()=>{
    
    const{projectData,departmentId,departmentName,hod} = this.props;
    const{bookingDate,reason,selectedTimeSlot}=this.state
    const {
      history: { push },
    } = this.props;
   
    const json={
      studentId:localStorage.getItem('studentId'),
      studentName:localStorage.getItem('name'),
      studentEmail:localStorage.getItem('email'),
      courseId:projectData.courseId,
      courseName:projectData.courseName,
      deptId:departmentId,
      deptName:departmentName,
      hod:hod,
      insId:projectData.insId,
      insName:projectData.insName
      }
      
        
      axios.post("https://cms-backend-api-361fc037741a.herokuapp.com/collegeManagementSystem/enrollCourse",json).then((res) => {
        if(res.data.isSuccess===true){
          alert('Enrollment request for this course is submitted successfully');
          push('/userhome');
        }
        else{
          alert('Already you enrolled this course');
        }
        
      })
      this.setState({
        isOpen:false
      })

  }

  


  render() {
    const {userId,userRole,projectData,index,departmentId,departmentName,hod} = this.props;
    const {openCancelDailog,isOpen,timeSlotList,shouldAlertDisplay,reason} = this.state;
    return (

          <div style={{minWidth:'450px',minHeight:150}} class="flex flex-col p-6 max-h-72  max-w-xs bg-white rounded-lg border border-gray-200 shadow-md mr-4 mb-4  transition ease-in-out duration-300"  >
          <h5 style={{color:'black',fontSize:18}}class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" >Course ID: {projectData.courseId}</h5>
          <h5 style={{color:'black',fontSize:18}}class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" >Course Name: {projectData.courseName}</h5>
          <p id='card_desc' class="flex-1 mb-3 font-normal text-gray-700 dark:text-gray-400" >Instructor Name: {projectData.insName}</p>
          <button style={{width:120}}type="button" class="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 " onClick={this.handleEnroll}>Enroll Now</button>
         

          <Dialog open={isOpen} onClose={this.handleClose}  maxWidth="md">
                <DialogTitle>{`Confirmation`}</DialogTitle>
                <DialogContent >
                   Are you sure to enroll this course?
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleCancel}>No</Button>
                  <Button onClick={this.handleSubmit}>Yes</Button>
                </DialogActions>
              </Dialog>
          </div>

    );
  }
}

export default withRouter(CourseBox);
