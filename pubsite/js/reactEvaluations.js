/**
 * @jsx React.DOM
 */
//Load in the api to build the data object
var data = {
    "evalData": [{
      id: 1,
      major: "CS",
      creditsAccepted: "24",
      dateCreated: "September 28, 2015"
  },{
      id: 2,
      major: "BUS",
      creditsAccepted: "12",
      dateCreated: "October 31, 2015"
  }]
};

var Evals = React.createClass({

  // get game info
  loadEvals: function() {    
    this.setState({data: data});
  },

  getInitialState: function(){
    return {data: {evalData: []} };
  },

  componentDidMount: function() {
    this.loadEvals();
  },

    
  render: function() {
    return (
        <table className="table table-hover table-bordered table-responsive">
            <thead>
              <tr>
                <th>Major</th>
                <th>Credits Accepted</th>
                <th>Date Created</th>
                <th> <button type="button" className="btn btn-success" data-toggle="modal" data-target="#evalModal" style={buttonStyle} >New Evaluation</button> </th>
              </tr>
            </thead>
                <EvalList data={this.state.data}/> 
          </table>
    );
  }
});

var EvalList = React.createClass({

  render: function() {
    console.log(this.props.data.evalData);
    return (
      <tbody className="EvalList">
          {
              this.props.data.evalData.map(function(player) {
                return <tr key={player.id}><td>{player.major}</td><td>{player.creditsAccepted}</td><td>{player.dateCreated}</td><td> <a href="#blank">Edit</a> | <a href="#blank">Delete</a> </td></tr>
              })
          }  
      </tbody>
    )
  }
});

var buttonStyle = {
  float: 'right'
};

React.render(<Evals />, document.getElementById('reactEvaluations'));