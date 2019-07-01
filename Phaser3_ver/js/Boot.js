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
		this.load.image("titleScreen", "assets/images/titlescreenlarge.png");
		this.load.image("fullscreen", "assets/images/fullscreen.png");
	}

	create() {
		this.add.text(20, 20, "Booting game...", {font:"25px Arial", fill: "yellow"});
		this.scene.start("gameTitle");
	}
}
