function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    //console.log('User is: '+ JSON.stringify(profile))
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    var element = document.querySelector('#gname');
    element.innerText = 'Name: ' + profile.getName();
    var image = document.querySelector('#gimg');
    image.setAttribute('src', profile.getImageUrl());
    var email = document.querySelector('#gmail');
    element.innerText = 'Email: ' + profile.getEmail();

}

var image = document.querySelector('#gimg');
var ename = document.querySelector('#gname');
var email = document.querySelector('#gmail');
var gso = document.querySelector('#signout');
image.style.visibility = 'hidden';
ename.style.visibility = 'hidden';
email.style.visibility = 'hidden';
gso.style.visibility = 'hidden';

function onSuccess(googleUser) {
    var profile = googleUser.getBasicProfile();
    image.setAttribute('src', profile.getImageUrl());
    ename.innerText = 'Name: ' + profile.getName();
    email.innerText = 'Email: ' + profile.getEmail();
    image.style.visibility = 'visible';
    ename.style.visibility = 'visible';
    email.style.visibility = 'visible';
    gso.style.visibility = 'visible';
}
function onFailure(error) {
    console.log(error);
}
function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
});
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        image.style.visibility = 'hidden';
        ename.style.visibility = 'hidden';
        email.style.visibility = 'hidden';
        gso.style.visibility = 'hidden';
    });
}


/*       


{
status: 'connected',
authResponse: {
accessToken: '...',
expiresIn:'...',
signedRequest:'...',
userID:'...'
}
}

function checkLoginState() {
FB.getLoginStatus(function(response) {
statusChangeCallback(response);
});
}*/





window.fbAsyncInit = function() {
    FB.init({
        appId      : '156488543128442',
        cookie     : true,
        xfbml      : true,
        version    : 'v11.0'
    });
    /*
    FB.getLoginStatus(function(response) {
        if(response.status === 'connected'){
            getFbUserData();
        }
    });
    
    FB.AppEvents.logPageView();   
    */
    FB.getLoginStatus(function(response){
        statusChangeCallback(response);
    });
};

(function(d, s, id){
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) {return;}
js = d.createElement(s); js.id = id;
js.src = "https://connect.facebook.net/en_US/sdk.js";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response){
    if(response.status === 'connected'){
        console.log('Logged in and authenticated.');
    } else {
        console.log('Not Authenticated.');
    }
}
function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
}
function testAPI(){
    FB.api('/me?fields=name,email', function(response){
        if(response && !response.error){
            console.log(response);
            profile(response);
        }
    })
}
function profile(user){

}
/*
function fbLogin(){
    FB.login(function (response){
        if (response.authResponse){
            getFbUserData();
        }
        else{
            document.getElementById('status').innerHTML = 'User Cancelled';
        }
    }, {scope: 'email'});
}
function getFbUserData(){
    FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture'},
        function(response){
            document.getElementById('fbLink').setAttribute("onclick", "fbLogout()");
            document.getElementById('fbLink').innerHTML = "Logout from Facebook";
            document.getElementById('status').innerHTML = "<p>Thanks for Logging in, "+ response.first_name +"!</p>";
            document.getElementById('userData').innerHTML = '<h2>Facebook Profile Details</h2><p><img src="'
                +response.picture.data.url+'"/></p><p><b></p><p><b>Name:</b> '+response.first_name+' '+response.last_name
                +'</p><p><b>Email:</b> '+response.email+'</p><p><b>Gender:</b> '+response.gender+
                '</p><p><a target="_blank" href="'+response.link+'">Click to view Profile</a></p>';

            saveUserData(response);
        });
}
function fbLogout(){
    FB.logout(function(){
        document.getElementById('fbLink').setAttribute("onclick","fbLogin()");
        document.getElementById('fbLink').innerHTML = '<img src ="medias/fb.png"/>';
        document.getElementById('userData').innerHTML = '';
        document.getElementById('status').innerHTML = '<p>You have Successfully logout from Facebook.</p>'
    });
}
*/