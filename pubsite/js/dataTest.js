/**
 * @jsx React.DOM
 */
//Load in the api to build the data object
var data = new Object();


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
        data = response;
        
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

var CourseRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.courses.subject}</td>
                <td>{this.props.courses.coursenum}</td>
                <td>{this.props.courses.coursetitle}</td>
                <td>  <a href="#blank">Edit</a> | <a href="#blank">Delete</a> </td>
            </tr>
        );
    }
});

var CourseTable = React.createClass({
    render: function() {
        var rows = [];
        this.props.courses.forEach(function(courses) {
            rows.push(<CourseRow courses={courses} key={courses.cid} />);
        }.bind(this));
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
                <tbody>{rows}</tbody>
          </table>
            
            
        );
    }
});



var AllCourseTable = React.createClass({
    render: function() {
        return (
            <div>
                <CourseTable courses={this.props.courses}/>
            </div>
        );
    }
});



React.render(
    <AllCourseTable courses={data} />,
    document.getElementById('dataTest')
);

        
        
    