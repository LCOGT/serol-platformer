//Level3.js
captured = 0;
frameChoices = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
class Level3 extends Phaser.Scene {
  constructor() {
    super('level3');
  }
  preload() {
    this.timeLeft;
    this.minutes;
    this.seconds;
    this.score;
  }
  create() {
    overlapping = false;
    if (storyMode == true) {
      this.score = totalScore;
    } else {
      this.score = 0;
    }
    endgame = false;
    this.lives = 3;
    this.queue = [];
    captured = 0;
    //add more coordinates when graphics are ready
    this.coordinates = {
      //key: [x,y,scale]
      //quadrant 1
      0:[345, 152, 0.5],
      1:[750, 242, 1],
      2:[227, 420, 0.8],
      3:[600, 592, 1.2],
      //quadrant 2
      4:[1392, 170, 1.2],
      5:[1851, 350, 1],
      6:[1173, 500, 0.3],
      7:[1568, 567, 0.7],
      //quadrant 3
      8:[252, 763, 0.4],
      9:[886, 857, 1],
      10:[240, 1031,0.7],
      11:[685, 1170, 1.2],
      //quadrant 4
      12:[1230, 784, 0.5],
      13:[1638, 1152, 1],
      14:[1767, 860, 1.2],
      15:[1180, 1100, 0.6]
    }
    this.astrolabels = [
      "planet", "planet", "planet", "planet", 
      "globular cluster", "open cluster", 
      "planetary nebula", "star forming nebula",
      "supernova remnant", "supernova remnant",
      "spiral galaxy", "spiral galaxy",
      "elliptical galaxy", "elliptical galaxy",
      "galaxy group", "spiral bar galaxy"
      ]
    //sounds
    this.send = this.sound.add("shutter");
    this.gainLife = this.sound.add('gain_life');
    this.loseLife = this.sound.add('lose_life');
    this.lvl3BGM = this.sound.add('levelthree_bgm')
    var musicConfig = {
			mute: false,
			volume: 1,
			rate: 1,
			detune: 0,
			seek: 0,
			loop: true,
			delay: 0
		}
    this.lvl3BGM.play(musicConfig);
    //backgrounds
    //  Set the camera and physics bounds to be the size of 4x4 bg images
    this.cameras.main.setBounds(0, 0, config.scale.width * 2, config.scale.height * 2);
    this.physics.world.setBounds(0, 70, config.scale.width * 2, config.scale.height * 2 -70);
    this.cameras.main.setBackgroundColor('#000062')

    //  Mash 4 images together to create background
    // this.add.image(0, 0, 'dark_sky').setOrigin(0);
    this.add.image(512, 318, 'stars_bg').setOrigin(0,0).setScale(2);

    // this.add.image(config.scale.width, 0, 'dark_sky').setOrigin(0).setFlipX(true);
    this.add.image(1536, 318, 'stars_bg').setOrigin(0,0).setScale(2);

    // this.add.image(0, config.scale.height, 'dark_sky').setOrigin(0).setFlipY(true);
    this.add.image(512, 958, 'stars_bg').setOrigin(0,0).setScale(2);

    // this.add.image(config.scale.width, config.scale.height, 'dark_sky').setOrigin(0).setFlipX(true).setFlipY(true);
    this.add.image(1536, 958, 'stars_bg').setOrigin(0,0).setScale(2);
    
    //astronomical objects
    this.astros = this.physics.add.group();
    this.scatterObjects(this.coordinates);
    //timer, lives, score
    //timer setup
    this.timedEvent = this.time.delayedCall(120000, this.lvlTwoComplete, [], this);
    this.timerLabel = this.add.bitmapText(424, 15, "pixelFont", "00:00 ", 100).setScrollFactor(0);
    //score label and life gauge
    this.scoreLabel = this.add.bitmapText(10, 15, "pixelFont", "SCORE " + this.score, 60).setScrollFactor(0);
    this.livesLabel = this.add.bitmapText(775, 15, "pixelFont", "LIVES " + this.lives, 60).setScrollFactor(0);
    this.lifeGauge = new LifeGauge(this, 950, 10).setOrigin(0.5, 0).setScale(4).setScrollFactor(0);
    //batteries
		this.oneUp = new OneUp(this, 2000, 350);
    this.physics.world.enable(this.oneUp);
    this.oneUp.body.setCollideWorldBounds(true);
    this.oneUp.body.setVelocityX(200);
    this.oneUp.body.setVelocityY(200);
    this.oneUp.setBounce(1, 1);
    //target square
    this.target = this.add.sprite(10, config.scale.height - 10, 'target_squares',3).setOrigin(0,1).setScrollFactor(0);
    this.physics.add.existing(this.target, true);
    this.target.enableBody = true;
    this.target.body.x = 10;
    this.target.body.y = config.scale.height * 2 -182;
    this.target.body.immovable = true;
    this.add.bitmapText(21, config.scale.height - 170, "pixelFont", "TARGET", 60).setScrollFactor(0);
    
    this.anims.create({
      key: 'critical',
      frames: this.anims.generateFrameNumbers('target_squares', {frames: [3,2,3,2,3,2,3,2,3]}),
      frameRate: 4,
      repeat: -1
    });
    //setting up queue of frames
    for(var i in frameChoices) {
			this.textureChoice = frameChoices[Math.floor(Math.random() * frameChoices.length)]
      this.queue.push(this.textureChoice);
		  }
    // console.log(this.queue);
    //target sprite
    this.targetSprite = this.add.sprite(95, config.scale.height - 80, 'astro_objects',this.queue[0]).setOrigin(0.5,0.5).setScrollFactor(0);
    //target text
    this.targetLabel = this.add.bitmapText(config.scale.width -10, config.scale.height -10, "pixelFont", this.astrolabels[this.queue[0]], 60).setOrigin(1,1).setScrollFactor(0);
    //countdown in seconds
    
    this.countdown = 10;
        
    
    //serol object
    this.serol = this.add.container(config.scale.width, config.scale.height).setSize(50, 50);
    this.outer = this.add.image(0,-12, 'camera_frame').setOrigin(0.5, 0.5).setScale(1.2);
    this.inner = this.add.image(0,0, 'camera_circle').setOrigin(0.5, 0.5).setScale(1.2);
    this.serol.add([this.outer, this.inner]);
    this.physics.world.enable(this.serol);
    this.serol.body.setCollideWorldBounds(true);
    //set camera to follow player
    this.cameras.main.startFollow(this.serol, true, 1, 1);
    this.physics.add.collider(this.serol,this.target);
    this.physics.add.overlap(this.serol,this.astros);
    this.physics.add.overlap(this.serol,this.oneUp,this.catchOneUp , null, this);
    //controls
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.wasdKeys = this.input.keyboard.addKeys('W,S,A,D');
    //overlap
    this.astros.getChildren().forEach(astro =>{
      // console.log(astro);
      astro.on("overlapstart", function() {
        captured = astro.frame.name;
        overlapping = true;
        // console.log("to capture: " + captured);
        astro.body.debugBodyColor = 0xffff00;
      });
      astro.on("overlapend", function() {
        captured = -1;
        overlapping = false;
        astro.body.debugBodyColor = 0x00ffff;
      });
    });
    //dequeueing using keyup
		this.input.keyboard.on('keyup_SPACE', function (event) {
      this.queue.shift();
      this.targetLabel.text = this.astrolabels[this.queue[0]];			
			//consider the overlap
			if (overlapping == true && captured === this.targetSprite.frame.name){
        this.send.play();
        // console.log("picture taken");
        // console.log("target: " + this.targetSprite.frame.name);
        // console.log("captured: " + captured);

				this.score += 40;
        this.scoreLabel.text = "SCORE " + this.score;
        //reset countdown
        this.countdown = 10;
				}else{
          // console.log("bad picture taken");
          // console.log("target: " + this.targetSprite.frame.name);
          // console.log("captured: " + captured);
          this.loseLife.play();
          if ( this.lives <= 1){
            this.endgame();			  
            }else{
            this.lives--;
            }
            this.livesLabel.text = "LIVES " + this.lives;
            //update lives gauge
            this.lifeGauge.updateLife(this.lives);
        }
      var textureChoice = this.choose(frameChoices);
			this.queue.push(textureChoice);
			
			this.targetSprite.setFrame(this.queue[0]);
			}, this);
  }

