/**
 * @jsx React.DOM
 */
var Courses = React.createClass({
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
            <tbody>
                <tr><Course subject='CMPT' number='101' name='Intro to Adventure Games'></Course></tr>
                <tr><Course subject='CMPT' number='101' name='Intro to Adventure Games'></Course></tr>
                <tr><Course subject='BUSI' number='101' name='Intro to Adventure Games'></Course></tr>
                <tr><Course subject='ART' number='101' name='Intro to Adventure Games'></Course></tr>
            </tbody>
          </table>
        
    );
  }
});

var Course = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.subject}</td>
        <td>{this.props.number}</td>
        <td>{this.props.name}</td>
        <td> <a href="#blank">Edit</a> | <a href="#blank">Delete</a> </td>
      </tr>
    );
  }
});

var buttonStyle = {
  float: 'right'
};



React.render(<Courses />, document.getElementById('tableTest'));

