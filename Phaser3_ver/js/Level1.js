class Level1 extends Phaser.Scene {
	constructor() {
		super("level1");
	}

	create() {
    //background
    console.log('Loading bg...');
    this.lvl1Bg = this.add.image(0,0,"lvl1Bg").setOrigin(0,0);
    // this.bgImage = this.add.tileSprite(0, 0, 1024, 640, 'lvl1Bg');
    // this.bgImage.setOrigin(0,0);
    //TODO: spawn Serol and add controls

    //spawning serol
    this.serol = new Serol(this, 250, 50)	
    this.serol.anims.play('staticBob',true);

    //enabling controls
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.serol.setCollideWorldBounds(true);

  }

	update() {
    this.movePlayerManager();
  }
  
  movePlayerManager(){
    if (this.cursorKeys.left.isDown) {
      this.serol.setVelocityX(-gameSettings.playerXSpeed);
      this.serol.anims.play('walkLeft',true);
    }
    else if(this.cursorKeys.right.isDown) {
      this.serol.setVelocityX(gameSettings.playerXSpeed);
      this.serol.anims.play('walkRight',true);
    }
    else {
      this.serol.anims.play('staticBob',true)
      this.serol.setVelocityX(0);
    }
    if(this.cursorKeys.up.isDown && this.serol.body.onFloor()) {
      this.serol.setVelocityY(-gameSettings.playerYSpeed);
    }
  }
}

/* Serol Class */
class Serol extends Phaser.Physics.Arcade.Sprite {
  // healthBar
  constructor(scene, x = 0, y = 0, texture = 'serol') {
    super(scene, x, y, texture)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    scene.events.on('update', this.update, this)

    scene.anims.create({
      key: 'staticBob',
      frames: scene.anims.generateFrameNumbers('serol', {frames: [30,31,30,31,32,33]}),
      frameRate: 4,
      repeat: -1
    });

    scene.anims.create({
      key: 'static',
      frames: scene.anims.generateFrameNumbers('serol', {frames: [1,1]}),
      frameRate: 4,
      repeat: -1
    });

    scene.anims.create({
      key: 'staticRight',
      frames: scene.anims.generateFrameNumbers('serol', {frames: [18,19,20,21]}),
      frameRate: 4,
      repeat: -1
    });

    scene.anims.create({
      key: 'walkRight',
      frames: scene.anims.generateFrameNumbers('serol', {frames: [6,7,8,9,10,11]}),
      frameRate: 4,
      repeat: -1
    });

    scene.anims.create({
      key: 'staticLeft',
      frames: scene.anims.generateFrameNumbers('serol', {frames: [24,25,26,27]}),
      frameRate: 4,
      repeat: -1
    });

    scene.anims.create({
      key: 'walkLeft',
      frames: scene.anims.generateFrameNumbers('serol', {frames: [12,13,14,15,16,17]}),
      frameRate: 4,
      repeat: -1
    });

    scene.anims.create({
      key: 'sleeping',
      frames: scene.anims.generateFrameNumbers('serol', {frames: [28,29,28,29]}),
      frameRate: 4,
      repeat: -1
    });

    // this.lives = new Lives(scene)
  }

  update() {
    // this.lives.follow(this)
  }
}

/* Battery health bar Class */
class Lives extends Phaser.GameObjects.Sprite {
  constructor(scene, x = 0, y = 0, texture = 'lives') {
    super(scene, x, y, texture)

    scene.add.existing(this)
  }

  follow(serol) {
    this.setX(serol.x)
    this.setY(serol.y - 50)
  }
}