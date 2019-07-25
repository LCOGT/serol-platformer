//GameOver.js
class GameOver extends Phaser.Scene {
	constructor() {
		super("gameOver");
	}

	create() {
		//background
		this.gameOverBg = this.add.image(0,0,"gameOver").setOrigin(0,0).setInteractive();
		this.gameOverBg.on('pointerdown', function (event) {
			//change for story mode and separate levels
			console.log("Game Over to Hi Scores");
			this.scene.start('gameTitle');
	  }, this);
	  this.cameras.main.fadeIn(2000);
	  this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    //your score text
	}

	update() {
		//fade in tween here
		if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
			//change for story mode and separate levels
			console.log("Game Over to Hi Scores");
			this.scene.start('gameTitle');
		}
	}
}
