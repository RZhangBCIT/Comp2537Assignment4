function authenticateAdmin(req) {
    inputUser = document.getElementById('username').value;
    inputPass = document.getElementById('password').value;

    $.ajax({
        url: "http://localhost:1989/authenticateAdmin",
        type: "post",
        data: {
            username: inputUser,
            pass: inputPass
        },
        success: (res) => {
            window.location.href="/admin-dashboard.html"
        }
    })
}

function setup() {
    $('body').on("click", "#signin_submit", authenticateAdmin)
}

$(document).ready(setup)