import React from "react";
import { withRouter } from "react-router";
import axios from "axios";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

class CourseAccordian extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCancelDailog: false,
    };
  }


  handleCancel = (e) =>{
    e.stopPropagation();
    this.setState({openCancelDailog:true})

  }

  handleCancelClose = (e) =>{
    e.stopPropagation();
    this.setState({openCancelDailog:false})
  }

  handleUnenrollCourse = () =>{
    const{data}=this.props;
    const userId=localStorage.getItem("studentId")
    let reqUrl = `https://cms-backend-api-361fc037741a.herokuapp.com/collegeManagementSystem/unenrollCourse/${data.courseId}/${userId}`;
    axios.delete(reqUrl).then((res) => {
      this.props.refreshData();
      
    const {
      history: { push },
    } = this.props;
    push("/userhome");
    })
  }
  handleLogout = () => {
    localStorage.removeItem("studentId");
   
    const {
      history: { push },
    } = this.props;
    push("/");
  };
  


  render() {
    
    const{data}=this.props;
    
   
    return (
            <Accordion style={{width:'100%'}} >
        <AccordionSummary style={{alignItems:'center',width:'650px'}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
           <Typography style={{fontSize:'17px',fontWeight:'600'}} sx={{ width: '100%', flexShrink: 0 }}>
          Course Id: {data.courseId}
          </Typography>
          {/* <Typography sx={{ color: 'text.secondary' }}>{data.Status}</Typography> */}

        </AccordionSummary>

        <AccordionDetails>
      
          <Typography style={{fontSize:'17px',marginBottom:'12px'}} >
          Course Name : {data.courseName}
          </Typography>
          <Typography style={{fontSize:'17px',marginBottom:'12px'}} >
          Department : {data.deptName}
          </Typography>
          <Typography style={{fontSize:'17px',marginBottom:'12px'}} >
          HOD : {data.hod}
          </Typography>
          <Typography style={{fontSize:'17px',marginBottom:'12px'}} >
          Faculty : {data.insName}
          </Typography>
          <button style={{width:150}}type="button" class="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 " onClick={this.handleUnenrollCourse}>Unenroll Course</button>
        </AccordionDetails>
      </Accordion>
      
         

    );
  }
}

export default withRouter(CourseAccordian);
