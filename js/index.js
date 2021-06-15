/*============================== Google Login ===============================*/

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

/*================================ FaceBook Login ===================================*/

var fimage = document.querySelector('#fimg');
var fname = document.querySelector('#fname');
var fmail = document.querySelector('#fmail');
var flo = document.querySelector('#logout');

fimage.style.visibility = 'hidden';
fname.style.visibility = 'hidden';
fmail.style.visibility = 'hidden';
flo.style.visibility = 'hidden';

window.fbAsyncInit = function() {
    FB.init({
        appId      : '156488543128442',
        cookie     : true,
        xfbml      : true,
        version    : 'v11.0'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            getUserData();
        } else {
            FB.login(function(response){
                if(response.authResponse){
                    getUserData();
                } else {
                    console.log("Not Authorized.")
                }
            }, {scope: 'email, public_profile', return_scopes: true});
        }
    });
}

function getUserData(){
    FB.api('/me', {fields: 'name,email,picture.type(large)'}, function(response) {
        fimage.setAttribute('src', response.picture.data.url);
        fname.innerHTML = 'Name: ' + response.name;
        fmail.innerHTML = 'Email: ' + response.email;

        fimage.style.visibility = 'visible';
        fname.style.visibility = 'visible';
        fmail.style.visibility = 'visible';
        flo.style.visibility = 'visible';
    }); 
}

function logout() {
    FB.getLoginStatus(function(response) {
        if (response.authResponse) {
            FB.logout(function(response){
                fimage.style.visibility = 'hidden';
                fname.style.visibility = 'hidden';
                fmail.style.visibility = 'hidden';
                flo.style.visibility = 'hidden';
            });
        } else {
            console.log("Unauthorized Logout.")
        }
    });
}
