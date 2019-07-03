//boot.js

// var bootState = {
// 	create: function () {
// 		game.physics.startSystem(Phaser.Physics.ARCADE);
// 		game.state.start('load');
// 	}
// };
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
			//level 1
		//spritesheets
		this.load.spritesheet("start", "assets/images/click_start.png", {
			frameWidth: 219,
			frameHeight: 26
		});
		this.load.spritesheet("people", "assets/images/credits.png", {
			frameWidth: 160,
			frameHeight: 412
		});
		//sounds

	}

	create() {
		this.add.text(20, 20, "Booting game...", {font:"25px Arial", fill: "yellow"});
		this.scene.start("gameTitle");
	}
}
