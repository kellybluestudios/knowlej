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
    //    localStorage.setItem('fb_user_profile', JSON.stringify(response));
    // let userData =  JSON.parse(response); 
    // console.log(userData);
    let fullNameFb = response.first_name + " " + response.last_name;
    let fb_img = `https://graph.facebook.com/${response.id}/picture?type=large`
    console.log(fullNameFb);
    console.log(fb_img);

       const asyncPostCall = async () => {
        try {
            const response = await fetch('https://dev.k12hosting.io/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: fullNameFb,
                    email: response.email,
                    password: "NMWm%M2dNU2J2yH%1",
                    facebook_id: response.id,
                    facebook_picture: fb_img,
                    sign_up_from: "facebook",
                    is_verify: 1,

                })
            });
            const data = await response.json();
            if (data.email == "The email has already been taken.") {
                console.log('email has taken')
                const asyncPostSignInCall = async () => {
                    try {
                        const response = await fetch('https://dev.k12hosting.io/api/login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                email: response.email,
                                password: "NMWm%M2dNU2J2yH%1"
                            })
                        });
                        const data = await response.json();
                        console.log(data)
                        localStorage.setItem('access_token', data.access_token);
                        if (data.success === true) {
                            const getIsVeriy = async () => {
                                const response = await fetch('https://dev.k12hosting.io/api/profile', {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${data.access_token}`,
                                    },

                                })
                                //console.log(response);
                                const profileData = await response.json();
                                console.log(profileData.data.is_verify);
                                if (profileData.data.is_verify === 0) {
                                    $('.r_signin_error').show();
                                    $('.r_signin_error_invalid').hide();
                                    document.querySelector('#signInBtn').value = 'Sign In';
                                } else {
                                    localStorage.setItem('access_token', data.access_token);
                                    localStorage.setItem('user', JSON.stringify(profileData.data));
                                    $('.r_loading_wrap_main').hide(); window.location.replace('https://knowlejapp.webflow.io/admin-dashboards/reports')
                                }
                            }
                            getIsVeriy();
                        } else {
                            // $('.r_signin_error').hide();
                            // $('.r_signin_error_invalid').show();
                            // document.querySelector('#signInBtn').value = 'Sign In';
                        }
                        //window.location.replace('https://knowlejapp.webflow.io/users/verify-mail')
                        //document.querySelector('#submitRegisterBtn').value = 'Continue';
                        // enter you logic when the fetch is successful

                    } catch (error) {
                        // enter your logic for when there is an error (ex. error toast)

                        console.log(error)
                    }
                }

               asyncPostSignInCall()
            } else {
                const asyncPostSignInCall = async () => {
                    try {
                        const response = await fetch('https://dev.k12hosting.io/api/login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },

                            body: JSON.stringify({
                                email: response.email,
                                password: "NMWm%M2dNU2J2yH%1"
                            })
                        });


                        const data = await response.json();
                        console.log(data)

                        if (data.success === true) {
                            const getIsVeriy = async () => {
                                const response = await fetch('https://dev.k12hosting.io/api/profile', {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${data.access_token}`,
                                    },

                                })

                                //console.log(response);
                                const profileData = await response.json();
                                console.log(profileData.data.is_verify);
                                if (profileData.data.is_verify === 0) {
                                    $('.r_signin_error').show();
                                    $('.r_signin_error_invalid').hide();
                                    document.querySelector('#signInBtn').value = 'Sign In';
                                } else {
                                    localStorage.setItem('access_token', data.access_token);
                                    localStorage.setItem('user', JSON.stringify(profileData.data));
                                    $('.r_loading_wrap_main').hide(); window.location.replace('https://knowlejapp.webflow.io/admin-dashboards/reports')
                                }

                            }


                            getIsVeriy();
                        } else {
                            // $('.r_signin_error').hide();
                            // $('.r_signin_error_invalid').show();
                            // document.querySelector('#signInBtn').value = 'Sign In';
                        }




                        //window.location.replace('https://knowlejapp.webflow.io/users/verify-mail')
                        //document.querySelector('#submitRegisterBtn').value = 'Continue';
                        // enter you logic when the fetch is successful

                    } catch (error) {
                        // enter your logic for when there is an error (ex. error toast)

                        console.log(error)
                    }
                }

                asyncPostSignInCall()
            }
            //window.location.replace('https://knowlejapp.webflow.io/users/verify-mail')
            // document.querySelector('#submitRegisterBtn').value = 'Continue';
            // enter you logic when the fetch is successful
            console.log(data);
        } catch (error) {
            // enter your logic for when there is an error (ex. error toast)

            console.log(error)
        }
    }

    asyncPostCall()









        setTimeout(function(){
            window.location.replace('https://knowlejapp.webflow.io/admin-dashboards/reports');
        }, 5000)

       
    });
}


$('#logout').click(function(e){
    e.preventDefault();

})


setTimeout(function(){
    console.log('logout clicked')
    FB.logout(function(response) {
        // Person is now logged out
        console.log(response);
     });
}, 5000)