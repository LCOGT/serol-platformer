// var credits = {
// 	pressStart: null,
// 	create: function (){
// 		var self = this;
//     bgImage = game.add.tileSprite(0, 0, 1024, 640, 'night_background');
//     creditsbgm = game.add.audio('credits_bgm', 0.7, true);
// 		creditsbgm.play();

//     self.creditsTitle = game.add.text(self.world.centerX, 50, ("Credits"), {
// 			font: "48px 'Press Start 2P'",
// 			fill: "#ffb600",
// 			align: "center"
// 		});
//     self.creditsTitle.anchor.setTo(0.5,0);
//     //adding people
//     self.ronnie = new Person(120, 550);
//     game.add.existing(self.ronnie);
//     self.ronnie.anchor.setTo(0.5, 1);
//     //label
//     self.ronnieLabel = self.game.add.text(120, 50,
//       "Veronika\nKravchenko",
//       {font: "20px 'Press Start 2P'", fill: "#00fcf4"});
//     self.ronnieLabel.anchor.setTo(0.5, 0);
//     self.ronnieLabel.align = 'center';

//     self.alice = new Person(270, 550);
//     game.add.existing(self.alice);
//     self.alice.anchor.setTo(0.5, 1);

//     self.aliceLabel = self.game.add.text(270, 100,
//       "Alice\nHopkinson",
//       {font: "20px 'Press Start 2P'", fill: "#fff311"});
//     self.aliceLabel.anchor.setTo(0.5, 0);
//     self.aliceLabel.align = 'center';

//     self.sarah = new Person(800, 550);
//     game.add.existing(self.sarah);
//     self.sarah.anchor.setTo(0.5, 1);

//     self.sarahLabel = self.game.add.text(800, 100,
//       "Sarah Eve\nRoberts",
//       {font: "20px 'Press Start 2P'", fill: "#d60c3b"});
//     self.sarahLabel.anchor.setTo(0.5, 0);
//     self.sarahLabel.align = 'center';

//     self.edward = new Person(950, 550);
//     game.add.existing(self.edward);
//     self.edward.anchor.setTo(0.5, 1);

//     self.edwardLabel = self.game.add.text(950, 50,
//       "Edward\nGomez",
//       {font: "20px 'Press Start 2P'", fill: "#00ff6e"});
//     self.edwardLabel.anchor.setTo(0.5, 0);
//     self.edwardLabel.align = 'center';

// 		//button text
// 		self.backLabel = self.game.add.text(self.world.centerX, 565,
// 			"[back]",
// 			{font: "30px 'Press Start 2P'", fill: "#ffffff"});
//     self.backLabel.anchor.setTo(0.5, 0);
//     self.backLabel.align = 'center';
// 		self.backLabel.inputEnabled = true;
// 		self.backLabel.events.onInputDown.add(
// 			function(){
// 				creditsbgm.fadeOut(1000);
// 				creditsbgm.stop();
//         game.state.start('title', true, false);
// 			}, this);

// 	},
// 	update: function(){
// 		var self = this;
//     self.ronnie.play('Ronnie');
//     self.alice.play('Alice');
//     self.sarah.play('Sarah');
//     self.edward.play('Edward');

// 	}
// }

// function Person(x, y) {

//   //serol attributes
//   var person = game.add.sprite(x, y, 'people');

//   person.animations.add('Ronnie', [0,3,2,1,2,3], 4, true);
//   person.animations.add('Alice', [12,13,14,15], 4, true);
//   person.animations.add('Sarah', [8,11,10,9,10,11,8,9,10,11], 4, true);
//   person.animations.add('Edward', [4,5,6,7], 4, true);

//   return person;
// }
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

