//Made using Dan Cox's YouTube tutorials
//https://www.youtube.com/watch?v=6U0Wy6wWK8M

(function (Phaser) {

    var game = new Phaser.Game(
            500, 500,
            Phaser.AUTO,
            'phaser',
            {
                preload: preload,
                create: create,
                update: update
            }
    );

    function preload() {
        game.load.spritesheet('character', 'assets/character.png', 40, 64);
    }

    var player;
    var facing = "left";
    var hozMove = 160;
    var vertMove = -120;
    var jumpTimer = 0;

    function create() {

        game.stage.backgroundColor = '#D3D3D3';

        game.physics.startSystem(Phaser.Physics.ARCADE);

        player = game.add.sprite(2 * 48, 6 * 48, 'character');

        game.physics.enable(player);

        player.body.collideWorldBounds = true;

        player.body.gravity.y = 96;

    }

    function update() {

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
            player.frame = 1;
        } else {
            player.frame = 0;
        }

    }

}(Phaser));
