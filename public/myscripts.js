

add_image = ""

function processPokemonResponse(data) {
    add_image += `<div class="pokemon_image">`
    add_image += `<a href="/profile/${data.id}">`
    add_image += `<img src="${data.sprites.other["official-artwork"].front_default}">`
    add_image += `</a>`
    add_image += `<h2 class="pokemon_name"> ${data.name} </h2>`
    add_image += `</div>`
}

async function loadrandomImages () {
    for (i = 0; i < 3; i++) { // add 3 rows of images
        add_image += `<div class="image_row">`
        for (j = 0; j < 3; j++) { // add 3 images per row
            randInt = Math.floor(Math.random() * (898 - 1)) + 1

            await $.ajax({
                type: "GET",
                url: `https://pokeapi.co/api/v2/pokemon/${randInt}`,
                success: processPokemonResponse
            })

        }
        add_image += `</div>`
    }
    $("main").html(add_image);
}

function setup () {
    // add event handling functions here.
    loadrandomImages();
}

$(document).ready(setup);