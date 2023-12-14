Webflow.push(function () {
    // Disable submitting form fields during development
    $('form').submit(function () {
        // console.log('Form submissions have been disabled during development.');
        return false;
    });
});

let searchParams = new URLSearchParams(window.location.search)
searchParams.has('token') 
let token = searchParams.get('token');


if(token){
    $('#change_password_form').submit(function(e){
        e.preventDefault();
        $('.r_signin_error').hide();
        if($('#password').val() === $('#confirm-password').val()){
            $('#password_reset_btn').val('Please wait...');
            $('#password_reset_btn').css('pointer-events', 'none');
            let password = $('#confirm-password').val();
    
    
            var form = new FormData();
            form.append("token", token);
        
            form.append("password", password);
            
            var settings = {
              "url": "https://dev.k12hosting.io/api/change-password",
              "method": "POST",
              "timeout": 0,
              "processData": false,
              "mimeType": "multipart/form-data",
              "contentType": false,
              "data": form
            };
            
            $.ajax(settings).done(function (response) {
              console.log(response);
              if(response.sucess){
                $('.r__after_success').show();
                $('.reset_password_form').hide();
              }else{
                $('.r_signin_error').text("Invalid token! Please resend your password reset link.");
                $('.r_signin_error').show();
              }
              
            });
        }else{
            $('#password_reset_btn').val('Update Password');
            $('#password_reset_btn').css('pointer-events', 'auto');
            $('.r_signin_error').show();
            console.log("Password does not match")
        }
    
    })
    
}else{
    window.location.replace('https://knowlejapp.webflow.io/')
}

