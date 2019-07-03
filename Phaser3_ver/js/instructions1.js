// var instructions1 = {
// 	create: function (){
// 		var self = this;
// 		game.add.tileSprite(0, 0, 1024, 640, 'instructions1');
// 		game.input.activePointer.capture = true;
//     lvl1bgm = game.add.audio('levelone_bgm', 0.8, true);
//     lvl1bgm.play();
// 	},
// 	update: function(){
// 		var self = this;
// 		// self.input.keyboard.onUpCallback = function( input ){
//     //   //press space logic
//     //   if(input.keyCode == Phaser.Keyboard.SPACEBAR){
// 		// 		game.state.start('levelone', true, false);
//     //   }
// 		// }
// 		if (game.input.activePointer.isDown) {
// 			game.state.start('levelone', true, false);

// 		}
// 	}
// }
class Instructions1 extends Phaser.Scene {
	constructor() {
		super("instructions1");
	}


	create() {
        //background
		this.background = this.add.image(0,0,"titleScreen");
		this.background.setOrigin(0,0);
		
		//start level when bg is clicked
		this.input.once('pointerdown', function (event) {

            console.log('From Instructions 1 to Level 1');

            this.scene.start('Level1');

        }, this);
	}

	update() {
		
	}
}