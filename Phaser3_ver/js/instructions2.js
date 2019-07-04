//Instructions2.js
class Instructions2 extends Phaser.Scene {
	constructor() {
		super("instructions2");
	}

	create() {
        //background
		this.lvl2InstBg = this.add.image(0,0,"instructions2");
		this.lvl2InstBg.setOrigin(0,0);
		
		//start level when bg is clicked
		this.input.once('pointerdown', function (event) {
            console.log('From Instructions 2 to Level 2');
            this.scene.start('level2');
		}, this);
		//start level when space is pressed

		//TODO: audio controls
	}

	update() {
		
	}
}
