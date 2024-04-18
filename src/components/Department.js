import React from "react";
import { withRouter } from "react-router";

class Department extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCancelDailog: false
    };
  }

  handleCardClick = (e) =>{
    e.preventDefault();
      const {
        history: { push } , projectData
      } = this.props;
      push({
        pathname: `/courseView`,
        data: projectData
      });
  }

  handleCancel = (e) =>{
    e.stopPropagation();
    this.setState({openCancelDailog:true})

  }

  handleCancelClose = (e) =>{
    e.stopPropagation();
    this.setState({openCancelDailog:false})
  }

  render() {
    const {projectData} = this.props;
    return (

          <div onClick={this.handleCardClick} style={{minWidth:'450px',minHeight:150}} class="flex flex-col p-6 max-h-72  max-w-xs bg-white rounded-lg border border-gray-200 shadow-md mr-4 mb-4 cursor-pointer transition ease-in-out hover:bg-red-100 duration-300"  >
          <h5 style={{color:'#cf202e'}}class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" onClick={this.handleCardClick}>{projectData.deptName}</h5>
         
          </div>

    );
  }
}

export default withRouter(Department);
