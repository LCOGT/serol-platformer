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
		game.load.spritesheet('telescope', 'assets/telescopes.png', 250, 250);
		game.load.spritesheet('river', 'assets/river.png', 124, 158);
		//backgrounds and screens
		game.load.image('titlescreen', 'assets/titlescreenlarge.png');
		game.load.image('level_select', 'assets/level_select.png');
		game.load.image('button', 'assets/button.png');
    game.load.image('background', 'assets/background_day_large.png');
		game.load.image('gameOverScreen', 'assets/game_over.png');
		game.load.image('endless_bg', 'assets/ground_long.png');
		game.load.image('endless_sky', 'assets/night_sky_bg.png');
		game.load.image('pipe', 'assets/pipe.png');
		//audio
		game.load.audio('collect_t', 'assets/audio/collect_t.mp3');
		game.load.audio('gain_life', 'assets/audio/gain_life.mp3');
		game.load.audio('game_over', 'assets/audio/game_over.mp3');
		game.load.audio('jump', 'assets/audio/jump.mp3');
		game.load.audio('lose_life', 'assets/audio/lose_life.mp3');

 	},
 	create: function(){
 		game.state.start('title');
 	}
 };
