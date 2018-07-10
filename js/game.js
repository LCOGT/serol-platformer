//game.js

var game = new Phaser.Game(
  1024, 640,
  Phaser.AUTO,
  'SerolGame',
  null,
  false,
  false,
  null);

//add each game state
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('title', titleState);
game.state.add('menu', mainMenu);
game.state.add('levelone', playState1);
game.state.add('leveltwo', playState2);

//call the boot state
game.state.start('boot');
