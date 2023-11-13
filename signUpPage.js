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
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this webpage.';
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
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });
}