//Level2.js
class Level2 extends Phaser.Scene {
	constructor() {
		super("level2");
	}
	pipePositions = [100, 200, 300, 400, 500, 600, 700, 800];
	//queue = [];
	choices = ['tetromino', 'junk'];
	score = 0;
	lives = 3;
	timeLeft;
	minutes;
	seconds;
	create() {
		endgame = false;
    	this.score = 0;
		this.lives = 3;
		this.queue = [];
		//sky
		this.sky = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'endless_sky');
		this.sky.setOrigin(0,0);
		this.sky.setScrollFactor(0);
		//mountains
		this.mountains = this.add.tileSprite(0, 0, game.config.width, game.config.height, "endless_bg");
		this.mountains.setOrigin(0,0);
		this.mountains.setScrollFactor(0);
		//floor platform
		this.stagePlatform = this.add.tileSprite(config.width/2, 620, 0, 0, 'stage').setOrigin(0.5, 0.8);
		this.physics.add.existing(this.stagePlatform, true);
		this.stagePlatform.enableBody = true;
		this.stagePlatform.body.immovable = true;
		//pipe
		this.pipeBg = this.add.sprite(10, 520, 'pipe').setOrigin(0, 0);
		//initial queue
		for(var i in this.pipePositions) {
			var textureChoice = this.choices[Math.floor(Math.random() * this.choices.length)]
			if (textureChoice == 'tetromino'){
				this.sprite = new QueueSprite(
					this,
					this.pipePositions[i], 
					585,
					"tetromino",
					Phaser.Math.Between(0, 31)
					);
			}
			else if (textureChoice == 'junk'){
				this.sprite = new QueueSprite(
					this,
					this.pipePositions[i], 
					585,
					"junk",
					Phaser.Math.Between(0, 5)
					);
			}
			this.queue.push(this.sprite);
		  }
		console.log(this.queue);
		//dequeueing using keyup
		this.input.keyboard.on('keyup_SPACE', function (event) {
			var removed = this.queue.shift();
			//consider the overlap
			if ((removed.texture.key==='tetromino')/*&& (overlap == true)*/){
				console.log("tetromino sent");
				// counterVal += 10;
				// self.counter.updateScore(counterVal);
			} else if ((removed.texture.key==='junk') /*&& (overlap == true)*/){
				console.log("junk sent");
				// counterVal -= 5;
				// self.counter.updateScore(counterVal);
			}
			// if ((removed.key==='tetromino') /*&& (overlap == true)*/){
			// console.log("tetromino lost (oh no)");
			// self.counter.updateScore(counterVal);
			// } else if ((removed.key==='junk') /*&& (overlap == true)*/){
			// console.log("junk thrown out");
			// self.counter.updateScore(counterVal);
			// }
			removed.destroy();
			var textureChoice = this.choices[Math.floor(Math.random() * this.choices.length)]
			if (textureChoice == 'tetromino'){
				this.queue.push(new QueueSprite(
					this,
					this.pipePositions[i], 
					585,
					"tetromino",
					Phaser.Math.Between(0, 31)
					));
			}
			else if (textureChoice == 'junk'){
				this.queue.push(new QueueSprite(
					this,
					this.pipePositions[i], 
					585,
					"junk",
					Phaser.Math.Between(0, 5)
					));
			}
			// this.queue.push(new QueueSprite(
			// 	this,
			// 	this.pipePositions[i], 
			// 	585,
			// 	(this.choices[Math.floor(Math.random() * this.choices.length)]),
			// 	Phaser.Math.Between(0, 31)));
			// console.log(q,xPositions);
			this.updatePositions(this.queue,this.pipePositions);

		}, this);
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
		this.mountains.tilePositionX += 0.5;
		this.sky.tilePositionX += 0.2;
	}

	movePlayerManager(){
		let pad = Phaser.Input.Gamepad.Gamepad;
	
		if (this.input.gamepad.total){
		  pad = this.input.gamepad.getPad(0);
		}
		if (this.cursorKeys.left.isDown|| this.wasdKeys.A.isDown|| pad.left) {
		  this.serol.setVelocityX(-gameSettings.playerXSpeed);
		}
		else if(this.cursorKeys.right.isDown|| this.wasdKeys.D.isDown|| pad.right) {
		  this.serol.setVelocityX(gameSettings.playerXSpeed);
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

	updatePositions(elementArray, posArray){
		for (var i=0;i < elementArray.length;i++){
		  elementArray[i].x = posArray[i];
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
//queue sprite object
class QueueSprite extends Phaser.Physics.Arcade.Sprite{
	constructor(scene, x=0, y=0, texture = null, frame = 0) {
		super(scene,x,y,texture,frame)
		scene.add.existing(this)
		scene.events.on('update', this.update, this)
	}
}