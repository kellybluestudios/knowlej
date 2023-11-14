function signInCheck() {
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