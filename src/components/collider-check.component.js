
var COLORS = ['red', 'green', 'blue'];

AFRAME.registerComponent('collider-check', {
  dependencies: ['raycaster'],

  init: function () {

    this.el.addEventListener('raycaster-intersection', function (e) {
      let elm = e.detail.els[0];
      if (elm.classList.contains('cupcake')) {
        elm.sceneEl.components.game.scoring();
        elm.remove();
      }
      if (elm.classList.contains('cactus')) {
        elm.sceneEl.components.game.gameover();
        elm.remove();
      }
    });
  }
});