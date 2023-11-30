

// Webflow.push(function () {
//     // Disable submitting form fields during development
//     $('form').submit(function () {
//         // console.log('Form submissions have been disabled during development.');
//         return false;
//     });
// });



const logoutFunc = async (token) => {
    const response = await fetch('https://dev.k12hosting.io/api/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },

    })

    const profileData = await response.json();

    if (profileData.success === true) {
        localStorage.setItem('user', '');
        localStorage.setItem('access_token', '');
        localStorage.setItem('auth_info', '');
        FB.logout(function (response) {
            console.log(response)
        });
        setTimeout(function () {
            window.location.replace('https://knowlejapp.webflow.io/')
        }, 2000)

    } else {
        console.log('Something Went Wrong')
    }
}

function signInCheck() {
    $('.r_loading_wrap_main').show();
    if (!localStorage.getItem('access_token') || localStorage.getItem('access_token') === null || localStorage.getItem('access_token') === undefined) {
        window.location.replace('https://knowlejapp.webflow.io/')
    } else {

        const getIsVeriy = async () => {
            const response = await fetch('https://dev.k12hosting.io/api/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },

            })

            //console.log(response);
            const profileData = await response.json();
            
            console.log(profileData.data);
            if (profileData.data == null) {
                localStorage.setItem('access_token', '');
                localStorage.setItem('user', '');
                localStorage.setItem('auth_info', '');
                window.location.replace('https://knowlejapp.webflow.io/')
                console.log('data null')
            } else if (profileData.data.school_name == null || profileData.data.school_name == '') {
                console.log("ab kuch to karenge")
                $('.r_loading_wrap_main').hide()



                $('#school_selector_form').submit(function (event) {
                    event.preventDefault()
                    document.querySelector('#submitSchoolSelectBtn').value = 'Please wait...';

                    let school_name = $('#school_name').val();
                    let user = JSON.parse(localStorage.getItem('user'));
                    console.log(user.id);
                    console.log(school_name);
                    const asyncPostCall = async () => {
                        try {
                            const response = await fetch('https://dev.k12hosting.io/api/verify-user', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                                },

                                body: JSON.stringify({
                                    id: user.id,
                                    school_name: school_name
                                })
                            });


                            const data = await response.json();
                            localStorage.setItem('user', data);
                            
                            $('.r_loading_wrap_main').hide()

                            // if (data.email == "The email has already been taken.") {
                            //     $('.r_signin_error_invalid').text('Email Address already taken.')
                            //     $('.r_signin_error_invalid').show();
                            // } else {
                            //     window.location.replace('https://knowlejapp.webflow.io/users/verify-mail')
                            // }

                            // document.querySelector('#submitSchoolSelectBtn').value = 'Sign Up';
                            // enter you logic when the fetch is successful
                            console.log(data);
                        } catch (error) {
                            // enter your logic for when there is an error (ex. error toast)

                            console.log(error)
                        }
                    }

                    asyncPostCall()

                })



            }else if(profileData.data.school_name != null || profileData.data.school_name != ''){
                console.log("not nulled")
                if(profileData.data.user_verifyed_by_admin == 0){
                    $('.r_loading_wrap_main').hide()
                    $('.r-school-selector-wrap').hide();
                    $('.r-request-sent-modal-wrap').show();
                }else if(profileData.data.user_verifyed_by_admin == 1){
                    $('.r_loading_wrap_main').hide()
                    $('.r_school_overlay').hide();
                }else{
                    $('.r_loading_wrap_main').hide()
                    logoutFunc(localStorage.getItem('access_token'))
                }
            } else {
                console.log('profile verified')
            }
            /*if (profileData.data.is_verify === 0) {
                $('.r_signin_error').show();
                $('.r_signin_error_invalid').hide();
                document.querySelector('#signInBtn').value = 'Sign In';
            } else {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('user', JSON.stringify(profileData.data));
      window.location.replace('https://knowlejapp.webflow.io/admin-dashboards/reports')
            }*/

        }


        getIsVeriy();
    }
}
function signInRouteCheck() {
    if (!localStorage.getItem('access_token') || localStorage.getItem('access_token') === null || localStorage.getItem('access_token') === undefined) {

    } else {
        window.location.replace('https://knowlejapp.webflow.io/admin-dashboards/reports')
    }
}

function googleSignIn() {
    let oauth2endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'
    let form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauth2endpoint);

    let params = {
        'client_id': '968578021146-vkr8br4ug2ocbfqb2dq7h9mnq5uep44s.apps.googleusercontent.com',
        'redirect_uri': 'https://knowlejapp.webflow.io/admin-dashboards/reports',
        'response_type': 'token',
        'scope': 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        'include_granted_scopes': 'true',
        'state': 'pass-through-value'
    }

    for (let p in params) {
        let input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p)
        input.setAttribute('value', params[p])
        form.appendChild(input);
    }

    document.body.appendChild(form);

    form.submit();


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


function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);
        // document.getElementById('status').innerHTML =
        //     'Thanks for logging in, ' + response.name + '!';
    });
}


function fLogin() {
    FB.login(function (response) {
        if (response.status === 'connected') {
            // Logged into your webpage and Facebook.
            getFbUserData();
        } else {
            // The person is not logged into your webpage or we are unable to tell. 
            console.log('not-wro')
            $('.r_signin_error_invalid').text('Something went wrong. Please try again')
            $('.r_signin_error_invalid').show();
        }
    });
}

// Fetch the user profile data from facebook
function getFbUserData() {
    FB.api('/me', { locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture' },
        function (response) {

            console.log(response);
            //    localStorage.setItem('fb_user_profile', JSON.stringify(response));
            // let userData =  JSON.parse(response); 
            // console.log(userData);
            let fullNameFb = response.first_name + " " + response.last_name;
            let fb_img = `https://graph.facebook.com/${response.id}/picture?type=large`
            let fb_id = response.id;
            let fb_email = response.email;
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
                            email: fb_email,
                            password: "NMWm%M2dNU2J2yH%1",
                            facebook_id: fb_id,
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
                                        email: fb_email,
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
                                        email: fb_email,
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









            setTimeout(function () {
                window.location.replace('https://knowlejapp.webflow.io/admin-dashboards/reports');
            }, 15000)


        });
}
