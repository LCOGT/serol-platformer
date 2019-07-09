// game.js
var gameSettings = {
  playerXSpeed: 400,
  playerYSpeed: 1000
}

var config = {
  type: Phaser.AUTO,
  mode:Phaser.Scale.FIT,
  width: 1024,
  height: 640,
  backgroundColor: 0x000000,
  pixelArt: true,
  scene:[
    Boot, 
    Title, 
    Credits,
    Instructions1,
    Level1,
    Instructions2,
    Level2],
  physics: {
    default: 'arcade',
    arcade: {
        gravity: {y: 0},
        debug: true
    }
  },
  input: {
    gamepad: true
  }

};

var game = new Phaser.Game(config);

