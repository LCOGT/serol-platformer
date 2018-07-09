/*
Level 2
TODO 1:
add endless scrolling sprite which scrolls with the cursor _keys
TODO 2:
Add Serol sprite and adjust velocity
*/

var playState2 = {
  player: null,
  create: function(){
    var self = this;
    jump_sfx = game.add.audio('jump');
    //set up background
    runnerBg = game.add.tileSprite(0, 0, 1024, 640, 'endless_bg');
    game.world.setBounds(0, 0, 1024, 545);
    // runnerBg.scale.y = 4.5;
    // runnerBg.scale.x = 4;
    //create cursor key controls
    cursors = game.input.keyboard.createCursorKeys();
    //add Serol
    self.player = new Player(100, 350);
    game.add.existing(self.player);
    //activate physics for Serol
    game.physics.enable(self.player, Phaser.Physics.ARCADE);
    self.player.body.collideWorldBounds = true;
    self.player.body.gravity.y = 3000;
  },

  update: function(){
    var self = this;

    runnerBg.tilePosition.x -= 3;
    self.player.body.velocity.x = 0;
    self.player.movePlayer();

  },


};

function Player(x, y) {

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
      }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        player.body.velocity.x = hozMove;
        player.play('walkRight');
      }

      if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && player.body.onFloor() && game.time.now > jumpTimer){
        player.body.velocity.y = vertMove;
        jump_sfx.play();
        jumpTimer = game.time.now + 900;
        player.animations.play('staticRight');
      } else {
        player.animations.play('walkRight');
      }
  };



  return player;
};
