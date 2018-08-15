var instructions2 = {
	create: function (){
		var self = this;
		game.add.tileSprite(0, 0, 1024, 640, 'instructions2');
		game.input.activePointer.capture = true;
		lvl2bgm = game.add.audio('leveltwo_bgm');
    lvl2bgm.play();
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
			game.state.start('leveltwo', true, false);

		}
	}
}
