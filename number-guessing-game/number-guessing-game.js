const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

function start() {
  console.log(`Welcome to the Number Guessing Game!\nI'm thinking of a number between 1 and 100.\nYou have 5 chances to guess the correct number.\n`);
  console.log('Please select the difficulty level');
  console.log('1. Easy (10 chances)');
  console.log('2. Medium (5 chances)');
  console.log('3. Hard (3 chances)');

  function choiceLoop(countdown = 0) {
    return new Promise((resolve) => {
      rl.question('\nEnter your choice: ', (reply) => {
        switch (reply) {
          case '1':
            console.log('\nGreat! You have selected the Easy difficulty level.');
            resolve('easy');
            break;
          case '2':
            console.log('\nGreat! You have selected the Medium difficulty level.');
            resolve('medium');
            break;
          case '3':
            console.log('\nGreat! You have selected the Hard difficulty level.');
            resolve('hard');
            break;
          default:
            if (countdown < 4) choiceLoop(countdown + 1).then(resolve)
            else {
              resolve(`\n🌟 Oops! You've exceeded the number of attempts to select a difficulty level. Remember, every choice counts! Please try again next time. 🌟`);
              rl.pause();
            }
        }
      });
    });
  }

  return choiceLoop();
}

function goGame(randomNumber, countdown, difficulty) {
  const mode = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 5 : difficulty === 'hard' ? 3 : null;

  rl.question('\nEnter your guess: ', (reply) => {
    const guess = Number(reply);

    if (isNaN(Number(reply))) {
      console.log('\nThis is not a number!');
      easyGame(randomNumber, countdown);
    }

    if (guess === randomNumber) {
      console.log(`\nCongratulations! You guessed the correct number in ${(mode - countdown) + 1} attempts.`);
    } else {
      if (countdown > 1) {
        if (guess > randomNumber) {
          console.log(`Incorrect! The number is less than ${guess}.`);
          goGame(randomNumber, countdown - 1, difficulty);
        } else {
          console.log(`Incorrect! The number is gueater than ${guess}.`);
          goGame(randomNumber, countdown - 1, difficulty);
        }
      } else {
        console.log(`You've used up your ${mode} attempts, but don't be discouraged; the next opportunity is just a step away!`);
      }
    }
  })
}

function inGame(difficulty) {
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  console.log("\nLet's start the game!");

  switch (difficulty) {
    case 'easy':
      goGame(randomNumber, countdown = 10, difficulty); break;
    case 'medium':
      goGame(randomNumber, countdown = 5, difficulty); break;
    case 'hard':
      goGame(randomNumber, countdown = 3, difficulty); break;
  }
}

start().then(reply => inGame(reply)).catch(e => console.error(e));

rl.on('SIGINT', () => {
  console.log('Good game!');

  rl.pause();
});

