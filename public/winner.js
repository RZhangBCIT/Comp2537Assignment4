
function quitGame() {
    $.ajax({
        url: "http://localhost:1989/",
        type: "get",
        success: (res) => {
            window.location.href="/user_profile.html"
        }
    })
}

function playAgain() {
    $.ajax({
        url: "http://localhost:1989/game-setup",
        type: "get",
        success: (res) => {
            window.location.href="/game-setup.html"
        }
    })
}

function setup() {
    $('body').on("click", "#yes", playAgain)
    $('body').on("click", '#no', quitGame)
}

$(document).ready(setup)