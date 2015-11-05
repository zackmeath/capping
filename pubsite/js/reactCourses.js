/**
 * @jsx React.DOM
 */
//Load in the api to build the data object
var data = {
    "coursesData": [{
      id: 1,
      subject: "CMPT",
      number: "101L",
      name: "Intro to Adventure Games"
  },{
      id: 2,
      subject: "BUS",
      number: "110L",
      name: "Intro to Business"
  }]
};

var Courses = React.createClass({

  // get game info
  loadCourses: function() {    
    this.setState({data: data});
  },

  getInitialState: function(){
    return {data: {coursesData: []} };
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
    console.log(this.props.data.coursesData);
    return (
      <tbody className="CourseList">
          {
              this.props.data.coursesData.map(function(course) {
                return <tr key={course.id}><td>{course.subject}</td><td>{course.number}</td><td>{course.name}</td><td> <a href="#blank">Edit</a> | <a href="#blank">Delete</a> </td></tr>
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