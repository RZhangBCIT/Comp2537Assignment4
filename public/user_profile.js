function loadUserInfo() {
    $.ajax({
        url: "http://localhost:1989/getUserInfo",
        type: "Get",
        success: (user) => {
            $('main').append(`
            <p>Welcome, ${user[0].firstName} <p>
            `)
            $('main').append(`${user[0].username} has purchased the following: <br>`)
            for (i = 0; i < user[0].pastOrders.length; i++) {
                $('main').append(`${user[0].pastOrders[i]} <br>`)
            }
            $('main').append(`<br> ${user[0].username} has visited the following: <br>`)
            for (i = 0; i < user[0].timeline.length; i++) {
                $('main').append(`${user[0].timeline[i]}`)
            }
            $('main').append('<br><button id="logout">Logout</button> <button id="shop">Shop For Pokemon</button>')
        }
    })
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

function searchPage() {
    $.ajax({
        url: "http://localhost:1989/search",
        type: "get",
        success: (res) => {
            window.location.href="/search.html"
        }
    })
}

function setup() {
    loadUserInfo();

    $("body").on("click", "#logout", logOut)
    $("body").on("click", "#shop", searchPage)
}

$(document).ready(setup)