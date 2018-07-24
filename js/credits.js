var credits = {
	pressStart: null,
	create: function (){
		var self = this;
    bgImage = game.add.tileSprite(0, 0, 1024, 640, 'night_background');
    //adding people
    self.ronnie = new Person(120, 550);
    game.add.existing(self.ronnie);
    self.ronnie.anchor.setTo(0.5, 1);
    //label
    self.ronnieLabel = self.game.add.text(120, 50,
      "Veronika\nKravchenko",
      {font: "20px 'Press Start 2P'", fill: "#00fcf4"});
    self.ronnieLabel.anchor.setTo(0.5, 0);
    self.ronnieLabel.align = 'center';

    self.alice = new Person(270, 550);
    game.add.existing(self.alice);
    self.alice.anchor.setTo(0.5, 1);

    self.aliceLabel = self.game.add.text(270, 100,
      "Alice\nHopkinson",
      {font: "20px 'Press Start 2P'", fill: "#fff311"});
    self.aliceLabel.anchor.setTo(0.5, 0);
    self.aliceLabel.align = 'center';

    self.sarah = new Person(800, 550);
    game.add.existing(self.sarah);
    self.sarah.anchor.setTo(0.5, 1);

    self.sarahLabel = self.game.add.text(800, 100,
      "Sarah Eve\nRoberts",
      {font: "20px 'Press Start 2P'", fill: "#d60c3b"});
    self.sarahLabel.anchor.setTo(0.5, 0);
    self.sarahLabel.align = 'center';

    self.edward = new Person(950, 550);
    game.add.existing(self.edward);
    self.edward.anchor.setTo(0.5, 1);

    self.edwardLabel = self.game.add.text(950, 50,
      "Edward\nGomez",
      {font: "20px 'Press Start 2P'", fill: "#00ff6e"});
    self.edwardLabel.anchor.setTo(0.5, 0);
    self.edwardLabel.align = 'center';

	},
	update: function(){
		var self = this;
    self.ronnie.play('Ronnie');
    self.alice.play('Alice');
    self.sarah.play('Sarah');
    self.edward.play('Edward');

	}
}

function Person(x, y) {

  //serol attributes
  var person = game.add.sprite(x, y, 'people');

  person.animations.add('Ronnie', [0,3,2,1,2,3], 4, true);
  person.animations.add('Alice', [12,13,14,15], 4, true);
  person.animations.add('Sarah', [8,11,10,9,10,11,8,9,10,11], 4, true);
  person.animations.add('Edward', [4,5,6,7], 4, true);

  return person;
}
