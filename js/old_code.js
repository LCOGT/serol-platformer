var playState = {

    player: null,
    tetris_pieces: null,
    //background of the level
    layer: null,

    create: function() {
        var self = this;
        // this.game.add.tileSprite(0, 0, 1000, 600, 'background');
        //Tilemap
        var map = game.add.tilemap('map');
        map.addTilesetImage('level');
        map.setCollisionBetween(1, 5);

        self.layer = map.createLayer('Tile Layer 1');
        self.layer.resizeWorld();
        //end tilemap

        self.player = new Player(7 * 64, 4 * 64);
        game.add.existing(self.player);
        game.camera.follow(self.player);
        game.physics.enable(self.player, Phaser.Physics.ARCADE);
        self.player.body.gravity.y = 96;
        // tetris_pieces = game.add.sprite(5 * 64, 3 * 64, 'tetromino')

        /**
        TODO:
        make a Tetromino function to represent the tetromino objects
        with its attributes
        **/

        /**
        TODO:
        create "helper functions" which will be responsible for controls
        **/

        // tetris_pieces = game.add.group({
        //   key: 'tetromino',
        //   repeat: 10,
        //   setXY: {x: 70, y: 0, stepX: 70}
        // });

        // tetris_pieces.children.iterate(function (child)){
        //   child.frame = Math.floor(Math.random()*60);
        // }

        //enable tetromino physic here
        //
        //
        // //tetromino gravity here
        //
        // // Set the camera to follow the 'player'


    },

    update: function() {
        // //collision
        // game.physics.arcade.collide(player, layer);
        // // game.physics.add.overlap(player, collectible, collectTetromino, null, game);
        // player.body.velocity.x = 0;
        //
        // if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        // {
        /**
        TODO:
        define hozMove and jumpTimer again
        **/
        //     player.body.velocity.x = -hozMove;
        //
        //     if (facing !== "left")
        //     {
        //         facing = "left";
        //     }
        // }
        //
        // else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        // {
        //     player.body.velocity.x = hozMove;
        //
        //     if (facing !== "right")
        //     {
        //         facing = "right";
        //     }
        // }
        //
        // if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && player.body.onFloor() && game.time.now > jumpTimer)
        // {
        //     player.body.velocity.y = vertMove;
        //     jumpTimer = game.time.now + 650;
        // }
        //
        // if (facing === "left") {
        //     player.frame = 3;
        // } else {
        //     player.frame = 2;
        // }
    }
};

/**
TODO:
make a Player function which will have all the
attributes for Serol
**/
function Player(x, y) {
  var player = game.add.sprite(x, y, 'serol');
  player.frame = 1;

}
