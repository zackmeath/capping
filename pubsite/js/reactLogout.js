function logoutStudent(){
    deleteCookie("studentid");
    window.location.replace("http://www.capping.xyz/login.html");
}

var deleteCookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};