/*
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('User is: '+ JSON.stringify(profile))
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
    
}*/

var gimage = document.querySelector('#gimg');
var gname = document.querySelector('#gname');
var gmail = document.querySelector('#gmail');
var gso = document.querySelector('#signout');
gimage.style.visibility = 'hidden';
gname.style.visibility = 'hidden';
gmail.style.visibility = 'hidden';
gso.style.visibility = 'hidden';

function onSuccess(googleUser) {
    var profile = googleUser.getBasicProfile();
    gimage.setAttribute('src', profile.getImageUrl());
    gname.innerText = 'Name: ' + profile.getName();
    gmail.innerText = 'Email: ' + profile.getEmail();
    gimage.style.visibility = 'visible';
    gname.style.visibility = 'visible';
    gmail.style.visibility = 'visible';
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
        gimage.style.visibility = 'hidden';
        gname.style.visibility = 'hidden';
        gmail.style.visibility = 'hidden';
        gso.style.visibility = 'hidden';
    });
}

/*====================================================================================================*/

function getUserData(){
    FB.api('/me', {fields: 'name,email'}, function(response) {
        console.log(response.name);
        console.log(response.email);
        document.getElementById('fname').innerHTML = response.name;
        document.getElementById('fmail').innerHTML = response.email;
    }); 
}

window.fbAsyncInit = function() {
    FB.init({
        appId      : '156488543128442',
        cookie     : true,
        xfbml      : true,
        version    : 'v10.0'
    });

    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            console.log("User authorized.");
            getUserData();
        } else {
            console.log("User not Authorized.");
        }
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.com/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

document.getElementById('loginBtn').addEventListener('click', function() {
    FB.login(function(response){
        if(response.authResponse){
            console.log("User just authorized.");
            getUserData();
        }
    }, {scope: 'email, public_profile', return_scopes: true});
}, false);



















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
/*
var fimage = document.querySelector('#fimg');
var fname = document.querySelector('#fname');
var fmail = document.querySelector('#fmail');
var flo = document.querySelector('#logout');
fimage.style.visibility = 'hidden';
fname.style.visibility = 'hidden';
fmail.style.visibility = 'hidden';
flo.style.visibility = 'hidden';
*/
/*
document.getElementById('fb-login').addEventListener('click',function(){
    FB.login(statusChangeCallback, {scope: 'email, public_profile', return_scopes: true});
}, false);

window.fbAsyncInit = function() {
    FB.init({
        appId      : '156488543128442',
        cookie     : true,
        xfbml      : true,
        version    : 'v10.0'
    });
    /*
    FB.getLoginStatus(function(response) {
        if(response.status === 'connected'){
            getFbUserData();
        }
    });
    
    FB.AppEvents.logPageView();   
    
    FB.login(function(response){
        if (response.authResponse){
            console.log("Welcome! Fetching your information");
            FB.api('/me', function(response){
                console.log('Good to see you'+response.name);
            });
        } else {
            console.log('User cancelled login in.')
        }
    });*/ /*
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
    console.log(response);
    if (accessToken){
        var accessToken = response.authResponse.accessToken;
    }
    if (response.status === 'connected'){
        testAPI2(accessToken);
    } else if (response.status === 'not_authorized'){
        console.log("Err");
    } else {
        console.log("Err2");
    } */
    /*
    if (response.authResponse){
        console.log("Welcome! Fetching your information");
        FB.api('/me', function(response){
            console.log('Good to see you'+response.name);
        });
    } else {
        console.log('User cancelled login in.')
    }*/

    /*if(response.status === 'connected'){
        console.log('Logged in and authenticated.');
        FB.api('/me?fields=picture.type(large),name,email', function(response){
            console.log(response)
            if(response && !response.error){
                console.log(response.data.url);
                //profile(response);
            }
            else {
                console.log("Error: "+response.error)
            }
        })
    } else {
        console.log('Not Authenticated.');
    }*/ /*
}

function checkLoginState(){
    FB.getLoginStatus(function(response){
        statusChangeCallback(response);
    });
}

function testAPI2(){
    FB.api('/me', {fields: 'id,name'},
    function (response){
        var user_id = response.id;
        var name = response.name;
        var type = 1;
        console.log(user_id+' '+name+" "+type)
        })
    }
    )
}
*/
/*function testAPI(){
    FB.api('/me?fields=picture.type(large),name,email', function(response){
        console.log(response)
        if(response && !response.error){
            console.log("response:"+response);
            profile(response);
        }
        else {
            console.log("Error: "+response.error)
        }
    })
}*/ /*
function profile(user){
    
        fimage.setAttribute('src', user.getImageUrl());
        fname.innerText = 'Name: ' + user.name;
        fmail.innerText = 'Email: ' + user.email;
        fimage.style.visibility = 'visible';
        fname.style.visibility = 'visible';
        fmail.style.visibility = 'visible';
        flo.style.visibility = 'visible';
}*/
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