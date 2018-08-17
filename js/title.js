var counterVal;
var lifeCount = 3;
var endGame = false;
var titleState = {
	pressStart: null,
	create: function (){
		var self = this;
		counterVal = 0;
		if (endGame === true) {
			endGame = false;
			lifeCount = 3;
			counterVal = 0;
			jinglePlayed = false;
		}
		titlebgm = game.add.audio('title_bgm', 1, true);
		titlebgm.play();
		self.titlescreen = game.add.tileSprite(0, 0, 1024, 640, 'titlescreen');

		self.pressStart = game.add.sprite(self.world.centerX, 350, 'start');
		self.pressStart.scale.x = 1.5;
		self.pressStart.scale.y = 1.5;
		self.pressStart.frame = 0;
		self.pressStart.anchor.setTo(0.5, 0);
		game.add.existing(self.pressStart);
		self.pressStart.animations.add('blink', [0, 1], 2);

		// self.creditsButton = game.add.sprite(self.world.centerX , 550, 'buttons');
		// self.creditsButton.anchor.setTo(0.5, 0);
		// self.creditsButton.frame = 1;
		// game.add.existing(self.creditsButton);

		//button text
		self.creditsLabel = self.game.add.text(self.world.centerX, 565,
			"[credits]",
			{font: "30px 'Press Start 2P'", fill: "#ffffff"});
    self.creditsLabel.anchor.setTo(0.5, 0);
    self.creditsLabel.align = 'center';
		//handle button click
		self.creditsLabel.inputEnabled = true;
		self.creditsLabel.events.onInputDown.add(
			function(){
				game.state.start('credits', true, false);
				titlebgm.fadeOut(1000);
				titlebgm.stop();
			}, this);

		//fullscreen setting
		// Maintain aspect ratio
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		//button to activate fullscreen
		self.fullscreenButon = game.add.sprite(980, 10, 'fullscreen');
		self.fullscreenButon.anchor.setTo(0.5, 0);
		self.fullscreenButon.scale.y = 0.1;
		self.fullscreenButon.scale.x = 0.1;
		game.add.existing(self.fullscreenButon);
		self.fullscreenButon.inputEnabled = true;
		self.fullscreenButon.events.onInputDown.add(
			function(){
				if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen(false);
    }
			},this);

		self.titlescreen.inputEnabled = true;
		self.titlescreen.events.onInputDown.add(
			function(){
				titlebgm.fadeOut(1000);
				titlebgm.stop();
				game.state.start('instructions2', true, false);
			},this);
			// self.input.activePointer.capture = true;

	},
	update: function(){
		var self = this;
		self.pressStart.animations.play('blink');
	}
}
