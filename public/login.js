function authenticateUser(req) {
    inputUser = document.getElementById('username').value;
    inputPass = document.getElementById('password').value;

    $.ajax({
        url: "http://localhost:1989/authenticateUser",
        type: "post",
        data: {
            username: inputUser,
            pass: inputPass
        },
        success: (res) => {
            window.location.href="/user_profile.html"
        }
    })
}

function setup() {
    $('body').on("click", "#signin_submit", authenticateUser)
}

$(document).ready(setup)