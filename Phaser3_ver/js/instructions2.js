//Instructions2.js
class Instructions2 extends Phaser.Scene {
	constructor() {
		super("instructions2");
	}

	create() {
        //background
		this.lvl2InstBg = this.add.image(0,0,"instructions2");
		this.lvl2InstBg.setOrigin(0,0);
		//back
		this.backLabel = this.add.bitmapText(config.scale.width/2, 570, "pixelFont", "[Press SPACE to go back to Title]", 60).setOrigin(0.5,0);	
		//start level when space is pressed
		this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		//TODO: audio controls
		
	}

	update() {
		let pad = Phaser.Input.Gamepad.Gamepad;

    	if (this.input.gamepad.total){
      		pad = this.input.gamepad.getPad(0);
    	}
		if (Phaser.Input.Keyboard.JustDown(this.enter) || pad.B){
			// console.log('From Instructions 2 to Level 2');
			this.scene.start('level2');
			// console.log("Stopping current Scene");
			this.scene.stop();
		}
		if (Phaser.Input.Keyboard.JustDown(this.space) || pad.A){
			// console.log('From Instructions 2 to Title');
			this.scene.start('gameTitle');
			// console.log("Stopping current Scene");
			this.scene.stop();
		}
	}
}
