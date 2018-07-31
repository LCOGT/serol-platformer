/*
Level 2
*/
var xPositions = [100, 200, 300, 400, 500, 600, 700, 800];
var q = [];
var choices = ['tetromino', 'junk'];
var counterVal1 = 0;
var cursors;
var overlap;
var runspeed;
var bgSpeed;
var playState2 = {
  telescopes: null,
  playerLayer: null,
  // obstacles: null,
  lives: null,
  counter: null,
  create: function(){
    var self = this;
    //constants
    runspeed = -200;
    bgSpeed = 3;
    jump_sfx = game.add.audio('jump');
    //set up background
    skyBg = game.add.tileSprite(0, 0, 1024, 640, 'endless_sky');
    runnerBg = game.add.tileSprite(0, 0, 1024, 640, 'endless_bg');
    pipeImage = game.add.sprite(10, 520, 'pipe')
    game.world.setBounds(0, 0, 1024, 520);
    cursors = game.input.keyboard.createCursorKeys();
    text = game.add.text(500, 500, 'Overlapping: false', { fill: '#ffffff' });

    //initial queue
    for(var i in xPositions) {
      var sprite = new QueueSprite(xPositions[i], 585, (choose(choices)));
      q.push(sprite);
    }
    //timer setup
    self.startTime = new Date();
		self.totalTime = 120;
		self.timeElapsed = 0;

		self.createTimer();

		self.gameTimer = game.time.events.loop(100, function(){
				self.updateTimer();
		    });

    //add Counter
    self.counter = new Counter(counterVal1);
    game.add.existing(self.counter);

    self.lives = new Lives(3);
    game.add.existing(self.lives);

    //add sprite layers
    self.telescopes = game.add.group();
    self.telescopes.enableBody = true;
    self.playerLayer = game.add.group();
    self.playerLayer.enableBody = true;
    // self.obstacles = game.add.group();
    // self.rivers = game.add.group();

    generateTelescopes = game.time.events.loop(Phaser.Timer.SECOND * 5, function() {
      self.telescopes.add(Telescope(choose([0,4,8]), runspeed));
      runspeed = runspeed * 1.05;
      bgSpeed = bgSpeed * 1.05;
    }, this);

    //add Serol

    self.player = new Player1(100, 350);
    self.playerLayer.create(self.player);
    //activate physics for Serol
    game.physics.enable(self.player, Phaser.Physics.ARCADE);
    self.player.body.collideWorldBounds = true;
    self.player.body.gravity.y = 3000;

    // generateRivers = game.time.events.loop(Phaser.Timer.SECOND * 14, function() {
    //   self.rivers.create(River());
    // }, this);

    // generateObstacles = game.time.events.loop(Phaser.Timer.SECOND * 3, function() {
    //   //keep adding tetrominos to the group
    //   self.obstacles.create(Obstacle());
    // }, this);

    //dequeueing using keyup
    game.input.keyboard.onUpCallback = function( e ){
      //down key logic
      if(e.keyCode == Phaser.Keyboard.SPACEBAR){
        console.log(q.length);
        var removed = q.shift();
        console.log(removed.key);
        if ((removed.key==='tetromino') && (overlap == true)){
              console.log("tetromino sent");
              counterVal1 += 10;
              self.counter.updateScore(counterVal1);
        } else if ((removed.key==='junk') && (overlap == true)){
              console.log("junk sent (oh no)");
              counterVal1 -= 5;
              self.counter.updateScore(counterVal1);
        }
        if ((removed.key==='tetromino') && (overlap == false)){
          console.log("tetromino lost (oh no)");
          // counterVal1--;
          self.counter.updateScore(counterVal1);
        } else if ((removed.key==='junk') && (overlap == false)){
          console.log("junk thrown out");
          // counterVal1++;
          self.counter.updateScore(counterVal1);
        }
        removed.destroy();
        q.push(new QueueSprite(xPositions[7], 585, (choose(choices))));
        console.log(q,xPositions);
        updatePositions(q,xPositions);
      }
    };
  },
  createTimer: function(){

    var self = this;
  	self.timeLabel = self.game.add.text(game.world.centerX, 20,
			"00:00",
			{font: "40px 'Press Start 2P'", fill: "#ffffff"});
    self.timeLabel.anchor.setTo(0.5, 0);
    self.timeLabel.align = 'center';

	},
	updateTimer: function(){

    var self = this;

    var currentTime = new Date();
    var timeDifference = self.startTime.getTime() - currentTime.getTime();

    //Time elapsed in seconds
    self.timeElapsed = Math.abs(timeDifference / 1000);

    //Time remaining in seconds
    var timeRemaining = self.totalTime - self.timeElapsed;

    //Convert seconds into minutes and seconds
    var minutes = Math.floor(timeRemaining / 60);
    var seconds = Math.floor(timeRemaining) - (60 * minutes);

    //Display minutes, add a 0 to the start if less than 10
    var result = (minutes < 10) ? "0" + minutes : minutes;

    //Display seconds, add a 0 to the start if less than 10
    result += (seconds < 10) ? ":0" + seconds : ":" + seconds;

    self.timeLabel.text = result;

	},

  update: function(){
    var self = this;
    overlap = false;

    if(self.timeElapsed >= self.totalTime){
		game.state.start('title', true, false);
		}

    text.text = 'Overlapping: false';
    skyBg.tilePosition.x -= 0.5;
    runnerBg.tilePosition.x -= bgSpeed;
    self.player.body.velocity.x = 0;
    self.player.movePlayer();
    //check overlap
    game.physics.arcade.overlap(self.telescopes, self.player, function(){
      text.text = 'Overlapping: true';
      overlap = true;
    });
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
      if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && player.body.onFloor() && game.time.now > jumpTimer){
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

function Obstacle(){
  var obstacle = game.add.sprite(1000, 450, 'obstacle');
  obstacle.frame = Math.floor(Math.random() * 5);
  //enable physics
  game.physics.enable(obstacle, Phaser.Physics.ARCADE);
  obstacle.body.velocity.x = -180;

  //methods
  obstacle.goOffScreen = function(){
    var self = this;
    self.kill();
  }
  return obstacle;
}

function Telescope(frame, v){
  var telescope = game.add.sprite(1500, 520, 'telescope');
  telescope.frame = frame;
  telescope.anchor.setTo(0.5, 1);
  telescope.scale.setTo(1.7, 1.7);

  game.physics.enable(telescope, Phaser.Physics.ARCADE);
  telescope.body.velocity.x = v;
  return telescope;
}

function River(){
  var river = game.add.sprite(1000, 482, 'river');
  river.animations.add('flow', [0, 1, 2], 4, true);

  river.animations.play('flow');
  game.physics.enable(river, Phaser.Physics.ARCADE);
  river.body.velocity.x = -180;
  return river;
}


function updatePositions(elementArray, posArray){

  for (var i=0;elementArray.length;i++){
    console.log(i)
    elementArray[i].position.x = posArray[i];
  }
}
//queue sprite object
function QueueSprite(x, y, spriteRef){
  var queueSprite = game.add.sprite(x, y, spriteRef);
  queueSprite.anchor.setTo(0.5, 0.5);
  if (spriteRef == 'tetromino'){
    queueSprite.frame = Math.floor(Math.random() * 60);
  }else if(spriteRef == 'junk'){
    queueSprite.frame = Math.floor(Math.random() * 6);
  }
  return queueSprite;
}

//other useful functions
function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}
function onOverlap(spriteA, spriteB){
  var self = this;
  spriteA.kill();
  self.text.text = 'Overlapping: true';
}
