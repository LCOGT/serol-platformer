var hiScores = {
	create: function (){
		var self = this;
		game.add.tileSprite(0, 0, 1024, 640, 'background');

		game.input.activePointer.capture = true;

	},
	update: function(){
		var self = this;
		if (game.input.activePointer.isDown) {
			game.state.start('title');
		}
	}
}
