//Level2.js
choices = ['tetromino', 'junk'];
obstacleChoices = ['river', 'obstacle','obstacle'];
teleFrames = [0,4,8];
overlapping = false;

class Level2 extends Phaser.Scene {
	constructor() {
		super("level2");
	}
	preload(){
		this.timeLeft;
		this.minutes;
		this.seconds;
		this.score;
	}
	
	create() {
		overlapping = false;
		if (storyMode == false){
			totalScore = 0;
		}
		this.pipePositions = [100, 200, 300, 400, 500, 600, 700, 800];
		//queue = [];
		this.choices = ['tetromino', 'junk'];
		if (storyMode == true){
			this.score = totalScore;
		}else{
			this.score = 0;
		}
		endgame = false;
		this.lives = 3;
		this.queue = [];
		this.runSpeed = 1.5;
		this.maxSpeed = 9.0;
		this.minSpeed = 1.5;
		this.oneUpSpeed = 0.7;
		this.skySpeed = 0.2;

		//sounds
		this.send = this.sound.add("click");
		this.jump = this.sound.add('jump');
		this.gainLife = this.sound.add('gain_life');
		this.loseLife = this.sound.add('lose_life');
		this.lvl2BGM = this.sound.add("leveltwo_bgm");
		var musicConfig = {
			mute: false,
			volume: 1,
			rate: 1,
			detune: 0,
			seek: 0,
			loop: true,
			delay: 0
		}
		this.lvl2BGM.play(musicConfig);
		//sky
		this.sky = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'endless_sky');
		this.sky.setOrigin(0,0);
		this.sky.setScrollFactor(0);
		//mountains
		this.mountains = this.add.tileSprite(0, 0, game.config.width, game.config.height, "endless_bg");
		this.mountains.setOrigin(0,0);
		this.mountains.setScrollFactor(0);
		//floor platform
		this.stagePlatform = this.add.tileSprite(config.scale.width/2, 620, 0, 0, 'stage').setOrigin(0.5, 0.8);
		this.physics.add.existing(this.stagePlatform, true);
		this.stagePlatform.enableBody = true;
		this.stagePlatform.body.immovable = true;
		//telescopes
		this.telescope = new Telescope(this, 1500, 520, 'telescope',this.choose([0,4,8])).setOrigin(0.5,1).setScale(1.7);
		this.physics.world.enable(this.telescope);
		this.telescope.body.setSize(250, 250);
		this.telescope.on("overlapstart", function() {
			overlapping = true;
			if (this.frame.name == 0){
				this.setFrame(2);
			}
			if (this.frame.name == 4){
				this.setFrame(6);
			}
			if (this.frame.name == 8){
				this.setFrame(10);
			}
		});
		this.telescope.on("overlapend", function() {
			overlapping = false;
			if (this.frame.name == 2){
				this.setFrame(0);
			}
			if (this.frame.name == 6){
				this.setFrame(4);
			}
			if (this.frame.name == 10){
				this.setFrame(8);
			}
		});
		//obstacles and rivers
		this.obstacle = new Obstacle(this,1000, 460,'obstacle',Math.round(Math.random() * 4)).setOrigin(0.5,0);
		this.physics.world.enable(this.obstacle);
		this.obstacle.body.immovable = true;
		//batteries
		this.oneUp = new OneUp(this, 2000, 350);
    	this.physics.world.enable(this.oneUp);
		//spawn Serol
		this.serol = new Serol(this, 100, 350);
		this.physics.add.existing(this.serol);
		this.serol.body.setGravityY(3000);
		this.serol.anims.play('walkRight',true);
		this.serol.setCollideWorldBounds(true);
		//Serol controls
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		this.wasdKeys = this.input.keyboard.addKeys('W,S,A,D');
		//colliding with floor platform
		this.physics.add.collider(this.stagePlatform, this.serol);
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
		// console.log(this.queue);

