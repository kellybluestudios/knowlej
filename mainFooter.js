let userStr = localStorage.getItem('user');
let userObj;
if (userStr) {
    userObj = JSON.parse(userStr);

    let userImg = `https://dev.k12hosting.io/uploads/users/${userObj.user_img}`
    $('.r_username').text(userObj.name);
    if(userObj.user_img == null){
        if (userObj.google_picture == null) {
            $('.r_profile_pic').attr('src', `https://uploads-ssl.webflow.com/65161b9fa8e9cef28c88d2bb/654d1c2173031afbba9d3879_user%20(1).png`);
    
        } else {
            $('.r_profile_pic').attr('src', `${userObj.google_picture}`);
            $('.r_profile_pic').attr('srcset', `${userObj.google_picture}`);
        }
    }else{
        $('.r_profile_pic').attr('src', userImg);
        $('.r_profile_pic').attr('srcset', userImg);
        $(".r__upload_img_prev").attr("src",userImg);
        $(".r__upload_img_prev").attr("srcset", "");
    }
    

    $('.r_user_email').text(userObj.email)
    $('.r_user_name_inuput').val(userObj.name);
    $('.r_user_email_input').val(userObj.email);
    $('.r_user_bio_input').val(userObj.bio);
    $('.r_user_phone_input').val(userObj.phone);
    $('.r__user_role_input').val(userObj.user_role);
    $('.r_user_location_input').val(userObj.location);
    $('.r_user_website_input').val(userObj.website);
    $('.r_user_phone').text(userObj.phone);
    $('.r-user_location').text(userObj.location);
    $('.r_user_url').text(userObj.website);
    $('.r_bio_rich').text(userObj.bio);
    $('.r_school_name').text(userObj.school_name);
    $('.r_position_dom').text(userObj.user_role);
    

    var today = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = months[today.getMonth()];
    var day = today.getDate();
    var year = today.getFullYear();
    
    today = month + " " + day + ", " + year;

    console.log(today);
    $(".r_current_date_dom").text(today);
    

}


$('.r_logout').click(function (e) {
    e.preventDefault();

    let token = localStorage.getItem('access_token');
    logoutFunc(token)
    // const logoutCall = async () => {
    //     const response = await fetch('https://dev.k12hosting.io/api/logout', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`,
    //         },

    //     })

    //     const profileData = await response.json();

    //     console.log(profileData);

    //     if (profileData.success === true) {
    //         localStorage.setItem('user', '');
    //         localStorage.setItem('access_token', '');
    //         localStorage.setItem('auth_info', '');
    //         FB.logout(function (response) {
    //             // Person is now logged out
    //             console.log(response)
    //         });
    //         setTimeout(function () {
    //             window.location.replace('https://knowlejapp.webflow.io/')
    //         }, 2000)

    //     } else {
    //         console.log('Something Went Wrong')
    //     }

    // }


    // logoutCall();
})

