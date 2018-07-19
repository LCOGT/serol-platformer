var jinglePlayed = false
var gameOver = {
	create: function (){
		var self = this;
    jingle = game.add.audio('game_over');
    self.gameOverScreen = game.add.sprite(
      game.world.centerX,
      game.world.centerY,
      'gameOverScreen');
      self.gameOverScreen.anchor.setTo(0.5, 0.425);
      self.gameOverScreen.alpha = 0;

		game.input.activePointer.capture = true;

	},
	update: function(){
		var self = this;
    if (jinglePlayed == false){
      jingle.play();
      jinglePlayed = true;
    }

    game.add.tween(self.gameOverScreen).to( { alpha: 1 },
       500,
       Phaser.Easing.Linear.None,
       true,
       0,
       500,
       true);

    game.time.events.add(Phaser.Timer.SECOND,
      function(){
        game.add.text(280, 280, ("Your score: " + counterVal), {
          font: "32px 'Press Start 2P'",
          fill: "#ffffff",
          align: "center"
        });
     },
     this);

		if (game.input.activePointer.isDown) {
			game.state.start('hiScores', true, false);

		}
	}
}
