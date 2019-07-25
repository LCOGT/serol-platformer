//Title.js
class Title extends Phaser.Scene {
	constructor() {
		super("gameTitle");
	}

	preload() {
		this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
	}

	create() {
		//background
		this.titleBg = this.add.image(0,0,"titleScreen").setOrigin(0,0).setInteractive();
		this.titleBg.on('pointerdown', function (event) {
			console.log("Title to lvl1 instructions");
			this.scene.start('instructions2');
		  }, this);
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
		//start button
		/*this.pressStart = this.add.sprite(config.width/2, 350, "start");
		this.pressStart.setScale(1.5);
		this.anims.create({
			key:"blink",
			frames: this.anims.generateFrameNumbers('start',{
				start: 0,
				end: 1
			}),
			frameRate: 2,
			repeat: -1
		});
		this.pressStart.setInteractive();
		this.pressStart.on('pointerdown', function (event) {
			console.log("Title to lvl1 instructions");
			this.scene.start('instructions1');
		  }, this);
		//animations
		this.pressStart.anims.play('blink',true);
		  */

		//menu options

		//credits text
		// this.creditsLabel = this.add.bitmapText(config.width/2, 550, "pixelFont", "[credits]", 60).setOrigin(0.5,0).setInteractive();
		// this.creditsLabel.on('pointerdown', function (event) {
		// 	console.log("Title to credits");
		// 	//TODO: add audio controls
		// 	this.scene.start('credits');
		//   }, this);

		let activeText = 0;
        let textGroup = [];
        const texts = ['Story Mode', 'Level Select', '[credits]'];
        texts.forEach((text, index) => {
            textGroup.push(new MenuText(this, config.width / 2, 400 + 70 * index + 1, "pixelFont", text, 60, index).setOrigin(0.5));
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
            }
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