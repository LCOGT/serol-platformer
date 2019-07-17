//Level2.js
class Level2 extends Phaser.Scene {
	constructor() {
		super("level2");
	}
	score = 0;
	lives = 3;
	timeLeft;
	minutes;
	seconds;
	create() {
		endgame = false;
    	this.score = 0;
    	this.lives = 3;
		//sky

		//mountains
		this.mountains = this.add.tileSprite(0, 0, game.config.width, game.config.height, "endless_bg");
		this.mountains.setOrigin(0,0);
		this.mountains.setScrollFactor(0);
		//floor platform
		this.stagePlatform = this.add.tileSprite(config.width/2, 640, 0, 0, 'stage').setOrigin(0.5, 0.8);
		this.physics.add.existing(this.stagePlatform, true);
		this.stagePlatform.enableBody = true;
		this.stagePlatform.body.immovable = true;			
		//spawn Serol
		this.serol = new Serol(this, 512, 50);
		this.physics.add.existing(this.serol);
		this.serol.body.setGravityY(3000);
		this.serol.anims.play('walkRight',true);
		this.serol.setCollideWorldBounds(true);
		//Serol controls
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		this.wasdKeys = this.input.keyboard.addKeys('W,S,A,D');
		//colliding with floor platform
		this.physics.add.collider(this.stagePlatform, this.serol);

		//timer setup
		this.timedEvent = this.time.delayedCall(120000, this.lvlTwoComplete, [], this);
		this.timerLabel = this.add.bitmapText(424, 15, "pixelFont", "00:00 ", 100);
		//score label and life gauge
		this.scoreLabel = this.add.bitmapText(10, 15, "pixelFont", "SCORE " + this.score  , 60);
		this.livesLabel = this.add.bitmapText(775, 15, "pixelFont", "LIVES " + this.lives  , 60);
		this.lifeGauge = new LifeGauge(this, 950, 10).setOrigin(0.5, 0).setScale(4);
	}

	update() {
		this.movePlayerManager();
		this.updateTimer();

	}
	movePlayerManager(){
		let pad = Phaser.Input.Gamepad.Gamepad;
	
		if (this.input.gamepad.total){
		  pad = this.input.gamepad.getPad(0);
		}
		if (this.cursorKeys.left.isDown|| this.wasdKeys.A.isDown|| pad.left) {
		  this.serol.setVelocityX(-gameSettings.playerXSpeed);
		//   this.serol.anims.play('walkLeft',true);
		}
		else if(this.cursorKeys.right.isDown|| this.wasdKeys.D.isDown|| pad.right) {
		  this.serol.setVelocityX(gameSettings.playerXSpeed);
		//   this.serol.anims.play('walkRight',true);
		}
		else if(endgame == false) {
		  this.serol.anims.play('walkRight',true);
		  this.serol.setVelocityX(0);
		}
		if((this.cursorKeys.up.isDown || this.wasdKeys.W.isDown) && this.serol.body.onFloor()) {
		  this.serol.setVelocityY(-gameSettings.playerYSpeed);
		}
		if (endgame == true) {
		  this.serol.anims.play('sleep',true);
		  this.serol.setVelocityX(0);
		  this.serol.setVelocityY(0);
		  this.serol.setAccelerationY(3000);
		}
	  }
	  zeroPad(number,size){
		var stringNumber = String(number);
		while(stringNumber.length < (size || 2)){
		  stringNumber = "0" + stringNumber;
		}
		return stringNumber;
	  }
	  updateTimer(){
		this.timeLeft = ((120000 - this.timedEvent.delay*this.timedEvent.getProgress())/1000).toFixed(0);
		this.seconds = Math.floor(this.timeLeft % 60); //Seconds to display
		this.minutes = Math.floor(this.timeLeft / 60); //Minutes to display
		this.timeFormatted = (this.zeroPad(this.minutes,2)+":"+this.zeroPad(this.seconds,2));
		this.timerLabel.setText(this.timeFormatted);
	  }
	  lvlTwoComplete(){
		this.scene.start('level2Complete');
	  }
}