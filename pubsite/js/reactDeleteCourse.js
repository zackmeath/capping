function deleteCourse(cid){
    console.log(cid);
    var urlS = "http://capping.xyz:3000/api/students/20/courses/" + cid;
    
    jQuery.ajax( {
    url: urlS,
    type: "DELETE",
    crossDomain: true, 
//    contentType: "text/plain; charset=utf-8",
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