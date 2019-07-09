//credits.js
class Credits extends Phaser.Scene {
	constructor() {
		super('credits');
	}

	create() {
    //background
    this.creditsBg = this.add.image(0,0,"creditsBg");
    this.creditsBg.setOrigin(0,0);

    //people sprites
    this.ronnie = this.add.sprite(120, 550, 'people').setOrigin(0.5, 1);
    this.alice = this.add.sprite(270, 550, 'people').setOrigin(0.5, 1);
    this.sarah = this.add.sprite(800, 550, 'people').setOrigin(0.5, 1);
    this.edward = this.add.sprite(950, 550, 'people').setOrigin(0.5, 1);
    
    //title
    this.creditsTitle = this.add.bitmapText(config.width/2, 50, "pixelFont", "Credits", 80).setOrigin(0.5,0).setCenterAlign();
    
    //labels
    this.ronnieLabel = this.add.bitmapText(120, 50, "pixelFont", "Veronika\nKravchenko", 40).setOrigin(0.5,0).setCenterAlign();
    this.aliceLabel = this.add.bitmapText(270, 100, "pixelFont", "Alice\nHopkinson", 40).setOrigin(0.5,0).setCenterAlign();
    this.sarahLabel = this.add.bitmapText(800, 100, "pixelFont", "Sarah Eve\nRoberts", 40).setOrigin(0.5,0).setCenterAlign();
    this.edwardLabel = this.add.bitmapText(950, 50, "pixelFont", "Edward\nGomez", 40).setOrigin(0.5,0).setCenterAlign();


    
    //back
    this.backLabel = this.add.bitmapText(config.width/2, 550, "pixelFont", "[back]", 60).setOrigin(0.5,0).setInteractive();
    this.backLabel.on('pointerdown', function (event) {
      console.log("Credits to title");
      // 				creditsbgm.fadeOut(1000);
      // 				creditsbgm.stop();
			this.scene.start('gameTitle');
		  }, this);
    
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
	}
}

