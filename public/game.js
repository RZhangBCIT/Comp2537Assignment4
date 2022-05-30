var cardsflipped = 0;
var gamesWon = 0;
var matchedSets = 0;
var firstCard = undefined;
var secondCard = undefined;
var flipped = false;



async function flip() {
    // if (cardsflipped < 2) {
        $(this).toggleClass("flip");
        // cardsflipped++;
        if (!flipped) {
            firstCard = $(this).find('.front')[0];
            $(this).toggleClass("noClick")
            flipped = true;
        } else {
            secondCard = $(this).find('.front')[0];
            flipped = false;
            $("#game-grid").toggleClass("noClick")

            if (
                // $(`#${firstCard.id}`).attr("src") == $(`#${secondCard.id}`).attr("src")
                firstCard.src == secondCard.src && firstCard.id !== secondCard.id
            ) {
                // console.log("These cards match!");
                $(`#${firstCard.id}`).parent().off("click")
                $(`#${secondCard.id}`).parent().off("click")
                firstCard = undefined;
                secondCard = undefined;
                matchedSets++;
                $("#game-grid").removeClass("noClick")
                // console.log(matchedSets)
            } else {
                // console.log("These cards do not match!")
                // console.log(firstCard, secondCard)
                $(`#${firstCard.id}`).parent().removeClass("noClick")
                setTimeout(flipback => {
                    $(`#${firstCard.id}`).parent().removeClass("flip")
                    $(`#${secondCard.id}`).parent().removeClass("flip")
                    $("#game-grid").removeClass("noClick")
                }, 1000)
            }
        }
    // }

    if (matchedSets >= 6) {
        console.log("Congratulations, you win!")
        window.location.href="/winner.html"
    }
}

function setup() {
    $(".card").click(flip)
}

$(document).ready(setup);