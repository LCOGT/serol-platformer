//load.js
var loadState={
	preload: function(){
		var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});

		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.PageAlignHorizonally = true;
		game.scale.PageAlignVertically = true;
		game.stage.backgroundColor = '#000000';

		/**** Load graphics assets ****/
    game.load.spritesheet('serol', 'assets/serol_sprites.png', 50, 50);
    game.load.spritesheet('tetromino', 'assets/tetris_pieces.png', 16, 16);

    game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('level', "assets/level.png");
		game.load.image('background', 'assets/background_day_large.png');


 	},
 	create: function(){
 		game.state.start('title');
 	}
 };
