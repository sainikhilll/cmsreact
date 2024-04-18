import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import React from "react";
import Alert from "@mui/material/Alert";
import { withRouter } from "react-router";
import axios from "axios";

const url = "https://cms-backend-api-361fc037741a.herokuapp.com/collegeManagementSystem/userSignin";
class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      shouldAlertDisplay: false,
      shouldLoginErrorDisplay:false
    };
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleLogin = () => {
    const {  password ,email} = this.state;
    const {
      history: { push },
    } = this.props;
    if (email === "" || password === "") {
      this.setState({ shouldAlertDisplay: true });
      return;
    }
    this.setState({ shouldAlertDisplay: false });
    this.setState({ shouldLoginErrorDisplay: false });

    if(email === "admin" && password === "admin") {
      push({
        pathname: "/admin",
      });
      return;

    }
   
    const reqJson={
      email:email,password:password
    }
    axios.post(url,reqJson).then((res) => {
      if(res.data.isSuccess===true){
        localStorage.setItem('studentId',res.data.user.studentId);
        localStorage.setItem('email',res.data.user.email);
        localStorage.setItem('name',res.data.user.userName);
        push({
          pathname: "/userhome",
        });
       
      }
      else{

        this.setState({shouldLoginErrorDisplay: true})
      }
    });
  };

  render() {
    const { email, password, shouldAlertDisplay,shouldLoginErrorDisplay } = this.state;
    return (

      <div className=" flex flex-col" style={{backgroundColor:'aliceBlueBlue',minHeight:'100vh'}}>
        <div className="flex flex-col relative w-full justify-center items-center" >
        <img style={{height:900,width:2000}}alt="We’re here for you. <b>Day One.</b>" src="https://i-studentglobal.com/usa/mo/ucmo/html5/assets/images/item_29445.jpg"/>
        <div className='m-6 flex flex-wrap' style={{position:'absolute'}}>
       
       

        <div className="flex flex-col space-y-5 max-w-md mx-auto my-16 min-w-500"  style={{backgroundColor:'white',padding:'30px',borderRadius:10}}>
        <div style={{color:'#cf202e',display:'flex',justifyContent:'center'}} className="flex items-center justify-between">
          <h2   className="text-4xl font-semibold  uppercase">SIGN IN</h2>
          
        </div>
        <TextField
          value={email}
          required
          id="outlined-required"
          label="Email ID"
          onChange={(e) => this.handleEmailChange(e)}
        />
        <TextField
          id="outlined-password-input"
          required
          label="Password"
          type="password"
          value={password}
          onChange={(e) => this.handlePasswordChange(e)}
        />
        <div className="flex">
            <p className="text-lg">New User?</p>
            <Link
              to="/signup"
              style={{color:'#cf202e'}}  className=" font-semibold text-lg px-1"
            >
              Sign up
            </Link>
          </div>
          <button type="button" style={{background:'#cf202e'}} class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 " onClick={this.handleLogin}>Login</button>
        {shouldAlertDisplay && (
          <Alert severity="error">Field cannot be empty</Alert>
        )}
        {shouldLoginErrorDisplay && (
          <Alert severity="error">Invalid email or password</Alert>
        )}
      </div>



       </div>
      </div>
      </div>



      
    );
  }
}

export default withRouter(Signin);
