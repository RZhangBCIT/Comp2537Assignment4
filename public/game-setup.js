


function startGame() {
    $.ajax({
        url: "http://localhost:1989/game",
        type: "get",
        success: (res) => {
            window.location.href="/memory-game.html"
        }
    })
}

function setup() {
    $("body").on("click", "#start", startGame)
}

$(document).ready(setup)