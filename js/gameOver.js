var gameOver = {
	create: function (){
		var self = this;
		//game.add.tileSprite(0, 0, 1024, 640, 'gameOverScreen');
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
