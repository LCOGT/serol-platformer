//GameOver.js
class GameOver extends Phaser.Scene {
	constructor() {
		super("gameOver");
	}

	create() {
		//background
		this.gameOverBg = this.add.image(0,0,"gameOver").setOrigin(0,0).setInteractive();
		//sound
		this.gameOverBGM = this.sound.add('game_over');
		this.gameOverBGM.play();
	  	this.finalScoreLabel = this.add.bitmapText(config.scale.width/2, 260, "pixelFont", "Your score: " + totalScore  , 60).setOrigin(0.5,0);
	 	this.cameras.main.fadeIn(2000);
	  	this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	  	this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);


    //your score text
	}

	update() {
		//fade in tween here
		if (Phaser.Input.Keyboard.JustDown(this.enter)){
			//change for story mode and separate levels
			console.log("Game Over to Hi Scores");
			this.scene.start('gameTitle');
		}
	}
}
