class user {
    constructor(name, energy, pokemon) {
        this.name = name;
        this.energy = 15;
        this.pokemon = pokemon;
    }

    getName() { };
    getPokemon() { };
};

class userPlayer extends user {
    constructor() {
        super();
    }

    getName() {
        let input = document.getElementById('username').value;
        if (input === '') {
            showInvalid();
        } else {
            this.name = input;
            document.getElementById('whatPokemonParsed').innerHTML = this.name;
            hideInvalid()
            showNext();
        }
    }
    getPokemon() {

    };
};

const user1 = new userPlayer()