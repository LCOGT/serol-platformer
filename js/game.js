// game.js
var gameSettings = {
  playerXSpeed: 400,
  playerYSpeed: 1000
}

var config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "SerolGame",
    width: 1024,
    height: 640
  },
  backgroundColor: 0x000000,
  pixelArt: true,
  scene:[
    Boot, 
    Title,
    LevelSelect, 
    Credits,
    Instructions1,
    Level1,
    Level1Complete,
    Instructions2,
    Level2,
    Level2Complete,
    Instructions3,
    Level3,
    Level3Complete,
    GameOver,
    EnterHiScores,
    DisplayHiScores
    
  ],
  physics: {
    default: 'arcade',
    arcade: {
        gravity: {y: 0},
        debug: false
    }
  },
  input: {
    gamepad: true
  }

};

var game = new Phaser.Game(config);

