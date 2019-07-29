//level1Complete.js
class Level1Complete extends Phaser.Scene {
	constructor() {
		super("level1Complete");
	}

	preload() {
	}

	create() {
		//background
		this.lvl1CompleteBg = this.add.image(0,0,"lvl1_complete").setOrigin(0,0).setInteractive();
		this.lvl1CompleteBg.on('pointerdown', function (event) {
			//change for story mode and separate levels
			console.log("lvl1 Complete to lvl2 instructions");
			this.scene.start('instructions2');
		  }, this);
		this.finalScoreLabel = this.add.bitmapText(config.scale.width/2, 420, "pixelFont", "Your score: " + totalScore  , 60).setOrigin(0.5,0);
		this.cameras.main.fadeIn(2000);
		this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

	}

	update() {
		//change for story mode and separate levels
		if (Phaser.Input.Keyboard.JustDown(this.enter)){
			console.log("lvl1 Complete to lvl2 instructions");
			this.scene.start('instructions2');
		}
	}
}

