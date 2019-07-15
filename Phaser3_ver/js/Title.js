//Title.js
class Title extends Phaser.Scene {
	constructor() {
		super("gameTitle");
	}

	preload() {
		this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
	}

	create() {
		//background
		this.titleBg = this.add.image(0,0,"titleScreen").setOrigin(0,0).setInteractive();
		this.titleBg.on('pointerdown', function (event) {
			console.log("Title to lvl1 instructions");
			this.scene.start('instructions1');
		  }, this);
		// //button to activate fullscreen
		// this.fullscreenButton = this.add.image(980, 10, "fullscreen").setOrigin(0.5, 0).setScale(0.1).setInteractive();
		// this.fullscreenButton.on('pointerup', function () {

        //     if (this.scale.isFullscreen)
        //     {                
        //         this.scale.stopFullscreen();
        //     }
        //     else
        //     {
        //         this.scale.startFullscreen();
        //     }

        // }, this);
		//start button
		this.pressStart = this.add.sprite(config.width/2, 350, "start");
		this.pressStart.setScale(1.5);
		this.anims.create({
			key:"blink",
			frames: this.anims.generateFrameNumbers('start',{
				start: 0,
				end: 1
			}),
			frameRate: 2,
			repeat: -1
		});
		this.pressStart.setInteractive();
		this.pressStart.on('pointerdown', function (event) {
			console.log("Title to lvl1 instructions");
			this.scene.start('instructions1');
		  }, this);
		//animations
		this.pressStart.anims.play('blink',true);

		//credits text
		this.creditsLabel = this.add.bitmapText(config.width/2, 550, "pixelFont", "[credits]", 60).setOrigin(0.5,0).setInteractive();
		this.creditsLabel.on('pointerdown', function (event) {
			console.log("Title to credits");
			//TODO: add audio controls
			this.scene.start('credits');
		  }, this);
	}

	update() {
		
	}
}