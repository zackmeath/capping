function loginUser() {
    
    var email = document.getElementById("signInEmail").value;
    var password = document.getElementById("signInPassword").value;
    
    console.log(email + " : " + password)
    
    var studentobj = {email : email, password : password};
    console.log(studentobj);
    
    jQuery.ajax( {
    url: "http://capping.xyz:3000/api/login/",
    type: "POST",
    crossDomain: true, 
    //contentType: "text/plain; charset=utf-8",
    data: studentobj,
    dataType: "json",
    async: false,
    success: function( response ) {
        console.log(response);
       if(response.success === true){
           document.cookie= "studentid=" + response.id + "; path=/;";
           console.log(document.cookie);
           window.location.replace("http://www.capping.xyz/studentview.html");
       } else {
        alert(response.msg);   
       }
        
        
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
