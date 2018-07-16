class Trainer {
    constructor(id, name, pokemons = []) {
        this.id = id;
        this.name = name;
        this.pokemons = pokemons;
    }

    all() {
        return this.pokemons;
    }

    get(name) {
        for (const pokemon of this.pokemons) {
            if (pokemon.name === name) {
                return pokemon;
            }
        }
        return false;
    }

    add(pokemonObject) {
        this.pokemons.push(pokemonObject);
    }
}
