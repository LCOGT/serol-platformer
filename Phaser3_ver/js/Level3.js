//Level3.js
frameChoices = [0,1,2,3,4,5];
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
    if (storyMode == true) {
      this.score = totalScore;
    } else {
      this.score = 0;
    }
    endgame = false;
    this.lives = 3;
    this.queue = [];
    //sounds
    this.send = this.sound.add("click");
    
    //  Set the camera and physics bounds to be the size of 4x4 bg images
    this.cameras.main.setBounds(0, 0, config.scale.width * 2, config.scale.height * 2);
    this.physics.world.setBounds(0, 70, config.scale.width * 2, config.scale.height * 2 -70);
    //  Mash 4 images together to create background
    this.add.image(0, 0, 'blue_bg').setOrigin(0);
    this.add.image(config.scale.width, 0, 'blue_bg').setOrigin(0).setFlipX(true);
    this.add.image(0, config.scale.height, 'blue_bg').setOrigin(0).setFlipY(true);
    this.add.image(config.scale.width, config.scale.height, 'blue_bg').setOrigin(0).setFlipX(true).setFlipY(true);
    //timer setup
    this.timedEvent = this.time.delayedCall(120000, this.lvlTwoComplete, [], this);
    this.timerLabel = this.add.bitmapText(424, 15, "pixelFont", "00:00 ", 100).setScrollFactor(0);
    //score label and life gauge
    this.scoreLabel = this.add.bitmapText(10, 15, "pixelFont", "SCORE " + this.score, 60).setScrollFactor(0);
    this.livesLabel = this.add.bitmapText(775, 15, "pixelFont", "LIVES " + this.lives, 60).setScrollFactor(0);
    this.lifeGauge = new LifeGauge(this, 950, 10).setOrigin(0.5, 0).setScale(4).setScrollFactor(0);
    //astronomical objects


    
    //target square
    this.add.bitmapText(21, config.scale.height - 170, "pixelFont", "TARGET", 60).setScrollFactor(0);
    this.target = this.add.sprite(10, config.scale.height - 10, 'target').setOrigin(0,1).setScrollFactor(0);
    this.physics.add.existing(this.target, true);
    this.target.enableBody = true;
    this.target.body.x = 10;
    this.target.body.y = config.scale.height * 2 -182;
    this.target.body.immovable = true;   
    //setting up queue of frames
    console.log("making frame queue");
    for(var i in frameChoices) {
			this.textureChoice = frameChoices[Math.floor(Math.random() * frameChoices.length)]
      this.queue.push(this.textureChoice);
		  }
    console.log(this.queue);
    //target sprite
    this.targetSprite = this.add.sprite(90, config.scale.height - 80, 'junk',this.queue[0]).setOrigin(0.5,0.5).setScrollFactor(0);

    //dequeueing using keyup
		this.input.keyboard.on('keyup_SPACE', function (event) {
      var removed = this.queue.shift();
      console.log(removed);
			//play sound
			this.send.play();
			//consider the overlap
			// if (overlapping == true){
			// 	console.log("tetromino sent");
			// 	this.score += 10;
			// 	this.scoreLabel.text = "SCORE " + this.score;
			// 	}else{
			// 		this.score -= 5;
			// 		this.scoreLabel.text = "SCORE " + this.score;
			// 	}
			// }
			var textureChoice = this.choose(frameChoices);
			this.queue.push(textureChoice);
			
			this.targetSprite.setFrame(this.queue[0]);

		}, this);





    //controls
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.wasdKeys = this.input.keyboard.addKeys('W,S,A,D');
    //player object
    this.serol = this.physics.add.sprite(config.scale.width / 2, config.scale.height / 2, 'fullscreen').setScale(0.5).setOrigin(0.5, 0.5);
    this.serol.setCollideWorldBounds(true);
    //set camera to follow player
    this.cameras.main.startFollow(this.serol, true, 1, 1);
    this.physics.add.collider(this.target,this.serol);

  }

  update() {
    this.movePlayerManager();
    this.updateTimer();
  }
  movePlayerManager() {
    let pad = Phaser.Input.Gamepad.Gamepad;

    if (this.input.gamepad.total) {
      pad = this.input.gamepad.getPad(0);
    }

    if (this.cursorKeys.left.isDown || this.wasdKeys.A.isDown || pad.left) {
      this.serol.setVelocityX(-gameSettings.playerXSpeed);
    }
    else if (this.cursorKeys.right.isDown || this.wasdKeys.D.isDown || pad.right) {
      this.serol.setVelocityX(gameSettings.playerXSpeed);
    }
    else{
      this.serol.setVelocityX(0);
    }
    if ((this.cursorKeys.up.isDown || this.wasdKeys.W.isDown || pad.up)) {
      this.serol.setVelocityY(-gameSettings.playerXSpeed);
    }
    else if (this.cursorKeys.down.isDown || this.wasdKeys.S.isDown || pad.down) {
      this.serol.setVelocityY(gameSettings.playerXSpeed);
    }
    else{
      this.serol.setVelocityY(0);
    }
    if (endgame == true) {
      this.serol.setVelocityX(0);
      this.serol.setVelocityY(0);
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
    this.seconds = Math.floor(this.timeLeft % 60); //Seconds to display
    this.minutes = Math.floor(this.timeLeft / 60); //Minutes to display
    this.timeFormatted = (this.zeroPad(this.minutes, 2) + ":" + this.zeroPad(this.seconds, 2));
    this.timerLabel.setText(this.timeFormatted);
  }
  choose(choices) {
		return choices[Math.floor(Math.random() * choices.length)];
	} 

}
//astronomical object sprite
class Astro extends Phaser.Physics.Arcade.Sprite{
	constructor(scene, x=0, y=0, texture = 'junk', frame = 0) {
		super(scene,x,y,texture,frame)
		scene.add.existing(this)
		scene.events.on('update', this.update, this)
	}
}