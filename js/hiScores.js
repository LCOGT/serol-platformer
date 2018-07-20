var hiScoreVals = [];
var hiScoreNames = [];
var name = "";

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

		//add text plugin
		game.add.plugin(PhaserInput.Plugin);

		game.add.tileSprite(0, 0, 1024, 640, 'background');
		self.title = game.add.text(280, 80, ("High scores"), {
			font: "40px 'Press Start 2P'",
			fill: "#ffd800",
			align: "center"
		});
		self.myScore = game.add.text(240, 500, ("Your name: "), {
			font: "32px 'Press Start 2P'",
			fill: "#ffffff",
			align: "center"
		});

		var nameInput = game.add.inputField(600, 510, {
			font: "32px 'Press Start 2P'",
			fill: "#ffffff",
			align: "center",
    	borderWidth: 0,
    	borderColor: '#ffffff',
			background: "#0BE783",
		});
		nameInput.backgroundColor = "#0BE783";
		nameInput.fillAlpha = 0;
		nameInput.width = 300;
		nameInput.height = 34;
		nameInput.cursorColor = '#ffffff';
		console.log("brcolour: " + nameInput.backgroundColor);
		console.log("fillAlpha: " + nameInput.fillAlpha);

		// game.input.activePointer.capture = true;
		game.input.keyboard.onUpCallback = function( e ){
      //down key logic
      if(e.keyCode == Phaser.Keyboard.ENTER){
				name = nameInput.value;
				console.log(name);
				sendResult(name);
				console.log("result sent");
				game.time.events.add(Phaser.Timer.SECOND * 2,
	        function(){
	          game.state.start('title', true, false);
	        },this);
				
			}
		};

	},
	update: function(){
		var self = this;

		// if (game.input.activePointer.isDown) {
		//
		// }

	}
};

function generateLeaderboard(dict){
  var score_text = "";
	for (i = 0; i < 5; i++) {
		var currentData = dict[i];
    score_text += (i+1).toString()+" "+currentData['username']+" "+currentData['score']+"\n";
		}
  score_text +="\n-------------------------";

  game.add.text(120, 200,
    (score_text), {
    font: "32px 'Press Start 2P'",
    fill: "#ffffff",
    align: "center"
  });
}
//send data to leaderboard
function sendResult(nameVal){
  var data = {"username":nameVal,"score":counterVal.toString()};
  var request = new XMLHttpRequest();
  request.open('POST', 'https://serol.lco.global/api/highscore/add/', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Authorization', 'Token a3675b1c9c520c3bd047703d7a1a395ba379932f');
  request.send(JSON.stringify(data));
}
