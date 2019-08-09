class Instructions3 extends Phaser.Scene {
	constructor() {
		super("instructions3");
	}

	create() {
        //background
		this.lvl3InstBg = this.add.image(0,0,"instructions3");
		this.lvl3InstBg.setOrigin(0,0).setInteractive();
		
		//start level when bg is clicked
		this.lvl3InstBg.on('pointerdown', function (event) {
            console.log('From Instructions 3 to Level 3');
            this.scene.start('level3');
		}, this);
		//start level when space is pressed
		this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		//TODO: audio controls
		//back
		this.backLabel = this.add.bitmapText(config.scale.width/2, 550, "pixelFont", "[Press SPACE to go back to Title]", 60).setOrigin(0.5,0);
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.enter)){
			console.log('From Instructions 3 to Level 3');
            this.scene.start('level3');
		}
		if (Phaser.Input.Keyboard.JustDown(this.space)){
			console.log('From Instructions 3 to Title');
            this.scene.start('gameTitle');
		}
	}
}