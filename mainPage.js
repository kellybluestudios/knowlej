let params = {};
let regex = /([^&=]+)=([^&]*)/g, m;
while (m = regex.exec(location.href)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
}
if (Object.keys(params).length > 0) {
    localStorage.setItem('auth_info', JSON.stringify(params))
    window.history.pushState({}, document.title, "/" + "admin-dashboards/reports");
    let info = JSON.parse(localStorage.getItem('auth_info'));
    console.log(info)
    localStorage.setItem('access_token', info['access_token']);
    $('.r_loading_wrap_main').show();
    fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
            'Authorization': `Bearer ${info['access_token']}`
        }
    })
        .then(data => data.json())
        .then((userInfo) => {
            console.log(userInfo);

            const asyncPostCall = async () => {
                try {
                    const response = await fetch('https://dev.k12hosting.io/api/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: userInfo.name,
                            email: userInfo.email,
                            password: "123456",
                            google_sub: userInfo.sub,
                            google_picture: userInfo.picture,
                            sign_up_from: "google",
                            is_verify: 1,

                        })
                    });
                    const data = await response.json();
                    if (data.email == "The email has already been taken.") {
                        console.log('email has taken')
                        const asyncPostSignInCall = async () => {
                            try {
                                const response = await fetch('https://dev.k12hosting.io/api/login', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        email: userInfo.email,
                                        password: "123456"
                                    })
                                });
                                const data = await response.json();
                                console.log(data)
                                localStorage.setItem('access_token', data.access_token);
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
                                            $('.r_loading_wrap_main').hide(); window.location.replace('https://knowlejapp.webflow.io/admin-dashboards/reports')
                                        }
                                    }
                                    getIsVeriy();
                                } else {
                                    // $('.r_signin_error').hide();
                                    // $('.r_signin_error_invalid').show();
                                    // document.querySelector('#signInBtn').value = 'Sign In';
                                }
                                //window.location.replace('https://knowlejapp.webflow.io/users/verify-mail')
                                //document.querySelector('#submitRegisterBtn').value = 'Continue';
                                // enter you logic when the fetch is successful

                            } catch (error) {
                                // enter your logic for when there is an error (ex. error toast)

                                console.log(error)
                            }
                        }

                        asyncPostSignInCall()
                    } else {
                        const asyncPostSignInCall = async () => {
                            try {
                                const response = await fetch('https://dev.k12hosting.io/api/login', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },

                                    body: JSON.stringify({
                                        email: userInfo.email,
                                        password: "123456"
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
                                            $('.r_loading_wrap_main').hide(); window.location.replace('https://knowlejapp.webflow.io/admin-dashboards/reports')
                                        }

                                    }


                                    getIsVeriy();
                                } else {
                                    // $('.r_signin_error').hide();
                                    // $('.r_signin_error_invalid').show();
                                    // document.querySelector('#signInBtn').value = 'Sign In';
                                }




                                //window.location.replace('https://knowlejapp.webflow.io/users/verify-mail')
                                //document.querySelector('#submitRegisterBtn').value = 'Continue';
                                // enter you logic when the fetch is successful

                            } catch (error) {
                                // enter your logic for when there is an error (ex. error toast)

                                console.log(error)
                            }
                        }

                        asyncPostSignInCall()
                    }
                    //window.location.replace('https://knowlejapp.webflow.io/users/verify-mail')
                    // document.querySelector('#submitRegisterBtn').value = 'Continue';
                    // enter you logic when the fetch is successful
                    console.log(data);
                } catch (error) {
                    // enter your logic for when there is an error (ex. error toast)

                    console.log(error)
                }
            }

            asyncPostCall()
        })



    setTimeout(signInCheck, 5000);
} else {
    setTimeout(signInCheck, 5000);
}
