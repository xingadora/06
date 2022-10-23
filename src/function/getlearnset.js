import learnsets from '../data/learnsetslevel.json' assert {type: 'json'};

let names = [];
let moves = [];

learnsets.forEach(item => {
    let key = Object.keys(item);
    let value = Object.values(item);
    names.push(key[0]);
    moves.push(value[0][0]);
});

export function getLearnSet(pokemon) {
    let index = names.indexOf(pokemon);
    return moves[index];
}
