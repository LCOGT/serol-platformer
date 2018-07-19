var instructions = {
	create: function (){
		var self = this;
		game.add.tileSprite(0, 0, 1024, 640, 'instructions');
		game.input.activePointer.capture = true;
    lvl1bgm = game.add.audio('levelone_bgm', 0.8, true);
    lvl1bgm.play();
	},
	update: function(){
		var self = this;
		if (game.input.activePointer.isDown) {
			game.state.start('levelone', true, false);

		}
	}
}
