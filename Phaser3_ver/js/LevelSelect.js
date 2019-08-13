//LevelSelect.js
class LevelSelect extends Phaser.Scene {
	constructor() {
		super("levelSelect");
	}

	create() {
		//background
        this.levelSelectBg = this.add.image(0,0,"level_select_bg").setOrigin(0,0);
        //sound
        this.levelSelectBGM = this.sound.add("level_select");
        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.levelSelectBGM.play(musicConfig);
        this.click = this.sound.add("click");
        this.select = this.sound.add("select");
		//menu options
		this.activeSelection = 0;
        let textGroup = [];
        let iconGroup = [];
        const texts = ['Level 1', 'Level 2', 'Level 3'];
        const icons = [0,1,2];
        icons.forEach((icon, index) => {
            iconGroup.push(new Icon(this, 300 + 210 * index + 1, 300,  "level_icon", index).setOrigin(0.5));
        });
        texts.forEach((text, index) => {
            textGroup.push(new MenuText(this, 300 + 210 * index + 1, 420,  "pixelFont", text, 60, index).setOrigin(0.5));
        });
        textGroup.push(new MenuText(this, config.scale.width/2, 550, "pixelFont", "[back]", 60, 3).setOrigin(0.5));
        this.input.keyboard.on('keydown', event => {
            switch (event.key) {
                case 'ArrowLeft':
                    this.activeSelection -= 1;
                    this.events.emit('CHANGE_BUTTON');
                    break;
                case 'ArrowRight':
                    this.activeSelection += 1;
                    this.events.emit('CHANGE_BUTTON');
                    break;
                case 'ArrowDown':
                        this.activeSelection = 3;
                        this.events.emit('CHANGE_BUTTON');
                    break;
                case 'ArrowUp':
                    this.activeSelection = 1;
                    this.events.emit('CHANGE_BUTTON');
                    break;
                case 'Enter':
                    this.events.emit('SELECTITEM');
                    break;
            }
        });
        this.events.addListener('CHANGE_BUTTON', payload => {
            this.click.play();
            if (this.activeSelection < 0){
                this.activeSelection = 3;
                console.log("after correction: " + this.activeSelection)
            }
            else if (this.activeSelection > 3){
                this.activeSelection = 0;
                console.log("after correction: " + this.activeSelection);
            }
            if (payload && typeof payload.setIndex !== 'undefined')
                this.activeSelection = payload.setIndex;
            textGroup.forEach(text => {
                text.setStyleActive(text.index === this.activeSelection % textGroup.length);
            });
        });
        
        this.events.addListener('SELECTITEM', payload => {
            this.levelSelectBGM.stop();
            if (this.activeSelection == 0){
                this.select.play();
                console.log("Level Select to lvl1 instructions");
                this.scene.start('instructions1');
                console.log("Stopping current Scene");
                this.scene.stop();
            }
            else if (this.activeSelection == 1){
                this.select.play();
                console.log("Level Select to lvl2 instructions");
                this.scene.start('instructions2');
                console.log("Stopping current Scene");
                this.scene.stop();
            }
            else if (this.activeSelection == 2){
                this.select.play();
                console.log("Level Select to lvl3 instructions");
                this.scene.start('instructions3');
                console.log("Stopping current Scene");
                this.scene.stop();
            }
            else if (this.activeSelection == 3){
                console.log("Level Select to title");
                this.scene.start('gameTitle');
                console.log("Stopping current Scene");
                this.scene.stop();
            }
            if (payload && typeof payload.setIndex !== 'undefined')
                this.activeSelection = payload.setIndex;
            textGroup.forEach(text => {
                text.setStyleActive(text.index === this.activeSelection % texts.length);
            });
        });
	}

	update() {
		
	}
}
class Icon extends Phaser.Physics.Arcade.Sprite{
	constructor(scene, x=0, y=0, texture = "level_icon", frame = 0) {
		super(scene,x,y,texture,frame)
		scene.add.existing(this)
		scene.events.on('update', this.update, this)
	}	
}