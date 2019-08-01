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
        
        this.stars = this.add.blitter(0, 0, 'star');

        for (let i = 0; i < this.max; i++)
        {
            this.xx[i] = Math.floor(Math.random() * 800) - 400;
            this.yy[i] = Math.floor(Math.random() * 600) - 300;
            this.zz[i] = Math.floor(Math.random() * 1700) - 100;

            let perspective = this.distance / (this.distance - this.zz[i]);
            let x = config.scale.width/2 + this.xx[i] * perspective;
            let y = config.scale.height/2 + this.yy[i] * perspective;

            this.stars.create(x, y);
        }
        this.add.bitmapText(170, 100, 'pixelFont', 'RANK   SCORE       NAME',80).setTint(0x00bfff);
        this.add.bitmapText(170, 200, 'pixelFont', '1ST\n2ND\n3RD\n4TH\n5TH',80);
        this.backLabel = this.add.bitmapText(config.scale.width/2, 550, "pixelFont", "[back]", 60).setOrigin(0.5,0).setTint(0xffb700);
        
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
    update (time, delta)
    {
        for (let i = 0; i < this.max; i++)
        {
            let perspective = this.distance / (this.distance - this.zz[i]);
            let x = config.scale.width/2 + this.xx[i] * perspective;
            let y = config.scale.height/2 + this.yy[i] * perspective;

            this.zz[i] += this.speed * (delta / 1000);

            if (this.zz[i] > 300)
            {
                this.zz[i] -= 600;
            }

            let bob = this.stars.children.list[i];

            bob.x = x;
            bob.y = y;
        }
        
        if (Phaser.Input.Keyboard.JustDown(this.enter)||Phaser.Input.Keyboard.JustDown(this.space))
        {
            console.log("DisplayHiScores to title");
            this.scene.start('gameTitle');
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
            console.log(leaders);
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
          for (let i = 0; i < 5; i++) {
            let currentData = dict[i];
            scores += currentData['score']+"\n";
            names += currentData['username']+"\n";
          }
        
        this.add.bitmapText(370, 200, 'pixelFont', scores, 80);
        this.add.bitmapText(610, 200, 'pixelFont', names, 80);
    }
}
