//LevelSelect.js
class LevelSelect extends Phaser.Scene {
	constructor() {
		super("levelSelect");
	}

	create() {
		//background
        this.levelSelectBg = this.add.image(0,0,"level_select_bg").setOrigin(0,0);
        //level icons
        
		//menu options
		let activeText = 0;
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
                    activeText -= 1;
                    this.events.emit('CHANGE_BUTTON');
                    break;
                case 'ArrowRight':
                    activeText += 1;
                    this.events.emit('CHANGE_BUTTON');
                    break;
                case 'ArrowDown':
                        activeText = 3;
                        this.events.emit('CHANGE_BUTTON');
                    break;
                case 'ArrowUp':
                    activeText = 1;
                    this.events.emit('CHANGE_BUTTON');
                    break;
                case 'Enter':
                    this.events.emit('SELECT');
                    break;
            }
        });
        textGroup.forEach((text) => {
            text.on('pointerdown', event => {
                this.events.emit('SELECT');
            });        
        });
        this.events.addListener('CHANGE_BUTTON', payload => {
            if (activeText < 0)
                activeText += textGroup.length;
            if (payload && typeof payload.setIndex !== 'undefined')
                activeText = payload.setIndex;
            textGroup.forEach(text => {
                text.setStyleActive(text.index === activeText % textGroup.length);
            });
        });
        this.events.addListener('SELECT', payload => {
            if (activeText == 0){
                console.log("Level Select to lvl1 instructions");
                this.scene.start('instructions1');
            }
            if (activeText == 1){
                console.log("Level Select to lvl2 instructions");
                this.scene.start('instructions2');
            }
            if (activeText == 2){
                console.log("Level Select to lvl3 instructions");
                this.scene.start('gameTitle');
            }
            if (activeText == 3){
                console.log("Level Select to title");
                this.scene.start('gameTitle');
            }
                activeText += texts.length;
            if (payload && typeof payload.setIndex !== 'undefined')
                activeText = payload.setIndex;
            textGroup.forEach(text => {
                text.setStyleActive(text.index === activeText % texts.length);
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