var hiScoreVals = [];
var hiScoreNames = [];
var hiScores = {
	create: function (){
		var self = this;
		//get leaderboard
		var xhr = new XMLHttpRequest();
		var resp;
		var leaders;
		xhr.open("GET","https://serol.lco.global/api/highscore/leaders", true)
		xhr.onload = function() {
		  if (xhr.status >= 200 && xhr.status < 400) {
		    // Success!
		    resp = xhr.responseText.toString();
		    console.log(resp);
				console.log(typeof resp);
				leaders = JSON.parse(resp);
				generateLeaderboard(leaders);
		  } else {
		    // We reached our target server, but it returned an error
		    console.log("Error")
		  }
		};

		xhr.onerror = function() {
		  // There was a connection error of some sort
		  console.log("Connection error")
		};

		xhr.send();

		game.add.tileSprite(0, 0, 1024, 640, 'background');
		self.title = game.add.text(280, 80, ("High scores"), {
			font: "40px 'Press Start 2P'",
			fill: "#ffd800",
			align: "center"
		});
		self.top5 = game.add.text(120, 200,
			("1. " + hiScoreNames[0]+ " " + hiScoreVals[0] + " \n" +
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
};

function generateLeaderboard(dict){
	console.log(dict);
	console.log(typeof dict);
	for (i = 0; i < 5; i++) {
    console.log(dict[i]);
		var currentData = dict[i];
		for (var key in currentData) {
			console.log(key);
  		console.log(typeof currentData[key]);
			if(key === "score"){
				hiScoreVals.push(currentData[key].toString());
			} else {
				hiScoreNames.push(currentData[key]);
			}
		}
	}
	console.log(hiScoreVals);
	console.log(hiScoreNames);
}
