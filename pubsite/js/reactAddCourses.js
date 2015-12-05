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
    data.forEach( function (item){
     var x = item.subject;
        alldepts.push(x);
    });
    console.log(alldepts);
    
    var depts = [];
    $.each(alldepts, function(i, el){
    if($.inArray(el, depts) === -1) depts.push(el);
});
    
    var options = '';
  for(var i = 0; i < depts.length; i++){
    options += '<option value="'+depts[i]+'" />';
  }
    
  document.getElementById('comboDept').innerHTML = options;
}