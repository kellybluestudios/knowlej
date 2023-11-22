Webflow.push(function () {
    // Disable submitting form fields during development
    $('form').submit(function () {
        console.log('Form submissions have been disabled during development.');
        return false;
    });
});
$('#email-form').submit(function (event) {
    event.preventDefault()
    document.querySelector('#signInBtn').value = 'Please wait...';
    let email = $('#email').val();
    let password = $('#password').val();
    const asyncPostCall = async () => {
        try {
            const response = await fetch('https://dev.k12hosting.io/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    email: email,
                    password: password
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
                        window.location.replace('https://knowlejapp.webflow.io/admin-dashboards/reports')
                    }

                }


                getIsVeriy();
            } else {
                $('.r_signin_error').hide();
                $('.r_signin_error_invalid').show();
                document.querySelector('#signInBtn').value = 'Sign In';
            }




            //window.location.replace('https://knowlejapp.webflow.io/users/verify-mail')
            //document.querySelector('#submitRegisterBtn').value = 'Continue';
            // enter you logic when the fetch is successful

        } catch (error) {
            // enter your logic for when there is an error (ex. error toast)

            console.log(error)
        }
    }

    asyncPostCall()

})



$('#google_sign_in').click(function (e) {
    e.preventDefault();
    googleSignIn();
})

$('#facebook_sign_in').click(function (e) {
    e.preventDefault();
    fLogin();
})
