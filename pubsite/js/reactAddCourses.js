var addcoursedata = new Object();


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
    
  document.getElementById('deptT').innerHTML = options;
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
    
  document.getElementById('courseT').innerHTML = options;
    
}
