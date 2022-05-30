function loadUserInfo() {
    $.ajax({
        url: "http://localhost:1989/getUserInfo",
        type: "Get",
        success: (user) => {
            $('main').append(`
            <h1>Welcome admin ${user[0].firstName} !</h1>
            `)
            $('main').append(
                "<h2>What would you like to do today?</h2>",
                '<br><button id="logout">Logout</button> <button id="add-user">Add a User</button>',
                '<button id="add-admin">Add an Admin</button>'
            )
        }
    })
}

function displayUsers() {
    $.ajax({
        url: "http://localhost:1989/getAllUsers",
        type: "get",
        success: (showUsers) => {
            $('main').append(
                "<tr><th>Username</th><th>First name</th><th>Last name</th><th>Admin?</th><th>Promote</th><th>Delete</th></tr>"
            )
            for (i = 0; i < showUsers.length; i++) {
                $('main').append(
                    `
                    <tr> <td>${showUsers[i].username}</td> <td>${showUsers[i].firstName}</td> <td>${showUsers[i].lastName}</td> <td>${showUsers[i].isAdmin}</td>
                    <td><button class="promote-a-user" id="${showUsers[i].username}">Promote User</button></td>
                    <td><button class="delete-user" id="${showUsers[i].username}">Delete User</button></td> </tr>
                    `
                )
            }
        }
    })
}

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
    userInputFields.style.visibility = "hidden";
}

function logOut() {
    $.ajax({
        url: "http://localhost:1989/logout",
        type: "get",
        success: (res) => {
            window.location.href="/login.html"
        }
    })
}

function showAddUserForm() {
    userInputFields = document.getElementById('info_form');
    userInputFields.style.visibility = "visible";
}

function promoteToAdmin() {
    console.log("Current username: " + currentUsername)
    $.ajax({
        url: `/promote-user`,
        type: 'post',
        data: {
            username: currentUsername,
            isAdmin: 'true'
        },
        success: (log) => {
            console.log(log)
        }
    })
    $('main').html('');
    loadUserInfo();
    displayUsers();
}

function deleteUser() {
    $.ajax({
        url: `http://localhost:1989/deleteUser/${x}`,
        type: "put",
        data: {
            username: x
        },
        success: s => {
            console.log(s)
        }
    })
    $('main').html('');
    loadUserInfo();
    displayUsers();
}

function setup() {
    loadUserInfo();
    displayUsers();

    $("body").on("click", "#logout", logOut)
    $("body").on("click", "#add-user", showAddUserForm)
    $('body').on("click", ".create-user", createUser)
    $('body').on("click", ".promote-a-user", promoteToAdmin)
    $('body').on("click", ".delete-user", deleteUser)
}

$(document).ready(setup)