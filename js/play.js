//Made using Dan Cox's YouTube tutorials
//https://www.youtube.com/watch?v=6U0Wy6wWK8M

//Made using Brian Greig's YouTube tutorials
//https://www.youtube.com/watch?v=mBEVHWUelWs

var playState = {
  player: null,
  tetrominos: null,
  junk: null,
  create: function(){
      var self = this;
      //background setup
      game.stage.backgroundColor = '#D3D3D3';
      bgImage = game.add.tileSprite(0, 0, 1024, 640, 'background');

      //add Serol object
      self.player = new Player(350, 350);
      game.add.existing(self.player);

      //activate physics for Serol
      game.physics.enable(self.player, Phaser.Physics.ARCADE);
      self.player.body.collideWorldBounds = true;
      self.player.body.gravity.y = 96;

      //tetrominos: sprite group setup
      self.tetrominos = game.add.group();
      self.tetrominos.add(Tetromino(5 * 64, 0));
      self.tetrominos.add(Tetromino(7 * 64, 15));
      self.tetrominos.add(Tetromino(3 * 64, 30));

      self.tetrominos.forEach(function(tetromino, index){
        game.physics.enable(tetromino, Phaser.Physics.ARCADE);
        tetromino.body.gravity.y = 50;
      });
    },
    update: function(){
      var self = this;

      //initial state of Serol
      self.player.body.velocity.x = 0;


      self.player.movePlayer();
      game.physics.arcade.overlap(self.tetrominos, self.player, function(){
        self.getCollectible();
      });
    },

    getCollectible: function() {
      var self = this;
      self.tetrominos.destroy();
    }
};
//7 * 64, 4 * 64 for serol
function Player(x, y) {

  //serol attributes
  var player = game.add.sprite(x, y, 'serol');
  // player.frame = 1;
  player.animations.add('turnRight', [1, 2], 4);
  player.animations.add('walkRight', [6, 7, 8, 9, 10, 11], 4, true);
  player.animations.add('turnLeft', [1, 3], 4);
  player.animations.add('walkLeft', [12, 13, 14, 15, 16, 17], 4, true);
  player.animations.add('static', [30, 31, 30, 31, 32, 33], 4, true);



  //serol methods

  //controls
  player.movePlayer = function() {
    var self = this;
    //control variables
    var facing = "front";
    var hozMove = 160;
    var vertMove = -120;
    var jumpTimer = 0;

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
          player.body.velocity.x = -hozMove;

          if (facing !== "left"){
            //play turn left animations
            player.animations.play('turnLeft');
            facing = "left";
          }
      }

      else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
          player.body.velocity.x = hozMove;
          //animation here?

          if (facing !== "right"){
            player.animations.play('turnRight');
            facing = "right";
          }
      }

      if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && player.body.onFloor() && game.time.now > jumpTimer){
        player.body.velocity.y = vertMove;
        jumpTimer = game.time.now + 650;
        player.animations.stop('static');
      }

    //facing check
    if (facing === "left") {
        // player.frame = 3;
        player.play('walkLeft');
    } else if (facing === "right") {
        // player.frame = 2;
        player.play('walkRight');
    } else if (facing === 'front' && player.body.onFloor()){
        // player.frame = 1;
        player.play('static');
    }else {
      player.frame = 1;
    }
  }

  return player;
};

//tetromino
function Tetromino(x, sprite) {
  //tetromino attributes
  var tetromino = game.add.sprite(x, 3 * 64, 'tetromino');
  tetromino.frame = sprite;
  //scaling tetrominos
  tetromino.scale.x = 2;
  tetromino.scale.y = 2;

  //tetromino methods
  // tetromino.appear = fuction(){
  //
  // }
  return tetromino;
};

//junk function here:
