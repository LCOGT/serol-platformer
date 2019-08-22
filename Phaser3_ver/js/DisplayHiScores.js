leaders = [];
//DisplayHiScores.js
class DisplayHiScores extends Phaser.Scene {

    constructor ()
    {
        super('displayHiScores');

        this.stars;

        this.distance = 500;
        this.speed = 200;

        this.max = 500;
        this.xx = [];
        this.yy = [];
        this.zz = [];

        this.resp;
    }

    create ()
    {
        this.scoresBg = this.add.image(0,0,"blue_bg").setOrigin(0,0);
        this.add.image(0, 0, 'stars_bg').setOrigin(0);

        //sound
        this.hiScoresBGM = this.sound.add("hi_scores");
        var musicConfig = {
            mute: false,
            volume: 0.8,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.hiScoresBGM.play(musicConfig);

        this.add.bitmapText(170, 100, 'pixelFont', 'RANK   SCORE       NAME',80).setTint(0x00ffff);
        this.add.bitmapText(170, 200, 'pixelFont', '1ST\n2ND\n3RD\n4TH\n5TH',80);
        //button
        this.highlight = this.add.sprite(config.scale.width/2, 575, 'buttons',2).setScale(0.8).setOrigin(0.5);
        this.backLabel = this.add.bitmapText(config.scale.width/2, 550, "pixelFont", "[back]", 60).setOrigin(0.5,0);
        
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.getScoresRequest(function(requestWasSuccess, leadersData){
            if(requestWasSuccess == true){
                this.genLeaderboard(leadersData);
            }else{
              // display error msg to user
              console.log("Error")
            }
          });
    }
    update ()
    {
        
        if (Phaser.Input.Keyboard.JustDown(this.enter)||Phaser.Input.Keyboard.JustDown(this.space))
        {
          this.sound.stopAll();
            // console.log("DisplayHiScores to title");
            this.scene.start('gameTitle');
            // console.log("Stopping current Scene");
            this.scene.stop();
        }
    }
    getScoresRequest(callbackFunction){
        var self = this; 
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 400) {
            // Success!
            this.resp = xhr.responseText; // toString() might be needed.
            // is leaders global or part of the class?
            leaders = JSON.parse(this.resp);
            // console.log(leaders);
            callbackFunction.call(self, true, leaders);
          } else {
            // We reached our target server, but it returned an error
            console.log("Error")
            callbackFunction.call(self, false, leaders);
          }
        };
      
        xhr.onerror = function() {
          // There was a connection error of some sort
          console.log("Connection error")
        };
      
        xhr.open("GET","https://serol.lco.global/api/highscore/leaders", true);
        xhr.send();
      }
    genLeaderboard(dict){
        let scores = "";
        let names = "";
        let length =0;
        if(leaders.length<5){
          length = leaders.length;
        }else{
          length = 5;
        }
          for (let i = 0; i < length; i++) {
            let currentData = dict[i];
            scores += currentData['score']+"\n";
            names += currentData['username']+"\n";
          }
        
        this.add.bitmapText(370, 200, 'pixelFont', scores, 80);
        this.add.bitmapText(610, 200, 'pixelFont', names, 80);
    }
}
