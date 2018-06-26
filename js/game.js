//Made using Dan Cox's YouTube tutorials
//https://www.youtube.com/watch?v=6U0Wy6wWK8M

(function (Phaser) {

    var game = new Phaser.Game(
            800, 600,
            Phaser.AUTO,
            'phaser',
            {
                preload: preload,
                create: create,
                update: update
            }
    );

    function preload() {
        game.load.spritesheet('serol', 'assets/serol_sprites.png', 50, 50);
        game.load.spritesheet('tetromino', 'assets/tetris_pieces.png', 18, 20);
        //background level
        game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('level', "assets/level.png");
    }

    var player;
    var collectible;
    var facing = "left";
    var hozMove = 160;
    var vertMove = -120;
    var jumpTimer = 0;

    //background level
    var map;
    var layer;

    function create() {

        game.stage.backgroundColor = '#D3D3D3';

        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Tilemap
        map = game.add.tilemap('map');
        map.addTilesetImage('level');
        map.setCollisionBetween(1, 5);
        layer = map.createLayer('Tile Layer 1');
        layer.resizeWorld();
        //end tilemap

        player = game.add.sprite(7 * 64, 4 * 64, 'serol');
        collectible = game.add.sprite(5 * 64, 3 * 64, 'tetromino')

        game.physics.enable(player);
        game.physics.enable(collectible);

        player.body.gravity.y = 96;
        collectible.body.gravity.y = 50;

        // Set the camera to follow the 'player'
        game.camera.follow(player);

    }

    function update() {
        //collision
        game.physics.arcade.collide(player, layer);

        player.body.velocity.x = 0;

        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            player.body.velocity.x = -hozMove;

            if (facing !== "left")
            {
                facing = "left";
            }
        }

        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            player.body.velocity.x = hozMove;

            if (facing !== "right")
            {
                facing = "right";
            }
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && player.body.onFloor() && game.time.now > jumpTimer)
        {
            player.body.velocity.y = vertMove;
            jumpTimer = game.time.now + 650;
        }

        if (facing === "left") {
            player.frame = 3;
        } else {
            player.frame = 2;
        }

    }

}(Phaser));
