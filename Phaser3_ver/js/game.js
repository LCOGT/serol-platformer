// game.js
var config = {
  type: Phaser.AUTO,
  mode:Phaser.Scale.FIT,
  width: 1024,
  height: 640,
  backgroundColor: 0x000000,
  scene:[Boot, Title, Credits],
  pixelArt: true,
};

var game = new Phaser.Game(config);

