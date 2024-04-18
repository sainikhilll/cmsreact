import React from "react";
import { withRouter } from "react-router";
import axios from "axios";
import Department from "./Department";


class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId:  localStorage.getItem("userId"),
      userRole: localStorage.getItem("userRole"),
      departmentList:[]
      
    };
  }

  componentWillMount(){
    
    axios.get(`https://cmsrestapi-df498d82e4db.herokuapp.com/collegeManagementSystem/loadAllCourses`).then((res) => {
      this.setState({
        departmentList:res.data.data,
      })
     });
  }
 

  handleLogout = () => {
    localStorage.removeItem("studentId");
    const {
      history: { push },
    } = this.props;
    push("/");
  };


  handleBookingAppointment = () =>{
    const {userId} = this.state;
    const {
      history: { push },
    } = this.props;
    push('/bookingAppointment');

  }

  handleviewCourses = () =>{
    const {userId} = this.state;
    const {
      history: { push },
    } = this.props;
    push('/viewCourses');

  }

  handleHome = () =>{
    const {userId} = this.state;
    const {
      history: { push },
    } = this.props;
    push('/userhome');

  }

 

  updateInProjectArray = (projectData) => {
    this.setState({projectDatas: this.state.projectDatas.filter(function(data) { 
      return data.projectId !== projectData.projectId
  })});
  }

  updateProjectArrayStatus = (index,status) => {
    this.setState(({projectDatas}) => ({
      projectDatas: [
          ...projectDatas.slice(0,index),
          {
              ...projectDatas[index],
              state: status,
          },
          ...projectDatas.slice(index+1)
      ]
  }));

  }

  render() {
    const {userId,userRole,projectDatas,departmentList} = this.state;
    return (

<div className=" flex flex-col" style={{backgroundColor:'aliceBlueBlue',minHeight:'100vh'}}>
  <div className=" flex flex-col" style={{backgroundColor:'aliceBlueBlue',minHeight:'100vh'}}>
    <div style={{backgroundColor:'#cf202e',display:'flex',padding:'12px',color:'white'}}>
        <div style={{display:'flex',flexGrow:'1'}}>
        <img style={{width:'15%',background:'white'}}src="https://marvel-b1-cdn.bc0a.com/f00000000155119/www.ucmo.edu/_resources/img/logo-300-px-c.png"></img>
      </div>
      <div style={{display:'flex',alignItems:'center'}}>
      <div style={{display:'flex',alignItems:'center',marginRight:50,fontSize:18}}className='underline cursor-pointer' onClick={this.handleHome}>Home</div>
        <div style={{display:'flex',alignItems:'center',marginRight:50,fontSize:18}}className='underline cursor-pointer' onClick={this.handleviewCourses}>Enrolled Courses</div>
        <button style={{ background: 'white',color: '#cf202e',height: 35,width: 80,alignItems: 'center',borderRadius: 8,
         marginRight: 20}} onClick={this.handleLogout}>Logout</button>
      </div>
    </div>
    <div className="flex flex-col relative w-full" >
        <img style={{width:2000,height:800}}alt="We’re here for you. <b>Day One.</b>" src="https://i-studentglobal.com/usa/mo/ucmo/html5/assets/images/item_29445.jpg"/>
        <div className='m-6 flex flex-wrap' style={{position:'absolute'}}>
       
       {departmentList.map((projectData,index) => {
         return(
             <Department projectData={projectData}  key={index} index={index} updateInProjectArray={this.updateInProjectArray} updateProjectArrayStatus={this.updateProjectArrayStatus}/>
             );
       })}
       </div>
      </div>
    </div>
 
  
  
     
      


  </div>
    );

  }
}

export default withRouter(UserHome);
