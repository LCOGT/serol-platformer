// //game.js

// var game = new Phaser.Game(
//   1024, 640,
//   Phaser.AUTO,
//   'SerolGame',
//   null,
//   false,
//   false,
//   null);

// //add each game state
// game.state.add('boot', bootState);
// game.state.add('load', loadState);
// game.state.add('title', titleState);
// game.state.add('credits', credits);
// game.state.add('instructions1', instructions1);
// game.state.add('instructions2', instructions2);
// game.state.add('menu', mainMenu);
// game.state.add('gameOver', gameOver);
// game.state.add('levelone', playState1);
// game.state.add('leveltwo', playState2);
// game.state.add('hiScores', hiScores);
// game.state.add('level1Complete', level1Complete);
// game.state.add('level2Complete', level2Complete);

// //call the boot state
// game.state.start('boot');

// game.js
  var config = {
    width: 1024,
    height: 640,
    backgroundColor: 0x000000,
    scene:[Boot, Title]
  }
  var game = new Phaser.Game(config);