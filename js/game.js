//game.js

var game = new Phaser.Game(
  800, 500,
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
game.state.add('play', playState);

//call the boot state
game.state.start('boot');
