//GameOver.js
class GameOver extends Phaser.Scene {
	constructor() {
		super("gameOver");
	}

	create() {
		//background
		this.gameOverBg = this.add.image(0,0,"gameOver").setOrigin(0,0).setInteractive();
		this.gameOverBg.on('pointerdown', function (event) {
			console.log("Game Over to Hi Scores");
			this.scene.start('gameTitle');
	  }, this);
	  this.cameras.main.fadeIn(2000);

    //your score text
	}

	update() {
		//fade in tween here
	}
}
