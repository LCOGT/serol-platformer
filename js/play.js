//Made using Dan Cox's YouTube tutorials
//https://www.youtube.com/watch?v=6U0Wy6wWK8M

//Made using Brian Greig's YouTube tutorials
//https://www.youtube.com/watch?v=mBEVHWUelWs

var playState = {
  player: null,
    create: function(){
      var self = this;
      game.stage.backgroundColor = '#D3D3D3';
      bgImage = game.add.tileSprite(0, 0, 800, 600, 'background');

      self.player = game.add.sprite(7 * 64, 4 * 64, 'serol');
      self.player.frame = 1;
      game.add.existing(self.player);
      //animate and activate physics for Serol
      self.player.animations.add('walkRight', [6, 7, 8, 9, 10], 4);
      self.player.animations.add('walkLeft', [12, 13, 14, 15, 16],4);
      self.player.animations.add('static', [])
      game.physics.enable(self.player, Phaser.Physics.ARCADE);
      self.player.body.collideWorldBounds = true;
      self.player.body.gravity.y = 96;

    },
    update: function(){
      var self = this;

      self.player.body.velocity.x = 0;
      //controls here
      if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){

      }


      self.player.animations.play('walkRight');

    }

}
