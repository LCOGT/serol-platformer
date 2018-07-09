var titleState = {
	pressStart: null,
	create: function (){
		var self = this;
		self.titleScreenImage = game.add.tileSprite(0, 0, 1024, 640, 'titlescreen');
		self.pressStart = game.add.sprite(340, 350, 'start');
		self.pressStart.scale.x = 1.5;
		self.pressStart.scale.y = 1.5;
		self.pressStart.frame = 0;
		game.add.existing(self.pressStart);
		self.pressStart.animations.add('blink', [0, 1], 2);
		game.input.activePointer.capture = true;

	},
	update: function(){
		var self = this;
		self.pressStart.animations.play('blink');
		if (game.input.activePointer.isDown) {
			game.state.start('leveltwo');
		}
	}
}
