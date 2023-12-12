$('#forgetPasswordForm').submit(function (event) {
    event.preventDefault()
    document.querySelector('#forgetPassBtn').value = 'Please wait...';

    let email = $('#forgetEmail').val();
    const asyncPostCall = async () => {
        try {
            const response = await fetch('https://dev.k12hosting.io/api/forget-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    email: email
                })
            });


            const data = await response.json();
            

            // if (data.email == "The email has already been taken.") {
            //     $('.r_signin_error_invalid').text('Email Address already taken.')
            //     $('.r_signin_error_invalid').show();
            // } else {
            //     window.location.replace('https://knowlejapp.webflow.io/users/verify-mail')
            // }

            // document.querySelector('#submitRegisterBtn').value = 'Sign Up';
            // enter you logic when the fetch is successful
            console.log(data);
        } catch (error) {
            // enter your logic for when there is an error (ex. error toast)

            console.log(error)
        }
    }

    asyncPostCall()

})