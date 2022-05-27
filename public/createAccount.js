function createUser() {
    missmatchWarning = document.getElementById('passwords-dont-match-warning');
    emptyFieldWarning = document.getElementById('empty-fields-warning');
    usernameInput = document.getElementById('username').value;
    firstNameInput = document.getElementById('first').value;
    lastNameInput = document.getElementById('last').value;
    passwordInput = document.getElementById('password').value;
    confirmInput = document.getElementById('confirm_password').value;

    if (passwordInput !== confirmInput) {
        console.log("passwords do not match")
        missmatchWarning.style.visibility = "visible"
    } else if (usernameInput.trim().length === 0 || firstNameInput.trim().length === 0 || lastNameInput.trim().length === 0 || passwordInput.trim().length === 0 || confirmInput.trim().length === 0) {
        console.log("fields left empty");
        emptyFieldWarning.style.visibility = "visible"
    } else {
        $.ajax({
            url: "http://localhost:1989/createAccount",
            type: "put",
            data: {
                username: `${document.getElementById('username').value}`,
                pass: `${document.getElementById('password').value}`,
                firstName: `${document.getElementById('first').value}`,
                lastName: `${document.getElementById('last').value}`
            },
            success: (res) => {
                console.log(res)
            }
        })
    }
}

function setup() {
    $('body').on("click", ".signup_submit", createUser)
}

$(document).ready(setup)