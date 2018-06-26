//load.js
var loadState={
	preload: function(){
		// var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});

		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.PageAlignHorizonally = true;
		game.scale.PageAlignVertically = true;
		game.stage.backgroundColor = '#D3D3D3';

		/**** Load graphics assets ****/
    game.load.spritesheet('serol', 'assets/serol_sprites.png', 50, 50);
    game.load.spritesheet('tetromino', 'assets/tetris_pieces.png', 18, 20);
    //background level
    game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('level', "assets/level.png");
		// game.load.image('background', 'assets/background_day:_large.png');


 	},
 	create: function(){
 		game.state.start('title');
 	}
 };
