//Title.js
class Title extends Phaser.Scene {
	constructor() {
		super("gameTitle");
	}

	preload() {
		this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
	}

	create() {
		this.background = this.add.image(0,0,"titleScreen");
		this.background.setOrigin(0,0);
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
		
		//credits text
		this.creditsLabel = this.add.text(config.width/2, 565, "[credits]", {font:"25px Arial", fill: "yellow"}).setInteractive();
		this.creditsLabel.on('pointerdown', function (event) {
			// ...
			console.log("Title to credits");
			this.scene.start('credits');
		  }, this);
			//     self.creditsLabel.align = 'center';
			// 		//handle button click
			// 		self.creditsLabel.inputEnabled = true;
			// 		self.creditsLabel.events.onInputDown.add(
			// 			function(){
			// 				game.state.start('credits', true, false);
			// 				titlebgm.fadeOut(1000);
			// 				titlebgm.stop();
			// 			}, this);
		//start game when bg or 'press start' is clicked
		// this.input.once('pointerdown', function (event) {

        //     console.log('From Title to Instructions 1');

        //     this.scene.start('instructions1');

		// }, this);
		this.pressStart.anims.play('blink',true);
	}

	update() {
		
	}
}