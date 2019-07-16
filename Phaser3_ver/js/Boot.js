//boot.js

class Boot extends Phaser.Scene {
	constructor() {
		super("bootGame");
	}

	preload() {
		//fonts
		this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
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
		this.load.image("stage", "assets/images/stage_blank.png");
		this.load.image('lvl1_complete', 'assets/images/L1_complete.png');

			//level 2
		this.load.image("endless_bg", "assets/images/ground_long.png");
			//game over
		this.load.image("gameOver", "assets/images/game_over.png");
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
		this.load.spritesheet('tetromino1', 'assets/images/tet2x4.png', {
			frameWidth: 34,
			frameHeight: 68
		});
		this.load.spritesheet('junk', 'assets/images/junk_items.png', {
			frameWidth: 45, 
			frameHeight: 60
		});
		this.load.spritesheet('1up', 'assets/images/battery.png', {
			frameWidth: 64,
			frameHeight: 43
		});
		this.load.spritesheet('charge', 'assets/images/batterylife1.png', {
			frameWidth: 28,
			frameHeight: 12
		});
		
		//sounds

	}

	create() {
		this.add.text(20, 20, "Booting game...", {font:"25px Arial", fill: "yellow"});
		this.scene.start("gameTitle");
	}
}
