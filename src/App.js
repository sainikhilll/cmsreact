import "./App.css";
import "./index.css";
import { BrowserRouter, Route } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

import UserHome from "./components/UserHome";
import CoursePage from "./components/CoursePage";
import ViewCourses from "./components/ViewCourses";
import Admin from "./components/Admin";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen" >
        <Route path="/" component={Signin} exact></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/userhome" component={UserHome}></Route>
        <Route path="/courseView" component={CoursePage}></Route>
        <Route path="/viewCourses" component={ViewCourses}></Route>
        <Route path="/admin" component={Admin}></Route>
        
       
      </div>
    </BrowserRouter>
  );
}

export default App;
