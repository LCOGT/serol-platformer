//Title.js
var storyMode = false;
var totalScore = 0;
class Title extends Phaser.Scene {
	constructor() {
		super("gameTitle");
	}

	create() {
        storyMode = false;
        totalScore = 0;
		//background
		this.titleBg = this.add.image(0,0,"titleScreen").setOrigin(0,0);
		// //button to activate fullscreen
		this.fullscreenButton = this.add.image(980, 10, "fullscreen").setOrigin(0.5, 0).setScale(0.1).setInteractive();
		this.fullscreenButton.on('pointerdown', function () {

            if (this.scale.isFullscreen)
            {                
                this.scale.stopFullscreen();
            }
            else
            {
                this.scale.startFullscreen();
            }

        }, this);

		let activeText = 0;
        let textGroup = [];
        const texts = ['Story Mode', 'Level Select', '[credits]'];
        texts.forEach((text, index) => {
            textGroup.push(new MenuText(this, config.scale.width / 2, 400 + 70 * index + 1, "pixelFont", text, 60, index).setOrigin(0.5));
        });
        this.input.keyboard.on('keydown', event => {
            switch (event.key) {
                case 'ArrowUp':
                    activeText -= 1;
                    this.events.emit('CHANGE_BUTTON');
                    break;
                case 'ArrowDown':
                    activeText += 1;
                    this.events.emit('CHANGE_BUTTON');
                    break;
                case 'Enter':
                    this.events.emit('SELECT');
                    break;
                case 'f':
                    this.events.emit('FULLSCREEN');
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
                activeText += texts.length;
            if (payload && typeof payload.setIndex !== 'undefined')
                activeText = payload.setIndex;
            textGroup.forEach(text => {
                text.setStyleActive(text.index === activeText % texts.length);
            });
        });
        this.events.addListener('SELECT', payload => {
            if (activeText == 0){
                storyMode = true;
                console.log("Title to lvl1 instructions");
                this.scene.start('instructions1');
            }
            if (activeText == 1){
                console.log("Title to level select");
                this.scene.start('levelSelect');
            }
            if (activeText == 2){
                console.log("Title to credits");
                this.scene.start('credits');
            }
                activeText += texts.length;
            if (payload && typeof payload.setIndex !== 'undefined')
                activeText = payload.setIndex;
            textGroup.forEach(text => {
                text.setStyleActive(text.index === activeText % texts.length);
            });
        });
        this.events.addListener('FULLSCREEN', payload => {
            if (this.scale.isFullscreen)
            {                
                this.scale.stopFullscreen();
            }
            else
            {
                this.scale.startFullscreen();
            }
        });
	}

	update() {
		
	}
}
class MenuText extends Phaser.GameObjects.BitmapText {
    constructor(scene, x, y, font, text, size, index) {
        super(scene, x, y, font, text, size, 0);
        this.index = index;
        this.normalTint = 0xffffff;
        this.activeTint= 0xffb700;
        this.isActive = false;
        scene.add.existing(this);
        this.setTint(this.normalTint)
            .setInteractive()
            .on('pointerover', () => scene.events.emit('CHANGE_BUTTON', { setIndex: index }));
        this.setStyleActive(index === 0);
    }
    setStyleActive(active) {
        if (this.isActive === active)
            return;
        this.isActive = active;
        this.setTint(this.isActive ? this.activeTint : this.normalTint);
    }
}