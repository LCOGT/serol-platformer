//load.js
var loadState={
	preload: function(){
		var loadingLabel = game.add.text(350, 350, 'loading...', {font: '40px Courier', fill: '#ffffff'});

		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.PageAlignHorizonally = true;
		game.scale.PageAlignVertically = true;
		game.stage.backgroundColor = '#000000';

		/*Load graphics assets */
		//sprites
    game.load.spritesheet('serol', 'assets/serol_sprites_condensed.png', 138, 131);
    game.load.spritesheet('tetromino', 'assets/tetris_pieces.png', 15, 15);
		game.load.spritesheet('start', 'assets/click_start.png', 219, 26);
		game.load.spritesheet('junk', 'assets/random_objects.png', 52, 52);
		game.load.spritesheet('lives', 'assets/batterylife.png', 32, 32);
		game.load.spritesheet('1up', 'assets/battery.png', 64, 43);
		//backgrounds and screens
    game.load.image('background', 'assets/background_day_large.png');
		game.load.image('titlescreen', 'assets/titlescreenlarge.png');
		game.load.image('gameOverScreen', 'assets/game_over.png');


 	},
 	create: function(){
 		game.state.start('title');
 	}
 };
