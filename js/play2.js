/*
Level 2
*/
var xPositions = [100, 200, 300, 400, 500, 600, 700, 800];
var q = [];
var choices = ['tetromino', 'junk'];
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
    counterVal1 = 0;
    runspeed = -200;
    jump_sfx = game.add.audio('jump');
    lvl2bgm = game.add.audio('leveltwo_bgm');
    lvl2bgm.play();
    //set up background
    skyBg = game.add.tileSprite(0, 0, 1024, 640, 'endless_sky');

    runnerBg = game.add.tileSprite(0, 0, 1024, 640, 'endless_bg');
    pipeImage = game.add.sprite(10, 520, 'pipe')
    game.world.setBounds(0, 0, 1024, 520);
    cursors = game.input.keyboard.createCursorKeys();
    //sounds
    gain_life_sfx = game.add.audio('gain_life');
    lose_life_sfx = game.add.audio('lose_life');
    //initial queue
    for(var i in xPositions) {
      var sprite = new QueueSprite(xPositions[i], 585, (choose(choices)));
      q.push(sprite);
    }
    //timer setup
    self.startTime = new Date();
		self.totalTime = 20;
		self.timeElapsed = 0;

		self.createTimer();

		self.gameTimer = game.time.events.loop(100, function(){
				self.updateTimer();
		    });

    //add Counter
    self.counter = new Counter(counterVal);
    game.add.existing(self.counter);

    self.lives = new Lives(3);
    game.add.existing(self.lives);
    self.lives.updateLife(lifeCount);

    //add sprite layers
    self.telescopes = game.add.group();
    self.telescopes.enableBody = true;
    self.playerLayer = game.add.group();
    self.playerLayer.enableBody = true;
    self.obstacles = game.add.group();
    self.rivers = game.add.group();
    self.batteries = game.add.group();

    //add Serol
    self.player = new Player1(100, 350);
    self.playerLayer.create(self.player);
    //activate physics for Serol
    game.physics.enable(self.player, Phaser.Physics.ARCADE);
    self.player.body.collideWorldBounds = true;
    self.player.body.gravity.y = 3000;

    generateTelescopes = game.time.events.loop(Phaser.Timer.SECOND * 5, function() {
      self.telescopes.add(Telescope(choose([0,4,8]), runspeed));
      runspeed = runspeed * 1.05;
    }, this);

    generateBatteries = game.time.events.loop(Phaser.Timer.SECOND * 20, function() {
      self.batteries.add(Battery(2));
    }, this);

    generateRivers = game.time.events.loop(Phaser.Timer.SECOND * 4, function() {
      self.rivers.add(River(runspeed));
    }, this);

    generateObstacles = game.time.events.loop(Phaser.Timer.SECOND * 3, function() {
      //keep adding tetrominos to the group
      self.obstacles.add(Obstacle(runspeed));
    }, this);

    //dequeueing using keyup
    game.input.keyboard.onUpCallback = function( e ){
      //down key logic
      if(e.keyCode == Phaser.Keyboard.SPACEBAR){
        console.log(q.length);
        var removed = q.shift();
        console.log(removed.key);
        if ((removed.key==='tetromino') && (overlap == true)){
              console.log("tetromino sent");
              counterVal += 10;
              self.counter.updateScore(counterVal);
        } else if ((removed.key==='junk') && (overlap == true)){
              console.log("junk sent (oh no)");
              counterVal -= 5;
              self.counter.updateScore(counterVal);
        }
        if ((removed.key==='tetromino') && (overlap == false)){
          console.log("tetromino lost (oh no)");
          // counterVal1--;
          self.counter.updateScore(counterVal1);
        } else if ((removed.key==='junk') && (overlap == false)){
          console.log("junk thrown out");
          // counterVal1++;
          self.counter.updateScore(counterVal);
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
    var whence = game.time.now;
    overlap = false;

    if(self.timeElapsed >= self.totalTime){
      lvl2bgm.stop();
		  game.state.start('level2Complete', true, false);
		}

    skyBg.autoScroll(-100, 0);
    runnerBg.autoScroll(runspeed, 0);;
    self.player.body.velocity.x = 0;
    self.player.movePlayer();

    //check life count
    if (lifeCount <= 0){
      lifeCount = 0;
      endGame = true;
    }
    //check score
    if (counterVal1 < 0){
      lifeCount --;
      self.lives.updateLife(lifeCount);
      counterVal1 = 0;
      self.counter.updateScore(counterVal);
    }

    //check overlap

    game.physics.arcade.overlap(self.player, self.telescopes, function(player,telescope){
      if (telescope.frame == 0){
        telescope.frame = 2;
      }
      if (telescope.frame == 4){
        telescope.frame = 6;
      }
      if (telescope.frame == 8){
        telescope.frame = 10;
      }
      overlap = true;
      telescope.overlapToken = whence;
    });
    self.telescopes.forEach(function (telescope) {
        if (telescope.overlapToken && telescope.overlapToken !== whence) {
            // was overlapping it is no longer overlapping
            if (telescope.frame == 2){
              telescope.frame = 0;
            }
            if (telescope.frame == 6){
              telescope.frame = 4;
            }
            if (telescope.frame == 10){
              telescope.frame = 8;
            }
            telescope.overlapToken = 0;
        }
    }, null, true);

    //eliminate telescope - obstacle overlapping
    game.physics.arcade.overlap(self.obstacles, self.telescopes,
      function(obstacle,telescope){
        obstacle.kill();
    });
    //eliminate telescome - river overlapping
    game.physics.arcade.overlap(self.rivers, self.telescopes,
      function(river,telescope){
        river.kill();
    });
    //eliminate obstacle - river overlapping
    game.physics.arcade.overlap(self.rivers, self.obstacles,
      function(river, obstacle){
        river.kill();
    });
    game.physics.arcade.overlap(self.player, self.batteries, function(player, battery){
      battery.kill();
      gain_life_sfx.play();
      if (lifeCount >= 3){
        lifeCount = 3;
      }else{
        lifeCount++;
      }
      self.lives.updateLife(lifeCount);
    });
    //serol and obstacles collision
    game.physics.arcade.overlap(self.obstacles, self.player, function(p,o){
      if(o.body.touching.up && p.body.touching.down){

          // in this case just jump again
          p.body.velocity.y =  -1000;
      }
      else{
          // any other way to collide on an enemy will make serol lose lives
          if (!p.invincible) {
            //We only damage the player if not invincible
            lose_life_sfx.play();
            lifeCount--;
            self.lives.updateLife(lifeCount);
            //we toggle invincibility
            p.toggleInvincible();
            //and then we add a timer to restore the player to a vulnerable state
            game.time.events.add(2000, p.toggleInvincible, this);
           }
      }

    });
    //serol and rivers collision
    game.physics.arcade.overlap(self.rivers, self.player, function(p,r){

      if (!p.invincible) {
        //We only damage the player if not invincible
        lose_life_sfx.play();
        lifeCount--;
        self.lives.updateLife(lifeCount);
        //we toggle invincibility
        p.toggleInvincible();
        //and then we add a timer to restore the player to a vulnerable state
        game.time.events.add(2000, p.toggleInvincible, this);
       }
    });

    //bring pipe and queue to top layer
    game.world.bringToTop(pipeImage);
    q.forEach(function(item) {
        game.world.bringToTop(item);
    }, null, true);

    //endgame sequence
    if (endGame === true){
      //remove all objects
      //lvl2bgm.fadeOut(2000);
      game.time.events.remove(generateTelescopes);
      game.time.events.remove(generateObstacles);
      game.time.events.remove(generateBatteries);
      self.player.body.velocity.x = 0;
      self.player.body.velocity.y = 0;
      self.lives.frame = 0;
      skyBg.autoScroll(0, 0);
      runnerBg.autoScroll(0, 0);
      //stop telescopes
      self.telescopes.forEach(function (telescope) {
          telescope.body.velocity.x = 0;
      }, null, true);
      //stop obstacles
      self.obstacles.forEach(function (obstacle) {
          obstacle.body.velocity.x = 0;
      }, null, true);
      //stop rivers
      self.rivers.forEach(function (river) {
          river.body.velocity.x = 0;
      }, null, true);



      // game.camera.fade(#000000, 4000);
      game.time.events.add(Phaser.Timer.SECOND * 2,
        function(){
          lvl2bgm.stop();
          game.state.start('gameOver', true, false);
        },this);

    }
  },
};

function Player1(x, y) {

  //serol attributes
  var player = game.add.sprite(x, y, 'serol');
  player.anchor.setTo(0.5,0);

  player.invincible = false;

  player.animations.add('walkRight', [6, 7, 8, 9, 10, 11], 6, true);
  player.animations.add('staticRight', [18, 19, 20, 21], 4, true);
  player.animations.add('sleeping', [28, 29, 28, 29], 2, true);
  player.animations.add('invincibleWalk', [22, 7, 22, 9, 22, 11], 6, true)

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
    }
    if (endGame == true){
      if(player.scale.x == 1){
        player.scale.x *= -1;
      }
      player.animations.play('sleeping');
    }
    // if(player.invincible == true){
    //   player.animations.play('invincibleWalk');
    // }
    else {
    player.animations.play('walkRight');
    }
  };
  player.toggleInvincible = function() {
    player.invincible = !player.invincible;
  }


  return player;
};

function Obstacle(v){
  var obstacle = game.add.sprite(1000, 450, 'obstacle');
  obstacle.frame = Math.floor(Math.random() * 5);
  //enable physics
  game.physics.enable(obstacle, Phaser.Physics.ARCADE);
  obstacle.body.velocity.x = v;

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

function River(v){
  var river = game.add.sprite(1000, 462, 'river');
  river.animations.add('flow', [0, 1, 2], 4, true);

  river.animations.play('flow');
  game.physics.enable(river, Phaser.Physics.ARCADE);
  river.body.velocity.x = v;
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
// handling collision between enemy and hero
        game.physics.arcade.collide(this.hero, this.enemy, function(hero, enemy){

            // hero is stomping the enemy if:
            // hero is touching DOWN
            // enemy is touching UP

        }, null, this);
