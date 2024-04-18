import React from "react";
import { withRouter } from "react-router";
import axios from "axios";
import { DataGrid,GridValueGetterParams } from '@mui/x-data-grid';
import { CircularProgress } from "@mui/material";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName:  localStorage.getItem("userName"),
      dataList:[],
      apiLoading:true,
      rowId:1
    };
  }


  componentWillMount() {
    
    axios.get(`https://cmsrestapi-df498d82e4db.herokuapp.com/collegeManagementSystem/loadStudentDetails`).then((res) => {
      this.setState({
        dataList:res.data.data,
        apiLoading:false
      })
     });
  }


  handleLogout = () => {
    localStorage.removeItem("studentId");
    localStorage.removeItem("userRole");
    const {
      history: { push },
    } = this.props;
    push("/");
  };


  handleDashboard = () =>{
    const {userId} = this.state;
    const {
      history: { push },
    } = this.props;
    push('/adminDashboard');

  }

  handleHome=()=>{
    const {userId} = this.state;
    const {
      history: { push },
    } = this.props;
    push('/admin');
  }

  

  handleNewRow=()=>{
    
    return Math.random ();
  }

 


  render() {
    const {userId,userRole,projectDatas,dataList,apiLoading} = this.state;
    
const columns= [
  { field: 'studentId',type: 'string',alignItems:'center', width: 200,  renderHeader: () => (
    <strong>
     <span>Student Id</span>
    </strong>
  ),
},
  { field: 'studentName', type: 'string', width: 200,
  renderHeader: () => (
    <strong>
     <span>Student Name</span>
    </strong>
  )
},
{ field: 'studentEmail', type: 'string',width: 200, renderHeader: () => (
  <strong>
   <span>Student Email</span>
  </strong>
) },
{ field: 'courseName', type: 'string',width: 300, renderHeader: () => (
  <strong>
   <span>Enrolled Course Name</span>
  </strong>
) },


{ field: 'deptName', type: 'string',width: 300, renderHeader: () => (
  <strong>
   <span>Department </span>
  </strong>
) },
{ field: 'hod', type: 'string',width: 250, renderHeader: () => (
  <strong>
   <span>Head Of Department</span>
  </strong>
) },
{ field: 'insName', type: 'string',width: 250, renderHeader: () => (
  <strong>
   <span>Instructor</span>
  </strong>
) },
 
  
];
    
    return (

      <div className=" flex flex-col" style={{backgroundColor:'aliceBlueBlue',minHeight:'100vh'}}>
        <div style={{backgroundColor:'#cf202e',display:'flex',padding:'12px',color:'white'}}>
        <div style={{display:'flex',flexGrow:'1'}}>
        <img style={{width:'15%',background:'white'}}src="https://marvel-b1-cdn.bc0a.com/f00000000155119/www.ucmo.edu/_resources/img/logo-300-px-c.png"></img>
      </div>
      <div style={{display:'flex',alignItems:'center'}}>
      <div style={{display:'flex',alignItems:'center',marginRight:50,fontSize:18}}className='underline cursor-pointer' onClick={this.handleHome}>Dashboard</div>
        <button style={{ background: 'white',color: '#cf202e',height: 35,width: 80,alignItems: 'center',borderRadius: 8,
         marginRight: 20}} onClick={this.handleLogout}>Logout</button>
      </div>
    </div>
      

          {apiLoading?<div style={{display:'flex',marginTop:200,justifyContent:'center'}}>
      <CircularProgress />
      </div>:
       <div style={{display:'contents'}}>
      <DataGrid style={{backgroundColor:'white'}}
        rows={this.state.dataList}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
        autoPageSize={true}
        getRowId={this.handleNewRow}
      />
      </div>}
        </div>
          );
  }
}

export default withRouter(Admin);
