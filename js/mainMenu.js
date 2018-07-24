var mainMenu = {
  create: function(){
    var self = this;
    self.menuBg = game.add.tileSprite(0, 0, 1024, 640, 'level_select');
    menubgm = game.add.audio('menu_bgm', 0.7, true);
		menubgm.play();
    button1 = game.add.button(207, 152, 'button',
      level1Select,
      this,
      2, 1, 0);

    button2 = game.add.button(428, 152, 'button',
      level2Select,
      this,
      2, 1, 0);
  },
  update: function(){
    var self = this;
  }

};

function level1Select() {
  menubgm.stop();
  game.state.start('instructions');
};
function level2Select() {
  menubgm.stop();
  game.state.start('leveltwo');
}
