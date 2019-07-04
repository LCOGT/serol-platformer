//boot.js

class Boot extends Phaser.Scene {
	constructor() {
		super("bootGame");
	}

	preload() {
		//fonts

		//images
			//titlescreen
		this.load.image("titleScreen", "assets/images/titlescreenlarge.png");
		this.load.image("fullscreen", "assets/images/fullscreen.png");
			//credits
		this.load.image("creditsBg", "assets/images/credits_bg.png");
			//instructions
		this.load.image("instructions1", "assets/images/L1_instructions.png");
		this.load.image("instructions2", "assets/images/L2_instructions.png");
			//level 1
		this.load.image("lvl1Bg", "assets/images/background_day_large.png");
			//level 2
		this.load.image("endless_bg", "assets/images/ground_long.png");
		//spritesheets
		this.load.spritesheet("start", "assets/images/click_start.png", {
			frameWidth: 219,
			frameHeight: 26
		});
		this.load.spritesheet("people", "assets/images/credits.png", {
			frameWidth: 160,
			frameHeight: 412
		});
		this.load.spritesheet("serol", "assets/images/serol_sprites_condensed.png", {
			frameWidth: 138,
			frameHeight: 131
		});
		this.load.spritesheet('lives', 'assets/batterylife.png', {
			frameWidth: 32,
			frameHeight: 32
		});


		//sounds

	}

	create() {
		this.add.text(20, 20, "Booting game...", {font:"25px Arial", fill: "yellow"});
		this.scene.start("gameTitle");
	}
}
