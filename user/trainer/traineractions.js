let a;
let choiceTrue = null;

const trainer = {
    get name() {
      return window.prompt('What is your name?')
    },
    choosePokemon: () => {
      a = window.prompt('Choose your Pokemon (Pikachu)').toLowerCase();
      switch (a) {
        case 'pikachu':
          choiceTrue = true;
          break;
        default:
          choiceTrue = false;
      };
    },
  };