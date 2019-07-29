//Instructions2.js
class Instructions2 extends Phaser.Scene {
	constructor() {
		super("instructions2");
	}

	create() {
        //background
		this.lvl2InstBg = this.add.image(0,0,"instructions2");
		this.lvl2InstBg.setOrigin(0,0).setInteractive();
		//back
		this.backLabel = this.add.bitmapText(config.scale.width/2, 550, "pixelFont", "[Back to Title]", 60).setOrigin(0.5,0).setInteractive();
		this.backLabel.on('pointerdown', function (event) {
		  console.log("instructions to title");
				this.scene.start('gameTitle');
			  }, this);		
		//start level when bg is clicked
		this.lvl2InstBg.on('pointerdown', function (event) {
            console.log('From Instructions 2 to Level 2');
            this.scene.start('level2');
		}, this);
		//start level when space is pressed
		this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		//TODO: audio controls
		
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.enter)){
			console.log('From Instructions 2 to Level 2');
            this.scene.start('level2');
		}
	}
}
