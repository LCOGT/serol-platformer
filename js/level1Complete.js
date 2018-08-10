// var jinglePlayed = false;
var level1Complete = {
	create: function (){
		var self = this;
    // jingle = game.add.audio('game_over');
    self.lvlCompleteScreen = game.add.sprite(
      game.world.centerX,
      game.world.centerY,
      'lvl1_complete');
      self.lvlCompleteScreen.anchor.setTo(0.5, 0.41);
      self.lvlCompleteScreen.alpha = 0;

		game.input.activePointer.capture = true;

	},
	update: function(){
		var self = this;
    // if (jinglePlayed == false){
    //   jingle.play();
    //   jinglePlayed = true;
    // }

    game.add.tween(self.lvlCompleteScreen).to( { alpha: 1 },
       500,
       Phaser.Easing.Linear.None,
       true,
       0,
       500,
       true);

    game.time.events.add(Phaser.Timer.SECOND,
      function(){
        score = game.add.text(game.world.centerX, 500, ("Your score: " + counterVal), {
          font: "32px 'Press Start 2P'",
          fill: "#110077",
          align: "center"
        });
        score.anchor.setTo(0.5, 0);
     },
     this);

		if (game.input.activePointer.isDown) {
			game.state.start('leveltwo', true, false);

		}
	}
}