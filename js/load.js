//load.js
var loadState={
	preload: function(){
		var loadingLabel = game.add.text(350, 350, 'loading...', {font: '40px Courier', fill: '#ffffff'});

		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.PageAlignHorizonally = true;
		game.scale.PageAlignVertically = true;
		game.stage.backgroundColor = '#000000';

		/**** Load graphics assets ****/
    game.load.spritesheet('serol', 'assets/serol_sprites_big_2.png', 140, 180);
    game.load.spritesheet('tetromino', 'assets/tetris_pieces.png', 16, 16);
		game.load.spritesheet('start', 'assets/click_start.png', 219, 26);
    game.load.image('background', 'assets/background_day_large.png');
		game.load.image('titlescreen', 'assets/titlescreenlarge.png');


 	},
 	create: function(){
 		game.state.start('title');
 	}
 };
