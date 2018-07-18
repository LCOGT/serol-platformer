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
		console.log(hiScoreVals);
		console.log(hiScoreNames);
		game.add.tileSprite(0, 0, 1024, 640, 'background');
		self.title = game.add.text(280, 80, ("High scores"), {
			font: "40px 'Press Start 2P'",
			fill: "#ffd800",
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
  var score_text = "";
	for (i = 0; i < 5; i++) {
		var currentData = dict[i];
    score_text += (i+1).toString()+" "+currentData['username']+" "+currentData['score']+"\n";
    console.log(score_text);
		}
  score_text +="\n-------------------------";

  game.add.text(120, 200,
    (score_text), {
    font: "32px 'Press Start 2P'",
    fill: "#ffffff",
    align: "center"
  });
	// console.log(hiScoreVals);
	// console.log(hiScoreNames);
}