		//dequeueing using keyup
		this.input.keyboard.on('keyup_SPACE', function (event) {
			var removed = this.queue.shift();
			//play sound
			this.send.play();
			//consider the overlap
			if ((removed.texture.key==='tetromino')&& (overlapping == true)){
				// console.log("tetromino sent");
				this.score += 15;
				this.scoreLabel.text = "SCORE " + this.score;
			} else if ((removed.texture.key==='junk') && (overlapping == true)){
				// console.log("junk sent");
				if (this.score <= 0){
					this.score = 0;
				}else{
					this.score -= 7;
					this.scoreLabel.text = "SCORE " + this.score;
				}
			}
			removed.destroy();
			var textureChoice = this.choose(choices);
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
			this.updatePositions(this.queue,this.pipePositions);

		}, this);

		//timer setup
		this.timedEvent = this.time.delayedCall(120000, this.lvlTwoComplete, [], this);
		this.timerLabel = this.add.bitmapText(424, 15, "pixelFont", "00:00 ", 100);
		//score label and life gauge
		this.scoreLabel = this.add.bitmapText(10, 15, "pixelFont", "SCORE " + this.score  , 60);
		this.livesLabel = this.add.bitmapText(775, 15, "pixelFont", "LIVES " + this.lives  , 60);
		this.lifeGauge = new LifeGauge(this, 950, 10).setOrigin(0.5, 0).setScale(4);
		//increasing runspeed
		this.runspeedIncrease = this.time.addEvent({
			delay: 3500,
			callback: ()=>{
			  this.runSpeed = this.runSpeed * 1.17;
			  if (this.runSpeed > this.maxSpeed){
				  this.runSpeed = this.maxSpeed;
			  }
			},
			loop: true
		})
		//collisions
		this.physics.add.overlap(this.telescope,this.serol);
		this.physics.add.overlap(this.serol, this.oneUp, this.catchOneUp , null, this);
		
	}

	update() {
		this.movePlayerManager();
		this.updateTimer();
		this.sky.tilePositionX += this.skySpeed;
		this.mountains.tilePositionX += this.runSpeed;
		this.itemMove(this.telescope,this.runSpeed);
		this.itemMove(this.obstacle,this.runSpeed);
		this.itemMove(this.oneUp, this.oneUpSpeed);
		// Treat 'embedded' as 'touching' also
		if (this.telescope.body.embedded) {
			this.telescope.body.touching.none = false
		};

		var touching = !this.telescope.body.touching.none;
		var wasTouching = !this.telescope.body.wasTouching.none;
	  
		if (touching && !wasTouching) this.telescope.emit("overlapstart");
		else if (!touching && wasTouching) this.telescope.emit("overlapend");
		// handling collision between obstacle and serol
		if (this.serol.alpha == 1){
        this.physics.world.collide(this.serol, this.obstacle, function(serol, obstacle){
 
            //obstacle is touching up and serol is touching down
            if(obstacle.body.touching.up && serol.body.touching.down){
                // in this case just jump again
                this.serol.body.velocity.y =  -gameSettings.playerYSpeed;
            }
            else{
				//play sound
				this.loseLife.play();
				//Make Serol ivincible for a bit, then reset to normal
				serol.alpha = 0.5

				this.serolReset = this.time.addEvent({
					delay: 2000,
					callback: ()=>{
						serol.alpha = 1;
					},
					loop: false
				})
				//slow down the scroll
				if (this.runSpeed < this.minSpeed){
					this.runSpeed = this.minSpeed;
				}else{
					this.runSpeed -= (this.runSpeed/3);
				}
				// any other way to collide with an obstacle will cause life loss
				
                if ( this.lives <= 1){
					this.endgame();			  
				  }else{
					this.lives--;
				  }
				  this.livesLabel.text = "LIVES " + this.lives;
				  //update lives gauge
				  this.lifeGauge.updateLife(this.lives);
            	}
			}, null, this);
		}	
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
			this.jump.play();
		  	this.serol.setVelocityY(-gameSettings.playerYSpeed);
		}
		if (endgame == true) {
			this.serol.flipX = true;
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
	choose(choices) {
		return choices[Math.floor(Math.random() * choices.length)];
	}
	itemMove(item, velocity) {
		//set acceleration
		item.x -= velocity;
		if(item.frame.key == "1up"){
			item.x -= this.oneUpSpeed;
		}
		//reset item when it falls beyond the world boundary (top/bottom)
		if (item.x < -150) {
		  this.itemReset(item);
		}
	}

	itemReset(item) {
		//set y depending on sprite
		item.anims.stop();
		// console.log(item.texture.key);
		if (item.texture.key == "telescope") {
			item.y = 520;
		  	item.setTexture("telescope", this.choose(teleFrames));
		  	item.x = config.scale.width+200;
		  	this.itemMove(item,this.runSpeed);
		}
		else if (item.texture.key == "obstacle"||item.texture.key == "river") {
			item.y = 460;
			item.setTexture(this.choose(obstacleChoices),0)
			if (item.texture.key == 'obstacle'){
				item.setTexture('obstacle',Phaser.Math.Between(0, 4))
			}
			else if (item.texture.key  == 'river'){
				item.setTexture('river',0)
				item.anims.play('flow');
			}
		//   item.setTexture("obstacle", Phaser.Math.Between(0, 4));
		  item.x = config.scale.width+200;
		  this.itemMove(item,this.runSpeed);
		}
		else if (item.texture.key == "1up") {
		  item.setTexture("1up", 0); 
		  item.y = 350;
		  item.x = config.scale.width+500;
		  this.itemMove(item, this.oneUpSpeed);
		  }
	}
	riverCollide(serol,river){
		//TODO: make Serol ivincible for a bit
		serol.alpha = 0.5
		this.serolReset = this.time.addEvent({
			delay: 1500,
			callback: ()=>{
				serol.alpha = 1;
			},
			loop: false
		})
		// any other way to collide with an obstacle will cause life loss
		
		if ( this.lives <= 1){
			this.endgame();	  
		  }else{
			this.lives--;
		  }
		  this.livesLabel.text = "LIVES " + this.lives;
		  //update lives gauge
		  this.lifeGauge.updateLife(this.lives);
	}
	domSubCollide(dom,sub){
		this.itemReset(sub);
	}
	catchOneUp(serol,oneUp){
		this.itemReset(oneUp);
		this.gainLife.play();
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
	lvlTwoComplete(){
		//fade bgm
		this.tweens.add({
			targets:  this.lvl2BGM,
			volume:   0,
			duration: 2000
		  });
		
		this.slowDown = this.time.delayedCall(1000, function(){
			this.runSpeed = this.runSpeed/2;
			this.oneUpSpeed = this.oneUpSpeed/2;
			this.skySpeed = this.skySpeed/2;
		}, [], this);
		this.stopMovement = this.time.delayedCall(2000, function(){
			this.runSpeed = 0;
			this.oneUpSpeed = 0;
			this.skySpeed = 0;
		}, [], this);

		//save score
		totalScore+=this.score;
		//change scene
		this.transition = this.time.delayedCall(4000, function(){
			this.sound.stopAll();
			this.scene.start('level2Complete');
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
			targets:  this.lvl2BGM,
			volume:   0,
			duration: 2000
		  });
		
		//remove object sprites
		this.runSpeed = 0;
		this.oneUpSpeed = 0;
		this.skySpeed = 0;
		this.sky.tilePositionX = this.sky.tilePositionX;
		//put Serol to sleep
		this.serol.anims.play('sleeping',true);
		//save score
		totalScore+=this.score;
		//change scene
		this.transition = this.time.delayedCall(4000, function(){
			this.sound.stopAll();
			this.scene.start('gameOver');
			this.scene.stop();
		}, [], this);  // delay in ms
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
//Telescope object
class Telescope extends Phaser.Physics.Arcade.Sprite{
	constructor(scene, x=0, y=0, texture = "telescope", frame = 0) {
		super(scene,x,y,texture,frame)
		scene.add.existing(this)
		scene.events.on('update', this.update, this)
	}	
}
/*Obstacle class*/
class Obstacle extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x=0, y=0, texture = null, frame = 0) {
	  super(scene,x,y,texture,frame)
	  scene.add.existing(this)
	  scene.events.on('update', this.update, this)

	  scene.anims.create({
		key: 'flow',
		frames: scene.anims.generateFrameNumbers('river', {frames: [0,1,2]}),
		frameRate: 4,
		repeat: -1
	  });
	}
}