class Instructions3 extends Phaser.Scene {
	constructor() {
		super("instructions3");
	}

	create() {
        //background
		this.lvl3InstBg = this.add.image(0,0,"instructions3");
		this.lvl3InstBg.setOrigin(0,0);
		//start level when space is pressed
		this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		//back
		this.backLabel = this.add.bitmapText(config.scale.width/2, 580, "pixelFont", "[Press SPACE to go back to Title]", 60).setOrigin(0.5,0);
	}

	update() {
		let pad = Phaser.Input.Gamepad.Gamepad;

    	if (this.input.gamepad.total){
			  pad = this.input.gamepad.getPad(0);
		}
		if (Phaser.Input.Keyboard.JustDown(this.enter) || pad.B){
			// console.log('From Instructions 3 to Level 3');
			this.scene.start('level3');
			// console.log("Stopping current Scene");
			this.scene.stop();
		}
		if (Phaser.Input.Keyboard.JustDown(this.space) || pad.A){
			// console.log('From Instructions 3 to Title');
			this.scene.start('gameTitle');
			// console.log("Stopping current Scene");
			this.scene.stop();
		}
	}
}