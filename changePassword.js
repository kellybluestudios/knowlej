Webflow.push(function () {
    // Disable submitting form fields during development
    $('form').submit(function () {
        // console.log('Form submissions have been disabled during development.');
        return false;
    });
});

let searchParams = new URLSearchParams(window.location.search)
searchParams.has('token') 
let token = searchParams.get('token')
console.log(token);



$('#change_password_form').submit(function(e){
    e.preventDefault();

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
    });

})
