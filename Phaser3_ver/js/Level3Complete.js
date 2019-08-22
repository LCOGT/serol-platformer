//level3Complete.js
class Level3Complete extends Phaser.Scene {
	constructor() {
		super("level3Complete");
	}

	preload() {
	}

	create() {
		//background
		this.lvl1CompleteBg = this.add.image(0,0,"lvl3_complete").setOrigin(0,0);
		//sound
		this.lvl2CompleteBGM = this.sound.add('lvl_complete');
		this.lvl2CompleteBGM.play();
		this.finalScoreLabel = this.add.bitmapText(config.scale.width/2, 420, "pixelFont", "Your score: " + totalScore  , 60).setOrigin(0.5,0);
		this.cameras.main.fadeIn(2000);
		this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

	}

	update() {
		let pad = Phaser.Input.Gamepad.Gamepad;

    	if (this.input.gamepad.total){
      		pad = this.input.gamepad.getPad(0);
    	}
		if (Phaser.Input.Keyboard.JustDown(this.enter) || pad.B){
			if(storyMode==true){
				//change to level 3 when ready
				this.scene.start('enterHiScores');
                this.scene.stop();
			}else{
				this.scene.start('gameTitle');
                this.scene.stop();
			}
		}
	}
}
