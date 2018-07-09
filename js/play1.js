//Made using Dan Cox's YouTube tutorials
//https://www.youtube.com/watch?v=6U0Wy6wWK8M

//Made using Brian Greig's YouTube tutorials
//https://www.youtube.com/watch?v=mBEVHWUelWs
var counterVal = 0;
var lifeCount = 3;
var endGame = false;
var pauseTime = 8;
var grav = 40;
var playState1 = {
  counter: null,
  lives: null,
  player: null,
  tetrominos: null,
  junkItems: null,
  batteries: null,
  create: function(){
      var self = this;
      //sounds setup
      collect_sfx = game.add.audio('collect_t');
      gain_life_sfx = game.add.audio('gain_life');
      game_over_sfx = game.add.audio('game_over', 1, false);
      jump_sfx = game.add.audio('jump');
      lose_life_sfx = game.add.audio('lose_life');
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


      //add Serol object
      self.player = new Player(350, 350);
      game.add.existing(self.player);

      //activate physics for Serol
      game.physics.enable(self.player, Phaser.Physics.ARCADE);
      self.player.body.collideWorldBounds = true;
      self.player.body.gravity.y = 3000;

      //sprite groups setup
      self.tetrominos = game.add.group();
      self.junkItems = game.add.group();
      self.batteries = game.add.group();

      generateTetrominos = game.time.events.loop(Phaser.Timer.SECOND * 1.5, function() {
        //keep adding tetrominos to the group
        self.tetrominos.add(Tetromino());
        grav = grav + 5;

      }, this);

      generateJunk = game.time.events.loop(Phaser.Timer.SECOND * 2, function() {
        //keep adding junk to the group
        game.time.events.add(Phaser.Timer.SECOND * pauseTime,
          function() {
            self.junkItems.add(Junk());
            if (pauseTime > 0.0005){
              pauseTime = parseFloat((pauseTime - 0.025).toFixed(4));
            }else {
              pauseTime = 0.0005
            }

          },this);
      }, this);

      generateBatteries = game.time.events.loop(Phaser.Timer.SECOND * 10, function() {
        //keep adding batteries to the group
        self.batteries.add(Battery());
      }, this);

    },
    update: function(){
      var self = this;
      //initial state of Serol
      self.player.body.velocity.x = 0;

      self.player.movePlayer();

      //catching tetrominos
      game.physics.arcade.overlap(self.tetrominos, self.player, function(p,t){
        t.getCaught();
        collect_sfx.play();
        counterVal = counterVal + 10;
        self.counter.updateScore(counterVal);
      });
      //catching junk
      game.physics.arcade.overlap(self.junkItems, self.player, function(p,j){
        j.getCaught();
        lose_life_sfx.play();
        lifeCount--;
        self.lives.updateLife(lifeCount);
      });

    //catching 1up
    game.physics.arcade.overlap(self.batteries, self.player, function(p,b){
      b.getCaught();
      gain_life_sfx.play();
      if (lifeCount >= 3){
        lifeCount = 3;
      }else{
        lifeCount++;
      }
      self.lives.updateLife(lifeCount);
    });

    if (lifeCount <= 0){
      lifeCount = 0;
      endGame = true;
    }

    //endgame sequence
    if (endGame === true){
      var gameOverScreen = game.add.sprite(game.world.centerX, game.world.centerY, 'gameOverScreen');
      gameOverScreen.anchor.setTo(0.5, 0.425);
      gameOverScreen.alpha = 0;

      game.time.events.remove(generateTetrominos);
      game.time.events.remove(generateJunk);
      game.time.events.remove(generateBatteries);

      self.player.animations.stop('staticBob');
      self.player.play('sleeping');
      self.player.body.velocity.x = 0;
      self.player.body.velocity.y = 0;
      self.lives.frame = 0;
      // game_over_sfx.play();

      game.time.events.add(Phaser.Timer.SECOND * 2,
        function(){
          game.add.tween(gameOverScreen).to( { alpha: 1 },
             2000,
             Phaser.Easing.Linear.None,
             true,
             0,
             1000,
             true);
        },
        this);
    }
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

  //serol methods

  //controls
  player.movePlayer = function() {
    var self = this;
    //control variables
    var facing = "front";
    var hozMove = 400;
    var vertMove = -1000;
    var jumpTimer = 0;

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
          player.body.velocity.x = -hozMove;

          if (facing !== "left"){
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
        jump_sfx.play();
        jumpTimer = game.time.now + 900;
        player.animations.play('static');
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
        player.play('staticBob');
    } else{
      player.play('static');
    }
  }
  return player;
};

//tetromino
function Tetromino() {
  //tetromino attributes
  var tetromino = game.add.sprite(game.world.randomX, -50, 'tetromino');
  tetromino.frame = Math.floor(Math.random() * 60);
  //scaling tetrominos
  tetromino.scale.x = 4;
  tetromino.scale.y = 4;
  //enabling physics for fall
  game.physics.enable(tetromino, Phaser.Physics.ARCADE);
  tetromino.body.gravity.y = grav;

  //tetromino methods
  tetromino.getCaught = function(){
    var self = this;
    self.kill();
  }
  return tetromino;
};

//junk function here:
function Junk(){
  var junk = game.add.sprite(game.world.randomX, -40, 'junk');
  junk.frame = Math.floor(Math.random() * 6);
  //enable physics
  game.physics.enable(junk, Phaser.Physics.ARCADE);
  junk.body.gravity.y = 50;

  //junk methods
  junk.getCaught = function(){
    var self = this;
    self.kill();
  }
  return junk;
}
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
}

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
}

//battery 1up function here:
function Battery(){
  var battery = game.add.sprite(game.world.randomX, -40, '1up');
  battery.frame = 0;
  game.physics.enable(battery, Phaser.Physics.ARCADE);
  battery.body.gravity.y = 50;

  battery.getCaught = function(){
    var self = this;
    self.kill();
  }
  return battery;
}
