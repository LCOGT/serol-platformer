//Level2.js
class Level2 extends Phaser.Scene {
	constructor() {
		super("level2");
	}

	create() {
        //background
		this.runnerBg = this.add.tileSprite(0, 0, game.config.width, game.config.height, "endless_bg");
    this.runnerBg.setOrigin(0,0);
    this.runnerBg.setScrollFactor(0);
		
		//TODO: spawn Serol and add controls
	}

	update() {
		
	}
}