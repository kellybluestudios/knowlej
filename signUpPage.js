Webflow.push(function () {
    // Disable submitting form fields during development
    $('form').submit(function () {
        console.log('Form submissions have been disabled during development.');
        return false;
    });
});
$('#email-form').submit(function (event) {
    event.preventDefault()
    document.querySelector('#submitRegisterBtn').value = 'Please wait...';

    let name = $('#name-2').val();
    let email = $('#email-2').val();
    let password = $('#password-2').val();
    const asyncPostCall = async () => {
        try {
            const response = await fetch('https://dev.k12hosting.io/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });


            const data = await response.json();
            window.location.replace('https://knowlejapp.webflow.io/users/verify-mail')
            document.querySelector('#submitRegisterBtn').value = 'Continue';
            // enter you logic when the fetch is successful
            console.log(data);
        } catch (error) {
            // enter your logic for when there is an error (ex. error toast)

            console.log(error)
        }
    }

    asyncPostCall()

})

$('#google_sign_in').click(function (e) {
    e.preventDefault();
    console.log('btn clicked')
    googleSignIn();
})


function checkIfFacebookIsBlocked() {
    fetch('https://connect.facebook.net/en_US/sdk.js')
      .then(response => {
        if (!response.ok) {
          // Show an error message
          console.log('error occred while loading facebook')
        }
      })
      .catch(error => {
        // Handle the error (e.g., show an error message)
        console.log(error)
      });
  }
  // Call checkIfFacebookIsBlocked() as soon as possible during app initialization
  checkIfFacebookIsBlocked()



function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
        testAPI();
    } else {                                 // Not logged into your webpage or we are unable to tell.
        // document.getElementById('status').innerHTML = 'Please log ' +
        //     'into this webpage.';
    }
}


function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function (response) {   // See the onlogin handler
        statusChangeCallback(response);
    });
}


window.fbAsyncInit = function () {
    FB.init({
        appId: '3497592523828268',
        cookie: true,                     // Enable cookies to allow the server to access the session.
        xfbml: true,                     // Parse social plugins on this webpage.
        version: 'v18.0'           // Use this Graph API version for this call.
    });


    FB.getLoginStatus(function (response) {   // Called after the JS SDK has been initialized.
        statusChangeCallback(response);        // Returns the login status.
    });
};

function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);
        // document.getElementById('status').innerHTML =
        //     'Thanks for logging in, ' + response.name + '!';
    });
}


function fLogin(){
    FB.login(function(response) {
        if (response.status === 'connected') {
          // Logged into your webpage and Facebook.
          console.log('facebook logint in ')
          console.log(response)
          getFbUserData();
        } else {
          // The person is not logged into your webpage or we are unable to tell. 
          console.log('not-wro')
        }
      });
}

$('#facebook_sign_in').click(function (e) {
    e.preventDefault();
    console.log('btn clicked')
    fLogin();
})

// Fetch the user profile data from facebook
function getFbUserData(){
    FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture'},
    function (response) {

       console.log(response);
       localStorage.setItem('fb_user_profile', JSON.stringify(response));
       window.location.replace('https://knowlejapp.webflow.io/admin-dashboards/reports');
    });
}





$('#logout').click(function(e){
    e.preventDefault();
    console.log('logout clicked')

    FB.logout(function(response) {
        // Person is now logged out
        console.log(response);
     });
})

// window.fbAsyncInit = function() {
//     // FB JavaScript SDK configuration and setup
//     FB.init({
//       appId      : '3497592523828268', // FB App ID
//       cookie     : true,  // enable cookies to allow the server to access the session
//       xfbml      : true,  // parse social plugins on this page
//       version    : 'v3.2' // use graph api version 2.8
//     });
    
//     // Check whether the user already logged in
//     FB.getLoginStatus(function(response) {
//         if (response.status === 'connected') {
//             console.log('connencted')
//             //display user data
//             getFbUserData();
//         }
//     });
// };

// // Load the JavaScript SDK asynchronously
// // (function(d, s, id) {
// //     var js, fjs = d.getElementsByTagName(s)[0];
// //     if (d.getElementById(id)) return;
// //     js = d.createElement(s); js.id = id;
// //     js.src = "//connect.facebook.net/en_US/sdk.js";
// //     fjs.parentNode.insertBefore(js, fjs);
// // }(document, 'script', 'facebook-jssdk'));

// // Facebook login with JavaScript SDK
// function fbLogin() {
//     FB.login(function (response) {
//         if (response.authResponse) {
//             // Get and display the user profile data
//             console.log(response);
//             getFbUserData();
//         } else {
//             // document.getElementById('status').innerHTML = 'User cancelled login or did not fully authorize.';
//             console.log('User cancelled login or did not fully authorize.')
//         }
//     }, {scope: 'email'});
// }



// // Logout from facebook
// function fbLogout() {
//     FB.logout(function() {
//         document.getElementById('fbLink').setAttribute("onclick","fbLogin()");
//         document.getElementById('fbLink').innerHTML = '<img src="images/fb-login-btn.png"/>';
//         document.getElementById('userData').innerHTML = '';
//         document.getElementById('status').innerHTML = '<p>You have successfully logout from Facebook.</p>';
//     });
// }




// document.getElementById('facebook_sign_in').addEventListener('click', () => {
//     console.log('btn click')
// 	//do the login
// 	FB.login((response) => {
// 		if (response.authResponse) {
// 			//user just authorized your app
// 			// document.getElementById('loginBtn').style.display = 'none';
// 			checkLoginState();
//             console.log(response);
// 		}
// 	}, {scope: 'email,public_profile', return_scopes: true});
// }, false);

