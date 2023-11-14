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


function statusChangeCallback(response) { 
    console.log('statusChangeCallback');
    console.log(response);                  
    if (response.status === 'connected') {   
        testAPI();
    } else {                                
    }
}


function checkLoginState() {
    FB.getLoginStatus(function (response) {  
        statusChangeCallback(response);
    });
}


window.fbAsyncInit = function () {
    FB.init({
        appId: '3497592523828268',
        cookie: true,
        xfbml: true,
        version: 'v18.0'
    });


    FB.getLoginStatus(function (response) { 
        statusChangeCallback(response);
    });
};

function testAPI() { 
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);
    });
}


function fLogin(){
    FB.login(function(response) {
        if (response.status === 'connected') {
          console.log('facebook logint in ')
          console.log(response)
          getFbUserData();
        } else {
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
