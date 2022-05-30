function loadUserInfo() {
    $.ajax({
        url: "http://localhost:1989/getUserInfo",
        type: "Get",
        success: (user) => {
            $('main').append(`
            <p>Welcome admin ${user[0].firstName} !<p>
            `)
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

function gameSetup() {
    $.ajax({
        url: "http://localhost:1989/game-setup",
        type: "get",
        success: (res) => {
            window.location.href="/game-setup.html"
        }
    })
}

function setup() {
    loadUserInfo();

    $("body").on("click", "#logout", logOut)
    $("body").on("click", "#shop", searchPage)
    $("body").on("click", "#game", gameSetup)
}

$(document).ready(setup)