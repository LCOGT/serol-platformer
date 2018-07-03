//Made using Dan Cox's YouTube tutorials
//https://www.youtube.com/watch?v=6U0Wy6wWK8M

//Made using Brian Greig's YouTube tutorials
//https://www.youtube.com/watch?v=mBEVHWUelWs
var counterVal = 0;
var lifeCount = 3;
var playState = {
  counter: null,
  lives: null,
  player: null,
  tetrominos: null,
  junkItems: null,
  create: function(){
      var self = this;
      var max = 960;
      var min = 20;
      //background setup
      game.stage.backgroundColor = '#D3D3D3';
      bgImage = game.add.tileSprite(0, 0, 1024, 640, 'background');
      game.world.setBounds(0, 0, 1024, 545);

      //add Counter
      self.counter = new Counter(counterVal);
      game.add.existing(self.counter);

      //add Lives
      self.lives = new Lives(3);
      game.add.existing(self.lives);
      game.add.text(11 * 64, 10, ("Lives: "), {
        font: "50px Courier",
        fill: "#ffffff",
        align: "center"
      });

      //add 1up
      self.battery = new Battery(350);
      game.add.existing(self.battery);
      game.physics.enable(self.battery, Phaser.Physics.ARCADE);
      self.battery.body.immovable = true;
      self.battery.fall();

      //add Serol object
      self.player = new Player(350, 350);
      game.add.existing(self.player);

      //activate physics for Serol
      game.physics.enable(self.player, Phaser.Physics.ARCADE);
      self.player.body.collideWorldBounds = true;
      self.player.body.gravity.y = 96;

      //tetrominos: sprite group setup
      self.tetrominos = game.add.group();

      self.tetrominos.add(Tetromino(Math.floor(Math.random() * (max - min + 1)) + min,
       Math.floor(Math.random() * 60)));
      self.tetrominos.add(Tetromino(Math.floor(Math.random() * (max - min + 1)) + min,
       Math.floor(Math.random() * 60)));
      self.tetrominos.add(Tetromino(Math.floor(Math.random() * (max - min + 1)) + min,
       Math.floor(Math.random() * 60)));

      self.tetrominos.forEach(function(tetromino, index){
        game.physics.enable(tetromino, Phaser.Physics.ARCADE);

        tetromino.body.immovable = true;
        tetromino.fall();
      });

      //junk sprite group setup
      self.junkItems = game.add.group();
      self.junkItems.add(Junk(Math.floor(Math.random() * (max - min + 1)) + min,
       Math.floor(Math.random() * 6)));
      self.junkItems.add(Junk(Math.floor(Math.random() * (max - min + 1)) + min,
       Math.floor(Math.random() * 6)));
      self.junkItems.add(Junk(Math.floor(Math.random() * (max - min + 1)) + min,
       Math.floor(Math.random() * 6)));

      self.junkItems.forEach(function(junk, index){
        game.physics.enable(junk, Phaser.Physics.ARCADE);

        junk.body.immovable = true;
        junk.fall();
      });
    },
    update: function(){
      var self = this;
      //initial state of Serol
      self.player.body.velocity.x = 0;

      self.player.movePlayer();

      //catching tetrominos
      game.physics.arcade.overlap(self.tetrominos, self.player, function(p,t){
        t.getCaught();
        counterVal = counterVal + 10;
        self.counter.updateScore(counterVal);
      });
      //catching junk
      game.physics.arcade.overlap(self.junkItems, self.player, function(p,j){
        j.getCaught();
        lifeCount--;
        self.lives.updateLife(lifeCount);
        /*
        TODO:
        make catching junk affect life count
        */
      });
    },
};

function Player(x, y) {

  //serol attributes
  var player = game.add.sprite(x, y, 'serol');

  player.animations.add('walkRight', [6, 7, 8, 9, 10, 11], 4, true);
  player.animations.add('walkLeft', [12, 13, 14, 15, 16, 17], 4, true);
  player.animations.add('static', [30, 31, 30, 31, 32, 33], 4, true);
  player.animations.add('staticRight', [18, 19, 20, 21], 4, true);
  player.animations.add('staticLeft', [24, 25, 26, 27], 4, true);

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
            facing = "left";
          }
      }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        player.body.velocity.x = hozMove;
        //animation here?

        if (facing !== "right"){
          facing = "right";
        }
      }

      if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && player.body.onFloor() && game.time.now > jumpTimer){
        player.body.velocity.y = vertMove;
        jumpTimer = game.time.now + 650;
        player.animations.stop('static');
      }

    //facing check
    if (facing == "left") {
      if (player.body.onFloor()){
        player.play('walkLeft');
      }else {
        player.play('staticLeft');
      }
    } else if (facing == "right") {
        //check if on the floor or not
        if (player.body.onFloor()){
          player.play('walkRight');
        }else {
          player.play('staticRight');
        }

    } else if (facing === 'front' && player.body.onFloor()){
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
  tetromino.scale.x = 4;
  tetromino.scale.y = 4;

  //tetromino methods
  tetromino.fall = function(){
    var self = this;
    tetromino.body.gravity.y = 50;
    self.body.immovable = false;
  }

  tetromino.getCaught = function(){
    var self = this;
    self.kill();
  }
  return tetromino;
};

//junk function here:
function Junk(x, sprite){
  var junk = game.add.sprite(x, 3 * 64, 'junk');
  junk.frame = sprite;

  //junk methods
  junk.fall = function(){
    var self = this;
    junk.body.gravity.y = 50;
    self.body.immovable = false;
  }

  junk.getCaught = function(){
    var self = this;
    self.kill();
  }
  return junk;
}
//counter function here:
function Counter(i){
  var counter = game.add.text(0, 0, ("Score: " + i), {
    font: "50px Courier",
    fill: "#ffffff",
    align: "center"
  });

  counter.x = game.camera.x;
  counter.y = game.camera.y;

  counter.updateScore = function(value){
    var self = this;
    self.setText("Score: " + value);
  }

  return counter;
}

//lives widget here
function Lives(i){
  //set position and frame
  var lives = game.add.sprite(14 * 64, -30, 'lives');
  lives.frame = i;
  lives.scale.x = 4;
  lives.scale.y = 4;

  //methods
  lives.updateLife = function(j){
    var self = this;
    self.frame = j;
  }

  return lives;
}

//battery 1up function here:
function Battery(x){
  var battery = game.add.sprite(x, 0, '1up');
  battery.frame = 0;

  battery.fall = function(){
    var self = this;
    battery.body.gravity.y = 50;
    self.body.immovable = false;
  }
  return battery;
}
