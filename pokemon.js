//Where everything is happening.
window.addEventListener('load', () => {

// Constructer for class Pokemon.

class Pokemon {
    constructor(id, name, image, height, weight, hp, attack, defense, abilities, type) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.height = height;
        this.weight = weight;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.abilities = abilities;
        this.type = type;
    }
}

//Function to update  pokemoncharacteristic.
updateCharacteristic = (characteristicId, value) => {
    document.getElementById(characteristicId).getElementsByTagName('span')[0].innerText = value;
}

//Function to display a pokemon.
displayPokemon = (pokemonToDisplay) => {
    document.getElementById('pokemon_id').innerText = pokemonToDisplay.name + ' | #' + pokemonToDisplay.id;

//Helps to change pokemon images
    const imgPlaceholder = document.getElementById('poke_image_place');
    const existingImages = imgPlaceholder.getElementsByTagName('img');
    if (existingImages.length === 0) {
        const image = document.createElement("img");
        image.setAttribute("src", pokemonToDisplay.image);
        imgPlaceholder.appendChild(image);
    } else {
        existingImages[0].setAttribute("src", pokemonToDisplay.image);
    }

//Function to fill charactiristic holders.
    updateCharacteristic('height', pokemonToDisplay.height);
    updateCharacteristic('weight', pokemonToDisplay.weight);
    updateCharacteristic('hp', pokemonToDisplay.hp);
    updateCharacteristic('attack', pokemonToDisplay.attack);
    updateCharacteristic('defense', pokemonToDisplay.defense);
    updateCharacteristic('abilities', pokemonToDisplay.abilities.join(', '));
    updateCharacteristic('type', pokemonToDisplay.type.join(', '));
//Remove hiding. Adding remove.
    existingImages[0].classList.remove('hide');
    document.getElementById('loading').classList.add('remove');
}

//Function to search throught api.
 search = (search_value) => {
//Search value is the input which is name of pokemon.
    const search_by_name_link = 'https://pokeapi.co/api/v2/pokemon/' + search_value + '/';
//Removing loading default gif.
    document.getElementById('loading').classList.remove('remove');
//
    const existingImages = document.getElementById('poke_image_place').getElementsByTagName('img');
    if (existingImages.length > 0) {
        existingImages[0].classList.add('hide');
    }

    axios.get(search_by_name_link).then((pokemonReponse) => {
//Axios request and assigning results.
        const data = pokemonReponse.data;
        //console.log(data);
        const id = data.id;
        const name = data.name;
        const height = data.height/10;
        const weight = data.weight/10;
        const hp = data.stats[5].base_stat;
        const attack = data.stats[4].base_stat;
        const defense = data.stats[3].base_stat;

        const abilities_array = [];
        for (let i = 0; i < data.abilities.length; i++) {
          abilities_array.push(data.abilities[i].ability.name);
        }

        const types_array = [];
        for (let j = 0; j < data.types.length; j++) {
            types_array.push(data.types[j].type.name);
        }
//Axios request for image
        const image_api = data.forms[0].url;
        axios.get(image_api).then((imageResponse) => {

            const data_img = imageResponse.data;
            image_link = data_img.sprites.front_default;

//Creating instance of pokemon.
            const myPokemon = new Pokemon(
                id,
                name,
                image_link,
                height,
                weight,
                hp,
                attack,
                defense,
                abilities_array,
                types_array,
            );
//Showing this pokemon.
            displayPokemon(myPokemon);
        })    
    });
}



// Find value from search to pass into api.
    document.getElementById("button").addEventListener("click", function(event) {
        const search_value = document.getElementById('name_of_pokemon').value.toLowerCase();
        search(search_value);
        document.getElementById('name_of_pokemon').getElementsByTagName('input').value = '';
    }); 


// If value is bee.
    document.getElementById("bee2").addEventListener("click", function(event) {
        search('combee');
    }); 

// If value is pineapple.
    document.getElementById("pineapple2").addEventListener("click", function(event) {
        search('exeggutor');
    }); 

 // If value is magnet.
    document.getElementById("magnet2").addEventListener("click", function(event) {
        search('magneton');
    });    


})


