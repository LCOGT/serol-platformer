var level2Complete = {
	create: function (){
		var self = this;
    jingle = game.add.audio('lvl_complete');
		completeJinglePlayed = false;
    self.lvlCompleteScreen = game.add.sprite(
      game.world.centerX,
      game.world.centerY,
      'lvl2_complete');
      self.lvlCompleteScreen.anchor.setTo(0.5, 0.41);
      self.lvlCompleteScreen.alpha = 0;

		game.input.activePointer.capture = true;

	},
	update: function(){
		var self = this;
    if (completeJinglePlayed == false){
      jingle.play();
      completeJinglePlayed = true;
    }

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
          fill: "#ffffff",
          align: "center"
        });
        score.anchor.setTo(0.5, 0);
     },
     this);

		if (game.input.activePointer.isDown) {
			game.state.start('hiScores', true, false);

		}
	}
}
