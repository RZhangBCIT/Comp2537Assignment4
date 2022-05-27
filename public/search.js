region_global = ""
habitat_global = ""
type_global = ""
generation_global = ""

function processPokemonResponse(data) {
    add_image += `<div class="pokemon_image">`
    add_image += `<a href="/profile/${data.id}">`
    add_image += `<img class="pokemonPic" src="${data.sprites.other["official-artwork"].front_default}">`
    add_image += `</a>`
    add_image += `<h2 class="pokemon_name"> ${data.name} </h2>`
    add_image += `</div>`
}

function processType(data) {
    add_image = ""
    for (i = 0; i < data.types.length; i++) {
        if (data.types[i].type.name === type_global) {
            add_image += `<div class="pokemon_image">`
            add_image += `<a href="/profile/${data.id}">`
            add_image += `<img class="pokemonPic" src="${data.sprites.other["official-artwork"].front_default}"`
            add_image += `</a>`
            add_image += `<h2 class="pokemon_name"> ${data.name} </h2>`
            add_image += `</div>`
            // $("main").append("<p>"+ data.id + "</p>");
        }
    }
    $("main").append(add_image);
}

function displayType(type_) {
    $("main").empty()
    type_global = type_
    for(i = 1; i < 898; i++) {
        $.ajax({
            type: "get",
            url: `https://pokeapi.co/api/v2/pokemon/${i}`,
            success: processType
        })
    }
}

async function processHabitat(data) {
    add_image = ""
    if (data.habitat !== null) {
        if (data.habitat.name == habitat_global) {
            // $("main").append("<p>"+ data.id + "</p>");
            pokemon_id = data.id
            await $.ajax({
                gen_process: "GET",
                url: `https://pokeapi.co/api/v2/pokemon/${pokemon_id}`,
                success: processPokemonResponse
            })
        }
    }
    $("main").append(add_image)

}

function displayHabitat(habitat_) {
    $("main").empty()
    habitat_global = habitat_
    for(i = 1; i < 898; i++) {
        $.ajax({
            habitat: "get",
            url: `https://pokeapi.co/api/v2/pokemon-species/${i}`,
            success: processHabitat
        })
    }
}

async function processRegion(data) {
    add_image = ""
    if (region_global == "Kanto") {
        generation_global = "generation-i"
    } else if (region_global == "Johto") {
        generation_global = "generation-ii"
    } else if (region_global == "Hoenn") {
        generation_global = "generation-iii"
    } else if (region_global == "Sinnoh") {
        generation_global = "generation-iv"
    } else if (region_global == "Unova") {
        generation_global = "generation-v"
    } else if (region_global == "Kalos") {
        generation_global = "generation-vi"
    } else if (region_global == "Alola") {
        generation_global = "generation-vii"
    } else if (region_global == "Galar") {
        generation_global = "generation-viii"
    }
    if (data.generation.name == generation_global) {
        pokemon_id = data.id
        await $.ajax({
            gen_process: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${pokemon_id}`,
            success: processPokemonResponse
        })
    }
    $("main").append(add_image)
    // $("main").append("<p>"+ data.id + "</p>");
}

function displayRegion(region_) {
    $("main").empty()
    region_global = region_
    for(i = 1; i < 898; i++) {
        $.ajax({
            region: "get",
            url: `https://pokeapi.co/api/v2/pokemon-species/${i}`,
            success: processRegion
        })
    }
}

async function processGeneration(data) {
    pokemon_id = ""
    add_image = ""
    if (data.generation.name == generation_global) {
        pokemon_id = data.id
        await $.ajax({
            gen_process: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${pokemon_id}`,
            success: processPokemonResponse
        })
        // $("main").append("<p>"+ data.id + "</p>");
    }
    $("main").append(add_image)
}

function displayGeneration(gen_) {
    $("main").empty()
    generation_global = gen_
    for(i = 1; i < 898; i++) {
        $.ajax({
            generation: "get",
            url: `https://pokeapi.co/api/v2/pokemon-species/${i}`,
            success: processGeneration
        })
    }
}

function addToTimeline(data) {
    $.ajax({
        url: "http://localhost1989/viewedPokemon",
        type: "put",
        data: {
            pokemon: `${data.name}`
        }
    })
}

function viewedTimeline(data) {
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${req.params.id}`,
        type: "get",
        success: addToTimeline
    })
}

function setup() {

    $("#pokemon_type").change(() => {
        pokemon_type = $("#pokemon_type option:selected").val();
        displayType($("#pokemon_type option:selected").val());
    })

    $("#region").change(() => {
        pokemon_region = $("#region option:selected").val();
        displayRegion($("#region option:selected").val())
    })

    $("#generation").change(() => {
        pokemon_generation = $("#generation option:selected").val();
        displayGeneration($("#generation option:selected").val())
    })

    $("#habitat").change(() => {
        pokemon_habitat = $("#habitat option:selected").val();
        displayHabitat($("#habitat option:selected").val())
    })

    $("body").on("click", ".pokemonPic", viewedTimeline(data))
    $("body").on("click", ".pokemon_name", viewedTimeline(data))
}

$(document).ready(setup)