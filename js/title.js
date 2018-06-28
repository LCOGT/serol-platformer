var titleState = {
	create: function (){
		titleScreenImage = game.add.tileSprite(0, 0, 1024, 640, 'titlescreen');
		game.input.activePointer.capture = true;
		var nameLabel = game.add.text(
			350, 350,
			'CLICK START',
			{font: '50px Courier', fill: '#ffffff'}
		);

	},
	update: function(){
		if (game.input.activePointer.isDown) {
			game.state.start('play')
		}
	}
}
