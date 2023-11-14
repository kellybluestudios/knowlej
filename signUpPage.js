Webflow.push(function () {
    // Disable submitting form fields during development
    $('form').submit(function () {
        // console.log('Form submissions have been disabled during development.');
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

            if (data.email == "The email has already been taken.") {
                $('.r_signin_error_invalid').text('Email Address already taken.')
                $('.r_signin_error_invalid').show();
            } else {
                window.location.replace('https://knowlejapp.webflow.io/users/verify-mail')
            }

            document.querySelector('#submitRegisterBtn').value = 'Sign Up';
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

$('#facebook_sign_in').click(function (e) {
    e.preventDefault();
    fLogin();
})



// setTimeout(function(){
//     console.log('logout clicked')
//     FB.logout(function(response) {
//         // Person is now logged out
//         console.log(response);
//      });
// }, 5000)