var addcoursedata = new Object();
var studentid = 20;
if( getCookie("studentid") != ""){
   studentid = getCookie("studentid");
}

$(document).ready(function() {
    jQuery.ajax( {
    url: "http://capping.xyz:3000/api/courses",
    type: "GET",
    crossDomain: true, 
    contentType: "text/plain; charset=utf-8",
    dataType: "json",
    async:false,
    success: function( response ) {
        //console.log(response);
        addcoursedata = response;
        loadDept();
        
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
   
function loadDept(){
    var alldepts = [];
    addcoursedata.forEach( function (item){
     var x = item.subject;
        alldepts.push(x);
    });
    //console.log(alldepts);
    
    var depts = [];
    $.each(alldepts, function(i, el){
    if($.inArray(el, depts) === -1) depts.push(el);
});
    
    var options = '';
  for(var i = 0; i < depts.length; i++){
    options += '<option value="'+depts[i]+'" />'+depts[i]+'</option>';
  }
    
  document.getElementById('deptT0').innerHTML = options;
}

function loadnewDept(element){
    var alldepts = [];
    addcoursedata.forEach( function (item){
     var x = item.subject;
        alldepts.push(x);
    });
    //console.log(alldepts);
    
    var depts = [];
    $.each(alldepts, function(i, el){
    if($.inArray(el, depts) === -1) depts.push(el);
});
    
    var options = '';
  for(var i = 0; i < depts.length; i++){
    options += '<option value="'+depts[i]+'" />'+depts[i]+'</option>';
  }
    
  document.getElementById(element).innerHTML = options;
}


function updateNums(element){
    var nums = [];
    //console.log(addcoursedata);
    addcoursedata.forEach( function (item){
        //console.log(item.subject);
        //console.log(element.value);
        if(item.subject == element.value){
            nums.push(item.coursenum);
        }
    });
    console.log(nums);
    
    var options = '';
  for(var i = 0; i < nums.length; i++){
    options += '<option value="'+nums[i]+'" />'+nums[i]+'</option>';
  }
   var s = element.id;
   s = s.slice(5);
   s = "courseT" + s; 
  document.getElementById(s).innerHTML = options;
    
}

function addCourseRow() {
            var table = document.getElementById("courseTable");
        console.log(table.rows.length);
            var row = table.insertRow(table.rows.length);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);

            var input1 = document.createElement("select");
            input1.setAttribute("class","form-control");
            input1.setAttribute("onchange", "updateNums(this);");
            input1.placeholder="Department";
            input1.id="deptT"+table.rows.length;
            
            var input2 = document.createElement("select");
            input2.setAttribute("class","form-control");
            input2.placeholder="Course Number";
            input2.id="courseT"+table.rows.length;
                        
            var input3 = document.createElement("a");
            input3.href="#blank";
            input3.innerHTML = "Delete";
            
            
            cell1.appendChild(input1);
            cell2.appendChild(input2);
            cell3.appendChild(input3);
            loadnewDept(input1.id);
}


function submitCourses() {
    var cids = [];
    
    var table = document.getElementById("courseTable");
       for (var i = 0, row; row = table.rows[i]; i++) {
           var subject = "";
           var cnum = "";
           
               for (var j = 0, col; col = row.cells[j]; j++) {           
                   if(j == 0){
                    var x = col.getElementsByClassName("form-control");   
                    subject = x[0].value;
                   }
                   if(j == 1){
                    var x = col.getElementsByClassName("form-control");   
                    cnum = x[0].value;
                   }   
               }  
           
           addcoursedata.forEach( function (item){
                //console.log(item.subject + "  vs  " + subject);
                if(item.subject == subject && item.coursenum == cnum){
                    cids.push(item.cid);
                    console.log(item.cid);
                }
            });

        }
    
    console.log(cids);
    var cidobj = {courses : cids};
    console.log(cidobj);
    console.log(cidobj.courses);
    //var courses = cids;
    
    jQuery.ajax( {
    url: "http://capping.xyz:3000/api/students/"+ studentid +"/courses/",
    type: "POST",
    crossDomain: true, 
//    contentType: "text/plain; charset=utf-8",
    data: cidobj,
    dataType: "json",
    async:false,
    success: function( response ) {
        //console.log(updated);
        window.location.reload(false); 
        
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


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}   

