
var COLORS = ['red', 'green', 'blue'];


AFRAME.registerComponent('hand-touch-listener', {
	init: function () {
    this.lastIndex = -1;
    this.el.addEventListener('raycaster-intersected', evt => {
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

    if(!this.isIntersecting){
      console.log(intersection.object.el.id);
      this.lastIndex = (this.lastIndex + 1) % COLORS.length;
      this.el.setAttribute('material', 'color', COLORS[this.lastIndex]);
    }
    this.isIntersecting = true;
  //  console.log(intersection.point);
  }
});