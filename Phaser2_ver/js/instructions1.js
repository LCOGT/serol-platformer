var instructions1 = {
	create: function (){
		var self = this;
		game.add.tileSprite(0, 0, 1024, 640, 'instructions1');
		game.input.activePointer.capture = true;
    lvl1bgm = game.add.audio('levelone_bgm', 0.8, true);
    lvl1bgm.play();
	},
	update: function(){
		var self = this;
		// self.input.keyboard.onUpCallback = function( input ){
    //   //press space logic
    //   if(input.keyCode == Phaser.Keyboard.SPACEBAR){
		// 		game.state.start('levelone', true, false);
    //   }
		// }
		if (game.input.activePointer.isDown) {
			game.state.start('levelone', true, false);

		}
	}
}
