function createUser() {
    

    var intendedStartDate = document.getElementById("startSeason").value;
    var firstName = document.getElementById("inputFirstName").value;
    var lastName = document.getElementById("inputLastName").value;
    var email = document.getElementById("inputEmail").value;
    var pass = document.getElementById("inputPassword").value;
    var accessLevel = "1";
    var currentCollege = document.getElementById("currentCollege").value;
    
    console.log(intendedStartDate + " : " + firstName + " : " + lastName + " : " +  email + " : " + pass + " : " + accessLevel + " : " + currentCollege)
    
    var studentobj = {intendedStartDate : intendedStartDate, firstName : firstName, lastName : lastName,
                      email : email, pass : pass, accessLevel : accessLevel, currentCollege : currentCollege};
    console.log(studentobj);
    /*
    jQuery.ajax( {
    url: "http://capping.xyz:3000/api/students/",
    type: "GET",
    crossDomain: true, 
    contentType: "text/plain; charset=utf-8",
    dataType: "json",
    async:false,
    success: function( response ) {
        console.log(updated);
        
        
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
    */
    
    
    jQuery.ajax( {
    url: "http://capping.xyz:3000/api/students/",
    type: "POST",
    crossDomain: true, 
//    contentType: "text/plain; charset=utf-8",
    data: studentobj,
    dataType: "json",
    async:false,
    success: function( response ) {
        //console.log(updated);
        document.getElementById("regStaus").innerHTML = "Successfuly Registered";
        
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