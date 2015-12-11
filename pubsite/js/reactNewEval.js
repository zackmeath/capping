/**
 * @jsx React.DOM
 */
//Load in the api to build the data object
var newevaldata = new Object();
var newevaldata2 = new Object();
var studentid = 20;
if( getCookie("studentid") != ""){
   studentid = getCookie("studentid");
}

$(document).ready(function() {
    jQuery.ajax( {
    url: "http://capping.xyz:3000/api/majors",
    type: "GET",
    crossDomain: true, 
    contentType: "text/plain; charset=utf-8",
    dataType: "json",
    async:false,
    success: function( response ) {
        //console.log(response);
        newevaldata = response;
        loadMajors()
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


function loadMajors(){
    var allmajors = [];
    newevaldata.forEach( function (item){
     var x = item.title;
        allmajors.push(x);
    });
    //console.log(allmajors);
    
    var majors = [];
    $.each(allmajors, function(i, el){
    if($.inArray(el, majors) === -1) majors.push(el);
});
    
    var options = '';
  for(var i = 0; i < majors.length; i++){
    options += '<option value="'+majors[i]+'" />'+majors[i]+'</option>';
  }
    
  document.getElementById('major').innerHTML = options;
}

function getMajorid(){
    var pickedMajorid = 0;
    var pickedMajorTitle = document.getElementById('major').value;
    //console.log(newevaldata);
        newevaldata.forEach( function (item){
                if(item.title == pickedMajorTitle){
                    pickedMajorid = item.mid;
                    //console.log(item.mid);
                }
            });
    //console.log(newevaldata);
    //console.log(pickedMajorTitle + " " + pickedMajorid);
    return pickedMajorid;
}

function runEval(){
    var majorid = getMajorid();
    //console.log(majorid + " " + studentid);

    jQuery.ajax( {
    url: "http://capping.xyz:3000/api/equivalencies/majors/"+ majorid +"/students/" + studentid + "",
    type: "GET",
    crossDomain: true, 
    contentType: "text/plain; charset=utf-8",
    //data: studentobj,
    //dataType: "json",
    async: false,
    success: function( response ) {
        //console.log(response);
       newevaldata2 = response;
        updateReact();
        
        
    },
    error: function(textStatus) {
        console.log(textStatus);
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
    
}





function updateReact(){

var CourseRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.courses.studentCourseSubject} {this.props.courses.studentCourseNumber}  {this.props.courses.studentCourseName}</td>
                <td>{this.props.courses.doesTransfer.toString()}</td>
                <td>{this.props.courses.courseSubject} {this.props.courses.courseNumber} {this.props.courses.courseName}</td>
                <td>{this.props.courses.credits}</td>
            </tr>
        );
    }
});

var CourseTable = React.createClass({
    render: function() {
        var rows = [];
        this.props.courses.forEach(function(courses) {
            rows.push(<CourseRow courses={courses} key={courses.studentCourseId} />);
        }.bind(this));
        return (
            
            
            <table className="table table-hover table-bordered table-responsive">
            <thead>
              <tr>
                <th>DCC Course</th>
                <th>Does it Transfer</th>
                <th>Marist Course</th>
                <th>Credits</th>
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
    <AllCourseTable courses={newevaldata2} />,
    document.getElementById('reactNewEval')
);

}