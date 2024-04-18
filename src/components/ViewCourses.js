import React from "react";
import { withRouter } from "react-router";
import axios from "axios";
import CourseAccordian from "./CourseAccordian";

class ViewCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId:  localStorage.getItem("userId"),
      userRole: localStorage.getItem("userRole"),
      selectedLocation:'',
     courseList:[]
    };
  }

  componentWillMount() {
    let reqUrl = `https://cms-backend-api-361fc037741a.herokuapp.com/collegeManagementSystem/getDataByStudentId/${localStorage.getItem("studentId")}`;
    axios.get(reqUrl).then((res) => {
      this.setState({
        courseList:res.data.data
      })
})
  }

  refreshData=()=>{
    let reqUrl = `https://cms-backend-api-361fc037741a.herokuapp.com/collegeManagementSystem/getDataByStudentId/${localStorage.getItem("studentId")}`;
    axios.get(reqUrl).then((res) => {
      this.setState({
        courseList:res.data.data
      })
})
  }

  
  handleLogout = () => {
    localStorage.removeItem("studentId");
   
    const {
      history: { push },
    } = this.props;
    push("/");
  };

  handleviewCourses = () =>{
    const {
      history: { push },
    } = this.props;
    push('/viewCourses');

  }

  handleHome = () =>{
    const {
      history: { push },
    } = this.props;
    push('/userhome');

  }

  handleLocationList=(data)=>{
    this.setState({
      selectedLocation:data
    })
  }

 

  render() {
    const {courseList} = this.state;
    return (

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
    <div style={{marginTop:50,marginLeft:50}} >


    <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:50}}>
        {courseList.map((data) => {
          return(
              <CourseAccordian  refreshData={this.refreshData} data={data} />
              );
        })}
       
        </div>
    </div>
    </div></div>
    </div>)
  }
}

export default withRouter(ViewCourses);
