var counterVal = 0;
var lifeCount = 3;
var endGame = false;
var titleState = {
	pressStart: null,
	create: function (){
		var self = this;
		titlebgm = game.add.audio('title_bgm', 1, true);
		titlebgm.play();
		game.add.tileSprite(0, 0, 1024, 640, 'titlescreen');

		self.pressStart = game.add.sprite(self.world.centerX, 350, 'start');
		self.pressStart.scale.x = 1.5;
		self.pressStart.scale.y = 1.5;
		self.pressStart.frame = 0;
		self.pressStart.anchor.setTo(0.5, 0);
		game.add.existing(self.pressStart);
		self.pressStart.animations.add('blink', [0, 1], 2);

		self.creditsButton = game.add.sprite(self.world.centerX , 550, 'buttons');
		self.creditsButton.anchor.setTo(0.5, 0);
		self.creditsButton.frame = 2;
		game.add.existing(self.creditsButton);
		//handle button click
		self.creditsButton.inputEnabled = true;
		self.creditsButton.events.onInputDown.add(
			function(){
				game.state.start('credits', true, false);
				titlebgm.fadeOut(1000);
				titlebgm.stop();
			}, this);
		//button text
		self.creditsLabel = self.game.add.text(self.world.centerX, 565,
			"credits",
			{font: "30px 'Press Start 2P'", fill: "#ffffff"});
    self.creditsLabel.anchor.setTo(0.5, 0);
    self.creditsLabel.align = 'center';


		game.input.activePointer.capture = true;

	},
	update: function(){
		var self = this;
		self.pressStart.animations.play('blink');
		if (game.input.activePointer.isDown) {
			titlebgm.fadeOut(1000);
			titlebgm.stop();
			game.state.start('instructions', true, false);
			if (endGame === true) {
				endGame = false;
				lifeCount = 3;
				counterVal = 0;
				jinglePlayed = false;
			}
		}
	}
}
