import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import React from "react";
import Alert from "@mui/material/Alert";
import { withRouter } from "react-router";
import axios from "axios";

const eventBaseUrl = "https://cmsrestapi-df498d82e4db.herokuapp.com/collegeManagementSystem/userSignup";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName:"",
      lastName:"",
      username: "",
      email: "",
      studentId:"",
      phoneNumber:"",
      password: "",
      address:"",
      shouldAlertDisplay: false,
      shouldErrorMessageDisplay: false,
      signupErrorMessage:"",
      isEmailError:false,
      isNumberError:false,
    };
  }

  handleFirstNameChange = (e) => {
    this.setState({ firstName: e.target.value });
  };
  handleLastNameChange = (e) => {
    this.setState({ lastName: e.target.value });
  };
  handleStudentIdChange = (e) => {
    this.setState({ studentId: e.target.value });
  };
  
  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePhoneNumberChange = (e) => {
    this.setState({ phoneNumber: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleRoleChange = (e) => {
    this.setState({ role: e.target.value });
  };

  handleSubmit = () => {
    const { firstName,lastName,address,username, email, password,role,phoneNumber,studentId } = this.state;
    const {
      history: { push },
    } = this.props;
    if (
      username === "" ||studentId===""||
      email === "" ||
      password === "" || phoneNumber==="" 
    ) {
      this.setState({ shouldAlertDisplay: true });
      return;
    }
    const isEmailError = this.checkEmailError(email);
    const isPhoneError = this.checkPhoneError(phoneNumber);
    if(!isEmailError){
      this.setState({isEmailError: true});
    }else{
      this.setState({isEmailError: false});
    }
    if(!isPhoneError){
      this.setState({isNumberError: true});
    }else{
      this.setState({isNumberError: false});
    }

    if(!isEmailError){
      return;
    }
    
  
    const reqJson={
      userName:username,
     email:email,
     phoneNumber:phoneNumber,
     password:password,
     studentId:studentId
    }
   
    axios.post(eventBaseUrl,reqJson).then((res) => {
      if(res.data.isSuccess){
        alert("Signed up successfully")
        push('/');
      }else{
        this.setState({
          signupErrorMessage:res.data.error,
          shouldErrorMessageDisplay:true
         }) 
      }
    });
  };

  checkEmailError =(email) =>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());

   
  }

  checkPhoneError =(number) =>{
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(String(number).toLowerCase());
  }

 


  render() {
    const { username,phoneNumber, email, password, shouldAlertDisplay,shouldErrorMessageDisplay,signupErrorMessage, 
      isEmailError,isNumberError,role,firstName,lastName,gender,address,studentId} =
      this.state;
      
    return (
     
      <div className=" flex flex-col" style={{backgroundColor:'aliceBlueBlue',minHeight:'100vh'}}>
        <div className="flex flex-col relative w-full justify-center items-center" >
        <img style={{height:900,width:2000}}alt="We’re here for you. <b>Day One.</b>" src="https://i-studentglobal.com/usa/mo/ucmo/html5/assets/images/item_29445.jpg"/>
        <div className='m-6 flex flex-wrap' style={{position:'absolute'}}>
       
       

        <div className="flex flex-col space-y-5 max-w-md mx-auto my-16 min-w-500"  style={{backgroundColor:'white',padding:'30px',borderRadius:10}}>
        <div style={{color:'#cf202e',display:'flex',justifyContent:'center'}} className="flex items-center justify-between">
          <h2   className="text-4xl font-semibold  uppercase">SIGN UP</h2>
          
        </div>
        <TextField
          required
          id="outlined-username"
          value={username}
          label="Student Name"
          autoComplete="off"
          onChange={(e) => this.handleUsernameChange(e)}
        />

        
         <TextField
          value={password}
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          onChange={(e) => this.handlePasswordChange(e)}
        />
       {/* <i> Passwords must contain at least eight characters, including at least 1 letter and 1 number.</i> */}
       <TextField
          error={isEmailError}
          required
          id="outlined-email"
          value={email}
          label="Email"
          onChange={(e) => this.handleEmailChange(e)}
          helperText={isEmailError ?"Invalid Email":''}
        />
        <TextField
          required
          id="outlined-username"
          value={studentId}
          label="Student ID"
          autoComplete="off"
          onChange={(e) => this.handleStudentIdChange(e)}
        />
        <TextField
          error={isNumberError}
          required
          id="outlined-phone"
          value={phoneNumber}
          label="Phone Number"
          onChange={(e) => this.handlePhoneNumberChange(e)}
          helperText={isNumberError?"Invalid Phone Number":''}
        />
         

        
        <div className="flex items-center justify-between">
        <button type="button" style={{background:'#cf202e'}}class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 " onClick={this.handleSubmit}>Submit</button>
 
          <div className="flex">
            <p className="text-lg">Existing User?</p>
            <Link to="/" style={{color:'#cf202e'}} className="font-semibold text-lg px-1">
              Sign in
            </Link>
          </div>
        </div>
        {shouldAlertDisplay &&
          <Alert severity="error">Field cannot be empty</Alert>
        }
         {shouldErrorMessageDisplay &&
          <Alert severity="error"> {signupErrorMessage} </Alert>
        }
        
        </div>



</div>
</div>
</div>




);
}
}

export default withRouter(Signup);
