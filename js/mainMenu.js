var mainMenu = {
  create: function(){
    var self = this;
    self.menuBg = game.add.tileSprite(0, 0, 1024, 640, 'level_select');
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
  game.state.start('levelone');
};
function level2Select() {
  game.state.start('leveltwo');
}
