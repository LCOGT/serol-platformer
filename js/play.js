//Made using Dan Cox's YouTube tutorials
//https://www.youtube.com/watch?v=6U0Wy6wWK8M

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

        /**
        TODO:
        make a Player function which will have all the
        attributes for Serol
        **/
        player = game.add.sprite(7 * 64, 4 * 64, 'serol');
        game.camera.follow(player);
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

        // game.physics.enable(player);
        // //enable tetromino physic here
        //
        // player.body.gravity.y = 96;
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
}
