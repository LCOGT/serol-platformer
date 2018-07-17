var hiScores = {
	create: function (){
		var self = this;
		//get leaderboard
		var resp = {};
		var request = new XMLHttpRequest();
		request.open('GET', 'https://serol.lco.global/api/highscore/leaders/', true);
		request.setRequestHeader('Authorization', 'Token a3675b1c9c520c3bd047703d7a1a395ba379932f');
		request.onreadystatechange = function() {
		  if (this.readyState === 4) {
		    if (this.status >= 200 && this.status < 400) {
		      // Success!
		      resp = this.responseText;
		    } else {
		      // Error :(
		    }
		  }
		};

		request.send();
		request = null;

		var jsonResponse = JSON.parse(resp);
		console.log(jsonResponse);
		game.add.tileSprite(0, 0, 1024, 640, 'background');
		self.title = game.add.text(280, 80, ("High scores"), {
			font: "40px 'Press Start 2P'",
			fill: "#ffd800",
			align: "center"
		});
		self.top5 = game.add.text(120, 200,
			("1. " + "name1 " + "5000 \n" +
			 "2. " + "name2 " + "4000 \n" +
			 "3. " + "name3 " + "3000 \n" +
			 "4. " + "name4 " + "2000 \n" +
			 "5. " + "name5 " + "1000 \n" +
			 "\n"+
		   "-------------------------"), {
			font: "32px 'Press Start 2P'",
			fill: "#ffffff",
			align: "center"
		});
		self.myScore = game.add.text(280, 500, ("Your name: " + counterVal), {
			font: "32px 'Press Start 2P'",
			fill: "#ffffff",
			align: "center"
		});


		game.input.activePointer.capture = true;

	},
	update: function(){
		var self = this;
		if (game.input.activePointer.isDown) {
			game.state.start('title');
		}
	}
}
