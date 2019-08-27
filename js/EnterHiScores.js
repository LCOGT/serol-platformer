//EnterHiScores.js
class EnterHiScores extends Phaser.Scene {

    constructor (){
        super('enterHiScores');
        //star anims
        this.stars;
        this.distance = 500;
        this.speed = 200;
        this.max = 500;
        this.xx = [];
        this.yy = [];
        this.zz = [];

        //input
        this.chars = [
            [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ],
            [ 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T' ],
            [ 'U', 'V', 'W', 'X', 'Y', 'Z', '.', '-', ' ', ' ' ]
        ];
        this.cursor = new Phaser.Math.Vector2();

        this.text;
        this.block;

        this.name = '';
        this.charLimit = 9;
        this.playerText;
    }

    create (){
        //bg and stardust
        this.scoresBg = this.add.image(0,0,"blue_bg").setOrigin(0,0);
        this.stars = this.add.blitter(0, 0, 'star');

        for (let i = 0; i < this.max; i++){
            this.xx[i] = Math.floor(Math.random() * 820) - 400;
            this.yy[i] = Math.floor(Math.random() * 600) - 300;
            this.zz[i] = Math.floor(Math.random() * 1800) - 100;

            let perspective = this.distance / (this.distance - this.zz[i]);
            let x = config.scale.width/2 + this.xx[i] * perspective;
            let y = config.scale.height/2 + this.yy[i] * perspective;

            this.stars.create(x, y);
        }
        //on screen keyboard
        let text = this.add.bitmapText(200, 50, 'pixelFont', 'ABCDEFGHIJ\n\nKLMNOPQRST\n\nUVWXYZ.-',50);

        text.setLetterSpacing(15);
        text.setInteractive();

        this.add.image(text.x + 564, text.y + 190, 'rub');
        this.add.image(text.x + 632, text.y + 190, 'end');

        this.block = this.add.image(text.x - 10, text.y - 2, 'block').setOrigin(0);

        this.text = text;

        this.input.keyboard.on('keyup_LEFT', this.moveLeft, this);
        this.input.keyboard.on('keyup_RIGHT', this.moveRight, this);
        this.input.keyboard.on('keyup_UP', this.moveUp, this);
        this.input.keyboard.on('keyup_DOWN', this.moveDown, this);
        this.input.keyboard.on('keyup_ENTER', this.pressKey, this);
        this.input.keyboard.on('keyup_SPACE', this.pressKey, this);
        this.input.keyboard.on('keyup', this.anyKey, this);

        this.tweens.add({
            targets: this.block,
            alpha: 0.2,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
            duration: 350
        });
        this.cursor.set(0, 0);
        this.name = '';

        //score and name
        this.add.bitmapText(200, 350, "pixelFont", 'SCORE         NAME',82).setTint(0x00ffff);
        this.add.bitmapText(200, 420, 'pixelFont', totalScore, 80);
        this.playerText = this.add.bitmapText(500, 420, 'pixelFont', '', 80);
        this.events.on('updateName', this.updateName, this);
        this.events.on('submitName', this.submitName, this);
    }

    update (time, delta){
        for (let i = 0; i < this.max; i++){
            let perspective = this.distance / (this.distance - this.zz[i]);
            let x = config.scale.width/2 + this.xx[i] * perspective;
            let y = config.scale.height/2 + this.yy[i] * perspective;

            this.zz[i] += this.speed * (delta / 1000);

            if (this.zz[i] > 300){
                this.zz[i] -= 600;
            }

            let bob = this.stars.children.list[i];

            bob.x = x;
            bob.y = y;
        }
    }
    moveBlock (pointer, x, y){
        let cx = Phaser.Math.Snap.Floor(x, 68, 0, true);
        let cy = Phaser.Math.Snap.Floor(y, 85, 0, true);
        let char = this.chars[cy][cx];

        this.cursor.set(cx, cy);

        this.block.x = this.text.x - 10 + (cx * 68);
        this.block.y = this.text.y - 2 + (cy * 85);
    }
    moveLeft (){
        if (this.cursor.x > 0){
            this.cursor.x--;
            this.block.x -= 68;
        }
        else{
            this.cursor.x = 9;
            this.block.x += 68 * 9;
        }
    }
    moveRight (){
        if (this.cursor.x < 9){
            this.cursor.x++;
            this.block.x += 68;
        }
        else{
            this.cursor.x = 0;
            this.block.x -= 68 * 9;
        }
    }

    moveUp (){
        if (this.cursor.y > 0){
            this.cursor.y--;
            this.block.y -= 85;
        }
        else{
            this.cursor.y = 2;
            this.block.y += 85 * 2;
        }
    }

    moveDown (){
        if (this.cursor.y < 2){
            this.cursor.y++;
            this.block.y += 85;
        }
        else{
            this.cursor.y = 0;
            this.block.y -= 85 * 2;
        }
    }

    anyKey (event){
        //  Only allow A-Z . and -

        let code = event.keyCode;

        if (code === Phaser.Input.Keyboard.KeyCodes.PERIOD){
            this.cursor.set(6, 2);
            this.pressKey();
        }
        else if (code === Phaser.Input.Keyboard.KeyCodes.MINUS){
            this.cursor.set(7, 2);
            this.pressKey();
        }
        else if (code === Phaser.Input.Keyboard.KeyCodes.BACKSPACE || code === Phaser.Input.Keyboard.KeyCodes.DELETE){
            this.cursor.set(8, 2);
            this.pressKey();
        }
        else if (code >= Phaser.Input.Keyboard.KeyCodes.A && code <= Phaser.Input.Keyboard.KeyCodes.Z){
            code -= 65;

            let y = Math.floor(code / 10);
            let x = code - (y * 10);

            this.cursor.set(x, y);
            this.pressKey();
        }
    }

    pressKey (){
        let x = this.cursor.x;
        let y = this.cursor.y;
        let nameLength = this.name.length;

        this.block.x = this.text.x - 10 + (x * 68);
        this.block.y = this.text.y - 2 + (y * 85);

        if (x === 9 && y === 2 && nameLength > 0){
            //  Submit
            this.events.emit('submitName', this.name);
        }
        else if (x === 8 && y === 2 && nameLength >= 0){
            //  Rub
            this.name = this.name.substr(0, nameLength - 1);
            this.events.emit('updateName', this.name);
        }
        else if (this.name.length < this.charLimit){
            //  Add
            this.name = this.name.concat(this.chars[y][x]);
            this.events.emit('updateName', this.name);
        }
    }
    submitName ()
    {
        console.log("score submitted");
        //switch to next screen after small pause
        this.submitScore = this.time.delayedCall(500, function(){
			this.sendResult(this.name);
		}, [], this);
    }

    updateName (name)
    {
        this.playerText.setText(name);
    }
    //send data to leaderboard
    sendResult(nameVal){
        var data = {"username":nameVal,"score":totalScore.toString()};
        var request = new XMLHttpRequest();
        request.open('POST', 'https://serol.lco.global/api/highscore/add/', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', 'Token a3675b1c9c520c3bd047703d7a1a395ba379932f');
        request.send(JSON.stringify(data));
        this.scene.start('displayHiScores');
        // console.log("Stopping current Scene");
        this.scene.stop();
    }

}