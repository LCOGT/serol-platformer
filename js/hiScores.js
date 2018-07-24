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

		//timer setup
		//https://www.joshmorony.com/how-to-create-an-accurate-timer-for-phaser-games/
		self.startTime = new Date();
		self.totalTime = 10;
		self.timeElapsed = 0;

		self.createTimer();

		self.gameTimer = game.time.events.loop(100, function(){
				self.updateTimer();
		    });

		//leaderboard title
		self.title = game.add.text(280, 80, ("High scores"), {
			font: "40px 'Press Start 2P'",
			fill: "#ffd800",
			align: "center"
		});
		self.myScore = game.add.text(150, 500, ("Your name: "), {
			font: "32px 'Press Start 2P'",
			fill: "#ffffff",
			align: "center"
		});


		var nameInput = game.add.inputField(500, 498, {
			font: "30px 'Press Start 2P'",
      fill: '#ffffff',
      fillAlpha: 0,
      fontWeight: 'bold',
      width: 400,
      max: 20,
      padding: 2,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 6,
      placeHolder: 'Anonymous',
      textAlign: 'left',
      zoom: true,
      cursorColor : '#ffffff'
		});
    nameInput.startFocus();
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
	createTimer: function(){

    var self = this;
 		/*TODO change font*/
  	self.timeLabel = self.game.add.text(10, 10,
			"00:00",
			{font: "40px 'Press Start 2P'", fill: "#ffffff"});
    self.timeLabel.anchor.setTo(0, 0);
    self.timeLabel.align = 'center';

	},
	updateTimer: function(){

    var self = this;

    var currentTime = new Date();
    var timeDifference = self.startTime.getTime() - currentTime.getTime();

    //Time elapsed in seconds
    self.timeElapsed = Math.abs(timeDifference / 1000);

    //Time remaining in seconds
    var timeRemaining = self.totalTime - self.timeElapsed;

    //Convert seconds into minutes and seconds
    var minutes = Math.floor(timeRemaining / 60);
    var seconds = Math.floor(timeRemaining) - (60 * minutes);

    //Display minutes, add a 0 to the start if less than 10
    var result = (minutes < 10) ? "0" + minutes : minutes;

    //Display seconds, add a 0 to the start if less than 10
    result += (seconds < 10) ? ":0" + seconds : ":" + seconds;

    self.timeLabel.text = result;

	},
	update: function(){
		var self = this;

		// if (game.input.activePointer.isDown) {
		//
		// }
		if(self.timeElapsed >= self.totalTime){
		game.state.start('title', true, false);
		}

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
