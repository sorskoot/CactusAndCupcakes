
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


AFRAME.registerComponent('hand-touch-listener', {
  init: function () {
    this.lastIndex = -1;
    this.el.addEventListener('raycaster-intersected', evt => {
      console.log(evt);
      this.raycaster = evt.detail.el;
    });
    this.el.addEventListener('raycaster-intersected-cleared', evt => {

      this.raycaster = null;
      this.isIntersecting = false;
    });
  },

  tick: function () {
    if (!this.raycaster) { return; }  // Not intersecting.

    let intersection = this.raycaster.components.raycaster.getIntersection(this.el);

    if (!intersection) {
      return;
    }

    if (!this.isIntersecting) {
      console.log(intersection);

    }
    this.isIntersecting = true;
    //  console.log(intersection.point);
  }
});