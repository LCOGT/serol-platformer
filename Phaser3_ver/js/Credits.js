//credits.js
class Credits extends Phaser.Scene {
	constructor() {
		super('credits');
	}

	create() {
    //background
    this.creditsBg = this.add.image(0,0,"creditsBg");
    this.creditsBg.setOrigin(0,0);
    //sound
    this.creditsBGM = this.sound.add("credits_bgm");
    var musicConfig = {
        mute: false,
        volume: 0.8,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
    }
    this.creditsBGM.play(musicConfig);
    //people sprites
    this.ronnie = this.add.sprite(120, 550, 'people').setOrigin(0.5, 1);
    this.alice = this.add.sprite(270, 550, 'people').setOrigin(0.5, 1);
    this.sarah = this.add.sprite(800, 550, 'people').setOrigin(0.5, 1);
    this.edward = this.add.sprite(950, 550, 'people').setOrigin(0.5, 1);
    
    //title
    this.creditsTitle = this.add.bitmapText(config.scale.width/2, 50, "pixelFont", "Credits", 80).setOrigin(0.5,0).setCenterAlign();
    
    //labels
    this.ronnieLabel = this.add.bitmapText(120, 50, "pixelFont", "Veronika\nKravchenko", 40).setOrigin(0.5,0).setCenterAlign();
    this.aliceLabel = this.add.bitmapText(270, 100, "pixelFont", "Alice\nHopkinson", 40).setOrigin(0.5,0).setCenterAlign();
    this.sarahLabel = this.add.bitmapText(800, 100, "pixelFont", "Sarah Eve\nRoberts", 40).setOrigin(0.5,0).setCenterAlign();
    this.edwardLabel = this.add.bitmapText(950, 50, "pixelFont", "Edward\nGomez", 40).setOrigin(0.5,0).setCenterAlign();


    
    //back
    this.backLabel = this.add.bitmapText(config.scale.width/2, 550, "pixelFont", "[back]", 60).setOrigin(0.5,0).setTint(0xffb700);
    
      //animations
    this.anims.create({
      key: 'Ronnie',
      frames: this.anims.generateFrameNumbers('people', {frames: [0,3,2,1,2,3]}),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: 'Alice',
      frames: this.anims.generateFrameNumbers('people', {frames: [12,13,14,15]}),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: 'Sarah',
      frames: this.anims.generateFrameNumbers('people', {frames: [8,11,10,9,10,11,8,9,10,11]}),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: 'Edward',
      frames: this.anims.generateFrameNumbers('people', {frames: [4,5,6,7]}),
      frameRate: 4,
      repeat: -1
    });
    
    //playing animations
    this.ronnie.play("Ronnie");
    this.alice.play("Alice");
    this.sarah.play("Sarah");
    this.edward.play("Edward");

    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


  }
  update(){
    if (Phaser.Input.Keyboard.JustDown(this.enter)||Phaser.Input.Keyboard.JustDown(this.space))
    {
      this.creditsBGM.stop();
      console.log("Credits to title");
			this.scene.start('gameTitle');
    }
  }
}

