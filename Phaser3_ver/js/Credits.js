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
    this.creditsTitle = this.add.text(config.width/2, 50, ("Credits"), {
      font: "48px Arial",
      fill: "#ffb600",
      align: "center"
    }).setOrigin(0.5,0);
    
    //labels
    this.ronnieLabel = this.add.text(120, 50, ("Veronika\nKravchenko"), {
      font: "20px Arial",
      fill: "#00fcf4",
      align: "center"
    }).setOrigin(0.5,0);
    this.aliceLabel = this.add.text(270, 100, ("Alice\nHopkinson"), {
      font: "20px Arial",
      fill: "#fff311",
      align: "center"
    }).setOrigin(0.5,0);  
    this.sarahLabel = this.add.text(800, 100, ("Sarah Eve\nRoberts"), {
      font: "20px Arial",
      fill: "#d60c3b",
      align: "center"
    }).setOrigin(0.5,0);
    this.edwardLabel = this.add.text(950, 50, ("Edward\nGomez"), {
      font: "20px Arial",
      fill: "#00ff6e",
      align: "center"
    }).setOrigin(0.5,0);
    
    //back
    this.backLabel = this.add.text(config.width/2, 565, ("[back]"), {
      font: "48px Arial",
      fill: "#ffffff",
      align: "center"
    }).setOrigin(0.5,0).setInteractive();
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

