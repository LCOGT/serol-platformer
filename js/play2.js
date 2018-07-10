/*
Level 2
*/

var playState2 = {
  player: null,
  lives: null,
  counter: null,
  create: function(){
    var self = this;
    jump_sfx = game.add.audio('jump');
    //set up background
    skyBg = game.add.tileSprite(0, 0, 1024, 640, 'endless_sky');
    runnerBg = game.add.tileSprite(0, 0, 1024, 640, 'endless_bg');
    game.world.setBounds(0, 0, 1024, 545);

    //add Counter
    self.counter = new Counter(counterVal);
    game.add.existing(self.counter);

    self.lives = new Lives(3);
    game.add.existing(self.lives);

    //add Serol
    self.player = new Player1(100, 350);
    game.add.existing(self.player);
    //activate physics for Serol
    game.physics.enable(self.player, Phaser.Physics.ARCADE);
    self.player.body.collideWorldBounds = true;
    self.player.body.gravity.y = 3000;
  },

  update: function(){
    var self = this;

    skyBg.tilePosition.x -= 0.5;
    runnerBg.tilePosition.x -= 3;
    self.player.body.velocity.x = 0;
    self.player.movePlayer();

  },


};

function Player1(x, y) {

  //serol attributes
  var player = game.add.sprite(x, y, 'serol');

  player.animations.add('walkRight', [6, 7, 8, 9, 10, 11], 6, true);
  player.animations.add('walkLeft', [12, 13, 14, 15, 16, 17], 6, true);
  player.animations.add('staticBob', [30, 31, 30, 31, 32, 33], 4, true);
  player.animations.add('static', [1, 1], 4, true);
  player.animations.add('staticRight', [18, 19, 20, 21], 4, true);
  player.animations.add('staticLeft', [24, 25, 26, 27], 4, true);
  player.animations.add('sleeping', [28, 29, 28, 29], 2, true);

  player.movePlayer = function(){
    var hozMove = 400;
    var vertMove = -1000;
    var jumpTimer = 0;
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
          player.body.velocity.x = -hozMove;
          player.play('walkRight');
      } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        player.body.velocity.x = hozMove;
        player.play('walkRight');
      }
      if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && player.body.onFloor() && game.time.now > jumpTimer){
        player.body.velocity.y = vertMove;
        jump_sfx.play();
        jumpTimer = game.time.now + 900;
        player.animations.stop('walkRight');
        player.animations.play('staticRight');
      } else {
        player.animations.play('walkRight');
      }
  };



  return player;
};

//counter function here:
function Counter(i){
  var counter = game.add.text(0, 0, ("Score: " + i), {
    font: "32px 'Press Start 2P'",
    fill: "#ffffff",
    align: "center"
  });

  counter.x = game.camera.x+10;
  counter.y = game.camera.y+20;

  counter.updateScore = function(value){
    var self = this;
    self.setText("Score: " + value);
  }

  return counter;
};

//lives widget here
function Lives(i){
  //set position and frame
  var lives = game.add.sprite(14 * 64, -30, 'lives');
  lives.frame = i;
  lives.scale.x = 4;
  lives.scale.y = 4;

  //text
  game.add.text(11 * 64, 20, ("Lives: "), {
    font: "32px 'Press Start 2P'",
    fill: "#ffffff",
    align: "center"
  });

  //methods
  lives.updateLife = function(j){
    var self = this;
    self.frame = j;
  }

  return lives;
};
