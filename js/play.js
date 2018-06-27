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
      self.player.animations.add('turnRight', [1, 2], 4);
      self.player.animations.add('walkRight', [6, 7, 8, 9, 10], 4);
      self.player.animations.add('turnLeft', [1, 3], 4);
      self.player.animations.add('walkLeft', [12, 13, 14, 15, 16],4);
      self.player.animations.add('static', [1], 4);
      game.physics.enable(self.player, Phaser.Physics.ARCADE);
      self.player.body.collideWorldBounds = true;
      self.player.body.gravity.y = 96;

    },
    update: function(){
      var self = this;

      //control variables
      var facing = "front";
      var hozMove = 160;
      var vertMove = -120;
      var jumpTimer = 0;

      //initial state of Serol
      self.player.body.velocity.x = 0;
      self.player.animations.play('static');

      //controls here

      //left-right controls

      //check for left key press
      if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            self.player.body.velocity.x = -hozMove;
            /**
            TODO:
            fix walking animations
            **/
            self.player.animations.play('walkLeft');

            if (facing !== "left"){
              //play turn left animations
              self.player.animations.play('turnLeft');
              facing = "left";
            }
        }

        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            self.player.body.velocity.x = hozMove;
            //animation here?

            if (facing !== "right"){
              self.player.animations.play('turnRight');
              facing = "right";
            }
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && self.player.body.onFloor() && game.time.now > jumpTimer){
          self.player.body.velocity.y = vertMove;
          jumpTimer = game.time.now + 650;
        }

      //facing check
      if (facing === "left") {
          self.player.frame = 3;
      } else if (facing === "right") {
          self.player.frame = 2;
      } else {
        self.player.frame = 1;
      }

    }

}
