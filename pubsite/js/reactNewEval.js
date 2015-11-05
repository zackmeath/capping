/**
 * @jsx React.DOM
 */
//Load in the api to build the data object
var data = {
    "evalCourseData": [{
      id: 1,
      dccCourse: "Intro to Adventure Games",
      transfer: "Yes",
      maristCourse: "Intro to Computer Science",
      credits: "3"
  },{
      id: 2,
      dccCourse: "Intro to Business",
      transfer: "Yes",
      maristCourse: "Business Practice",
      credits: "3"
  }]
};

var EvalsCourses = React.createClass({

  // get game info
  loadEvalsCourses: function() {    
    this.setState({data: data});
  },

  getInitialState: function(){
    return {data: {evalCourseData: []} };
  },

  componentDidMount: function() {
    this.loadEvalsCourses();
  },

    
  render: function() {
    return (
        <table className="table table-hover table-bordered table-responsive">
            <thead>
              <tr>
                <th>DCC Course</th>
                <th>Does it Transfer</th>
                <th>Marist Coruse</th>
                <th>Credits</th>
              </tr>
            </thead>
                <EvalCourseList data={this.state.data}/> 
          </table>

    );
  }
});

var EvalCourseList = React.createClass({

  render: function() {
    console.log(this.props.data.evalCourseData);
    return (
      <tbody className="EvalCourseList">
          {
              this.props.data.evalCourseData.map(function(player) {
                return <tr key={player.id}><td>{player.dccCourse}</td><td>{player.transfer}</td><td>{player.maristCourse}</td><td> {player.credits}</td></tr>
              })
          }  
      </tbody>
    )
  }
});


React.render(<EvalsCourses />, document.getElementById('reactNewEval'));