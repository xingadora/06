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
        return document.getElementById('username');
        // something like the above... update ASAP
    };
    getPokemon() {
        // "what pokemon do you want to use?"
    };
};

const user1 = new userPlayer()
//console.log(user1.getName())
let test = document.getElementById('username')
console.log(test)

