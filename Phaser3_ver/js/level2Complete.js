//level1Complete.js
class Level2Complete extends Phaser.Scene {
	constructor() {
		super("level2Complete");
	}

	preload() {
	}

	create() {
		//background
		this.lvl1CompleteBg = this.add.image(0,0,"lvl2_complete").setOrigin(0,0).setInteractive();
		this.lvl1CompleteBg.on('pointerdown', function (event) {
			//change for story mode and separate levels
			console.log("lvl1 Complete to lvl2 hi scores");
			this.scene.start('gameTitle');
		  }, this);
		this.cameras.main.fadeIn(2000);
		this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
			//change for story mode and separate levels
			console.log("lvl1 Complete to lvl2 hi scores");
			this.scene.start('gameTitle');
		}
	}
}
