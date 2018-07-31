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
    game.load.spritesheet('tetromino', 'assets/tetrominos.png', 75, 75);
		game.load.spritesheet('start', 'assets/click_start.png', 219, 26);
		game.load.spritesheet('junk', 'assets/junk.png', 75, 75);
		game.load.spritesheet('lives', 'assets/batterylife.png', 32, 32);
		game.load.spritesheet('1up', 'assets/battery.png', 64, 43);
		game.load.spritesheet('telescope', 'assets/telescopes_highlight.png', 250, 250);
		game.load.spritesheet('river', 'assets/river.png', 166, 179);
		game.load.spritesheet('obstacle', 'assets/obstacles.png', 135, 75);
		game.load.spritesheet('buttons', 'assets/buttons.png', 242, 72);
		game.load.spritesheet('people', 'assets/credits.png', 160, 412);
		//backgrounds and screens
		game.load.image('titlescreen', 'assets/titlescreenlarge.png');
		game.load.image('level_select', 'assets/level_select.png');
		game.load.image('button', 'assets/button.png');
		game.load.image('instructions', 'assets/L1_instructions.png');
    game.load.image('background', 'assets/background_day_large.png');
		game.load.image('night_background', 'assets/credits_bg.png');
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
		game.load.audio('title_bgm', 'assets/audio/serol_start.mp3');
		game.load.audio('menu_bgm', 'assets/audio/serol_level_select.mp3');
		game.load.audio('credits_bgm', 'assets/audio/serol_credits.mp3');
		game.load.audio('levelone_bgm', 'assets/audio/serol_level1.mp3');

 	},
 	create: function(){
 		game.state.start('title');
 	}
 };
