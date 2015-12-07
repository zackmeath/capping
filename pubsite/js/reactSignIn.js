function loginUser() {
    
    var email = document.getElementById("signInEmail").value;
    var pass = document.getElementById("signInPassword").value;
    
    console.log(email + " : " + pass)
    
    var studentobj = {email : email, pass : pass};
    console.log(studentobj);
    
    jQuery.ajax( {
    url: "http://capping.xyz:3000/api/users/",
    type: "GET",
    crossDomain: true, 
    contentType: "text/plain; charset=utf-8",
    dataType: "json",
    async:false,
    success: function( response ) {
        window.location.replace("http://capping.xyz/studentview.html");
        
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