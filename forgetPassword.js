Webflow.push(function () {
    // Disable submitting form fields during development
    $('form').submit(function () {
        // console.log('Form submissions have been disabled during development.');
        return false;
    });
});


let submitted = false;
$('#forgetPasswordForm').submit(function (event) {
    event.preventDefault()

    if(submitted){
        return false;
    }
    document.querySelector('#forgetPassBtn').value = 'Please wait...';
    $('#forgetPassBtn').css('pointer-events', 'none');

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
            
            

            if (data.success == true) {
                $('.r__forget_msg').show();
                $('.r__form_block').hide();
            } else {
                // window.location.replace('https://knowlejapp.webflow.io/users/verify-mail')
            }

            // document.querySelector('#submitRegisterBtn').value = 'Sign Up';
            // enter you logic when the fetch is successful
            console.log(data);
        } catch (error) {
            // enter your logic for when there is an error (ex. error toast)

            console.log(error)
        }
    }

    asyncPostCall()

    submitted = true;

})