class Level1 extends Phaser.Scene {
	constructor() {
		super("level1");
	}
  grav = 40;
	create() {
    //background
    console.log('Loading bg...');
    this.lvl1Bg = this.add.image(0,0,"lvl1Bg").setOrigin(0,0);
    //floor platform
    this.stagePlatform = this.add.tileSprite(config.width/2, 640, 0, 0, 'stage').setOrigin(0.5, 0.8);
    this.physics.add.existing(this.stagePlatform, true);
    this.stagePlatform.enableBody = true;
    this.stagePlatform.body.immovable = true;

    //spawning serol
    this.serol = new Serol(this, 250, 50);
    this.physics.add.existing(this.serol);
    this.serol.anims.play('staticBob',true);
    //colliding with floor platform
    this.physics.add.collider(this.stagePlatform, this.serol);
    
    //enabling serol controls
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.serol.setCollideWorldBounds(true);

    //spawning tetrominos
    this.tet1 = new Tetromino(this, 250, 50);
    this.physics.add.existing(this.tet1);
    this.tet1.body.setAllowGravity(false);
    this.tet1.body.moves = true;

    //enabling collisions between serol and tetrominos
    this.physics.add.collider(this.tet1, this.serol);

    
  }

	update() {
    this.movePlayerManager();
    this.tetFall(this.tet1, 20);
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
  //falling tetrominos
  tetFall(tetromino, accel) {
    tetromino.body.setAcceleration(0,accel);
    if (tetromino.y > config.height) {
      this.tetReset(tetromino);
    } else if (tetromino.y < 0){
      this.tetReset(tetromino);
    }
    if (tetromino.x > config.width) {
      this.tetReset(tetromino);
    } else if (tetromino.x < 0){
      this.tetReset(tetromino);
    }
  }
  tetReset(tetromino) {
    tetromino.y = 0;
    var randomX = Phaser.Math.Between(0, config.width);
    tetromino.x = randomX;
    tetromino.setFrame(Phaser.Math.Between(0, 59));
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

/*tetromino class*/
class Tetromino extends Phaser.GameObjects.Sprite {
  constructor(scene, x=0, y=0, texture = 'tetromino', frame = Phaser.Math.Between(0, 60)) {
    super(scene,x,y,texture,frame)
    scene.add.existing(this)
    scene.events.on('update', this.update, this)
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