  update(time, delta) {
    this.movePlayerManager();
    this.updateTimer();
    this.astros.getChildren().forEach(astro =>{
      // Treat 'embedded' as 'touching' also
      if (astro.body.embedded) {
        astro.body.touching.none = false
      };

      var touching = !astro.body.touching.none;
      var wasTouching = !astro.body.wasTouching.none;
      
      if (touching && !wasTouching) {
        astro.emit("overlapstart");
        // console.log("overlap start");
      }
      else if (!touching && wasTouching) {
        astro.emit("overlapend");
        // console.log("overlap end");
      }
    });
    //countdown
    if(this.countdown >= 0){
      this.countdown -= delta * 0.001;
      //if countdown is finished
      if(this.countdown <= 10){
        this.target.setFrame(3);
        if (this.countdown <= 7){
        this.target.setFrame(0);
        if (this.countdown <= 4){
          this.target.setFrame(1);
          if(this.countdown <= 2){
            this.target.setFrame(2);
            if(this.countdown <=0){
              // console.log("Time out!");
              this.loseLife.play();
                if ( this.lives <= 1){
                  this.endgame();			  
                }else{
                  this.lives--;
                  this.queue.shift();
                  this.targetLabel.text = this.astrolabels[this.queue[0]];
                  var textureChoice = this.choose(frameChoices);
			            this.queue.push(textureChoice);
			            this.targetSprite.setFrame(this.queue[0]);
                }
                this.livesLabel.text = "LIVES " + this.lives;
                //update lives gauge
                this.lifeGauge.updateLife(this.lives);
                //reset countdown
                this.countdown = 10;
                
            }
          }
        }
      }
    } 
    }
  }
  movePlayerManager() {
    let pad = Phaser.Input.Gamepad.Gamepad;

    if (this.input.gamepad.total) {
      pad = this.input.gamepad.getPad(0);
    }

    if (this.cursorKeys.left.isDown || this.wasdKeys.A.isDown || pad.left) {
      this.serol.body.setVelocityX(-gameSettings.playerXSpeed);
    }
    else if (this.cursorKeys.right.isDown || this.wasdKeys.D.isDown || pad.right) {
      this.serol.body.setVelocityX(gameSettings.playerXSpeed);
    }
    else{
      this.serol.body.setVelocityX(0);
    }
    if ((this.cursorKeys.up.isDown || this.wasdKeys.W.isDown || pad.up)) {
      this.serol.body.setVelocityY(-gameSettings.playerXSpeed);
    }
    else if (this.cursorKeys.down.isDown || this.wasdKeys.S.isDown || pad.down) {
      this.serol.body.setVelocityY(gameSettings.playerXSpeed);
    }
    else{
      this.serol.body.setVelocityY(0);
    }
    if (endgame == true) {
      this.serol.body.setVelocityX(0);
      this.serol.body.setVelocityY(0);
    }
    
  }
  zeroPad(number, size) {
    var stringNumber = String(number);
    while (stringNumber.length < (size || 2)) {
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }

  updateTimer() {
    this.timeLeft = ((120000 - this.timedEvent.delay * this.timedEvent.getProgress()) / 1000).toFixed(0);
    this.seconds = Math.floor(this.timeLeft % 60);
    this.minutes = Math.floor(this.timeLeft / 60);
    this.timeFormatted = (this.zeroPad(this.minutes, 2) + ":" + this.zeroPad(this.seconds, 2));
    this.timerLabel.setText(this.timeFormatted);
  }
  choose(choices) {
		return choices[Math.floor(Math.random() * choices.length)];
  }
  scatterObjects(coords){
    let coordinates = coords;
    let allFrames = this.anims.generateFrameNumbers('astro_objects');
    let temp = allFrames.slice();
    allFrames.forEach(element => {
      //pick from coords at random, removing each element after done
      let thing = new Astro(this,coordinates[element.frame][0],coordinates[element.frame][1],'astro_objects',temp.splice(Math.floor(Math.random() * temp.length),1)[0].frame);
      thing.setScale(coordinates[element.frame][2]);
      this.astros.add(thing);
      thing.body.setCircle(50,20);
    });
  }
  catchOneUp(serol,oneUp){
    if(oneUp.alpha == 1){
      this.gainLife.play();
      //make the battery invisible
      oneUp.alpha = 0;
      //reset body and visibility
      this.oneUpReset = this.time.addEvent({
        delay: 10000,
        callback: ()=>{
          oneUp.alpha = 1;
        },
        loop: false
      })
      
      //increase life count
      if (this.lives >= 3){
        this.lives = 3;
        this.score += 50;
        this.scoreLabel.text = "SCORE " + this.score;
      }else{
        this.lives++;
      }
      this.livesLabel.text = "LIVES " + this.lives;
      //update lives gauge
      this.lifeGauge.updateLife(this.lives);
    }
	}
  lvlTwoComplete(){
		//fade bgm
		this.tweens.add({
			targets:  this.lvl3BGM,
			volume:   0,
			duration: 2000
		  });
		//save score
		totalScore+=this.score;
		//change scene
		this.transition = this.time.delayedCall(1000, function(){
			this.sound.stopAll();
      this.scene.start('level3Complete');
      this.scene.stop();
    }, [], this);
	}
  endgame(){
		this.lives = 0;
		//endgame sequence
		endgame=true;
		//stop timer
		this.timedEvent.paused = true;
		//remove bgm
		this.tweens.add({
			targets:  this.lvl3BGM,
			volume:   0,
			duration: 2000
		  });
		
		//put Serol to sleep
		this.cameras.main.fadeOut(3000);
		//save score
		totalScore+=this.score;
		//change scene
		this.transition = this.time.delayedCall(3000, function(){
			this.sound.stopAll();
      this.scene.start('gameOver');
      console.log("Stopping current Scene");
      this.scene.stop();
		}, [], this);  // delay in ms
	}

}
//astronomical object sprite
class Astro extends Phaser.Physics.Arcade.Sprite{
	constructor(scene, x=0, y=0, texture = 'astro_objects', frame = 0) {
		super(scene,x,y,texture,frame)
		scene.add.existing(this)
		scene.events.on('update', this.update, this)
  }
  compare(target){
    if (target.frame.name == this.frame.name){
      return true;
    }else{
      return false;
    }
  }
}