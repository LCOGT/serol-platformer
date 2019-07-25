class Instructions1 extends Phaser.Scene {
	constructor() {
		super("instructions1");
	}

	create() {
        //background
		this.lvl1InstBg = this.add.image(0,0,"instructions1");
		this.lvl1InstBg.setOrigin(0,0);
		
		//start level when bg is clicked
		this.input.once('pointerdown', function (event) {
            console.log('From Instructions 1 to Level 1');
            this.scene.start('level1');
		}, this);
		//start level when space is pressed
		this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		//TODO: audio controls
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
			console.log('From Instructions 1 to Level 1');
            this.scene.start('level1');
		}
	}
}