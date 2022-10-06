let a, choiceTrue, chosenPokemon, nameResponse;

const trainer = {
  get name() {
    return window.prompt('What is your name?');
  },
  choosePokemon: () => {
    a = window.prompt(`Hi there, ${trainer.name}, choose your Pokemon (Pikachu)`);
    if (a === null) {
      return;
    };
    switch (a.toLowerCase()) {
      case 'pikachu':
        choiceTrue = true;
        break;
      default:
        choiceTrue = false;
    };
    if (choiceTrue) {
      chosenPokemon = a.toLowerCase();
    };
  },
};