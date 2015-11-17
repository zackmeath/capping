/**
 * @jsx React.DOM
 */
//Load in the api to build the data object 
var data = new Object();
data.coursesData = "scope error";

$(document).ready(function() {
    jQuery.ajax( {
    url: "http://capping.xyz:3000/api/courses",
    type: "GET",
    crossDomain: true, 
    contentType: "text/plain; charset=utf-8",
    dataType: "json",
    async:false,
    success: function( response ) {
        console.log(response);
        data.coursesData = response;
        
    },
    xhrFields: {
    // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
    // This can be used to set the 'withCredentials' property.
    // Set the value to 'true' if you'd like to pass cookies to the server.
    // If this is enabled, your server must respond with the header
    // 'Access-Control-Allow-Credentials: true'.
        withCredentials: false
    }
});
   
});



var Courses = React.createClass({

  // get game info
  loadCourses: function() {    
    this.setState({data: data});
  },

  getInitialState: function(){
      console.log(data.coursesData);
    return {data: {coursesData} };
  },

  componentDidMount: function() {
    this.loadCourses();
  },

  render: function() {
    return (
        <table className="table table-hover table-bordered table-responsive">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Course Number</th>
                <th>Course Name</th>
                <th> <button type="button" className="btn btn-success" data-toggle="modal" data-target="#coursesModal" style={buttonStyle} >Add Courses</button> </th>
              </tr>
            </thead>
                <CourseList data={this.state.data}/> 
          </table>
    );
  }
});

var CourseList = React.createClass({

  render: function() {
   
    return (
      <tbody className="CourseList">
          {
              this.props.data.coursesData.map(function(course) {
                return <tr key={course.cid}><td>{course.subject}</td><td>{course.coursenum}</td><td>{course.title}</td><td> <a href="#blank">Edit</a> | <a href="#blank">Delete</a> </td></tr>
              })
          }  
      </tbody>
    )
  }
});

var buttonStyle = {
  float: 'right'
};

React.render(<Courses />, document.getElementById('reactCourses'));
