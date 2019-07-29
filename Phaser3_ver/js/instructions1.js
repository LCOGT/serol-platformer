class Instructions1 extends Phaser.Scene {
	constructor() {
		super("instructions1");
	}

	create() {
        //background
		this.lvl1InstBg = this.add.image(0,0,"instructions1");
		this.lvl1InstBg.setOrigin(0,0).setInteractive();
		
		//start level when bg is clicked
		this.lvl1InstBg.on('pointerdown', function (event) {
            console.log('From Instructions 1 to Level 1');
            this.scene.start('level1');
		}, this);
		//start level when space is pressed
		this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		//TODO: audio controls
		//back
		this.backLabel = this.add.bitmapText(config.scale.width/2, 550, "pixelFont", "[Back to Title]", 60).setOrigin(0.5,0).setInteractive();
		this.backLabel.on('pointerdown', function (event) {
		  console.log("instructions to title");
				this.scene.start('gameTitle');
			  }, this);
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.enter)){
			console.log('From Instructions 1 to Level 1');
            this.scene.start('level1');
		}
	}
}