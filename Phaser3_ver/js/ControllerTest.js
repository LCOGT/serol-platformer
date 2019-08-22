class ControllerTest extends Phaser.Scene {
	constructor() {
		super("controllerTest");
    }
    preload(){

    }

	create() {
        this.text;
        this.add.image(0, 0, 'blue_bg').setOrigin(0);
        //sounds
        this.collect = this.sound.add('collect_t');
        this.click = this.sound.add("click");
        this.gainLife = this.sound.add('gain_life');

        this.text = this.add.text(10, 30, '', { font: '16px Courier', fill: '#ffffff' });
        //menu system
		this.activeText = 0;
        let textGroup = [];
        const texts = ['Story Mode', 'Level Select', 'Hi Scores', '[credits]'];
        texts.forEach((text, index) => {
            textGroup.push(new MenuText(this, config.scale.width / 2, 400 + 70 * index + 1, "pixelFont", text, 60, index).setOrigin(0.5));
        });
        this.input.keyboard.on('keydown', event => {
            switch (event.key) {
                case 'ArrowUp':
                    this.activeText -= 1;
                    this.events.emit('CHANGE_BUTTON');
                    break;
                case 'ArrowDown':
                    this.activeText += 1;
                    this.events.emit('CHANGE_BUTTON');
                    break;
                case 'Enter':
                    this.events.emit('SELECT');
                    break;
            }
        });
        this.events.addListener('CHANGE_BUTTON', payload => {
            this.click.play();
            if (this.activeText < 0){
                this.activeText = 3;
            }
            else if (this.activeText > 3){
                this.activeText = 0;
            }
            if (payload && typeof payload.setIndex !== 'undefined'){
                this.activeText = payload.setIndex;
            }
            textGroup.forEach(text => {
                text.setStyleActive(text.index === this.activeText % texts.length);
            });
        }, this, true);
        
        this.events.addListener('SELECT', payload => {
            this.gainLife.play();
        },this);


        this.pad = this.input.gamepad;

    	if (this.input.gamepad.total){
      		this.pad = this.input.gamepad.getPad(0);
    	}

        

        this.pad.on('down', (pad, button, value) =>{
            console.log("controller button down")
            console.log(pad);
            console.log(button);
            console.log(value);
            switch (button.index) {
                case 12:
                    console.log("up pressed")
                    this.activeText -= 1;
                    this.events.emit('CHANGE_BUTTON');
                    break;
                case 13:
                    console.log("down pressed")
                    this.activeText += 1;
                    this.events.emit('CHANGE_BUTTON');
                    break;
                case 1:
                    console.log("B pressed")
                    this.events.emit('SELECT');
                    break;
            }           
        });
    
	}

	update() {
		if (this.input.gamepad.total === 0)
    {
        return;
    }

    var debug = [];
    var pads = this.input.gamepad.gamepads;
    // var pads = this.input.gamepad.getAll();
    // var pads = navigator.getGamepads();

    // for (var i = 0; i < pads.length; i++)
    // {
        var gamepad = pads[0];

        // if (!pad)
        // {
        //     continue;
        // }

        //  Timestamp, index. ID
        debug.push(gamepad.id);
        debug.push('Index: ' + gamepad.index + ' Timestamp: ' + gamepad.timestamp);

        //  Buttons

        var buttons = '';

        for (var b = 0; b < gamepad.buttons.length; b++)
        {
            var button = gamepad.buttons[b];

            buttons = buttons.concat('B' + button.index + ': ' + button.value + '  ');
            // buttons = buttons.concat('B' + b + ': ' + button.value + '  ');

            if (b === 8)
            {
                debug.push(buttons);
                buttons = '';
            }
        }
        
        debug.push(buttons);

        this.text.setText(debug);

        }
    
    
    // }
}
    


/*TODO:
    add menu system

    make arrows navigate the menu

    make A (B on Xbox) select 
    (make sound)
*/
