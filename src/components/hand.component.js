var COLORS = ['red', 'green', 'blue'];
var lastIndex = -1;

/*
    Findings:  is this still correct? it seems to be the other way around
        left hand = gamepad index 4
        right hand = gamepad index 5 
*/

// Todo:
//  add handedness
AFRAME.registerComponent('hololens-hand', {
    schema: {
        hand: { type: 'string', default: '' },
    },
    init: function () {
        let comp = this;
        window.addEventListener("gamepadconnected", function (e) {
            // console.log(navigator.getGamepads());
            if (e.gamepad) {
                if (e.gamepad.hand == comp.data.hand) {
                    console.dir(e.gamepad);
               }
            }
            // if(e.gamepad.hand == this.data.hand){
            //     comp.isTracking = true;
            // }
            // var gp = navigator.getGamepads()[e.gamepad.index];
            // comp.isTracking = false;
            // if(gp.index===4 && comp.data.hand==='left'){
            //     comp.isTracking = true;
            // }
            // if(gp.index===5 && comp.data.hand==='right'){
            //     comp.isTracking = true;
            // }
            //  console.log(                `Gamepad connected at index ${gp.index}: ${gp.id}.${gp.buttons.length} buttons, ${gp.axes.length} axes.`);
        });
        window.addEventListener('gamepaddisconnected', function (e) {
            if (e.gamepad) {
                if (e.gamepad.hand == comp.data.hand) {
                    console.log('disconnected:'+e.gamepad.hand);
               }
            }
            // console.log(e);
            // if(e.gamepad.hand == this.data.hand){
            //     comp.isTracking = false;
            // }
            // var gp = navigator.getGamepads()[e.gamepad.index];
            // if(gp.index===4 && comp.data.hand==='left'){
            //     comp.isTracking = false;
            // }
            // if(gp.index===5 && comp.data.hand==='right'){
            //     comp.isTracking = false;
            // }
        });

        
        this.box = document.createElement('a-box');
        this.box.setAttribute('scale', '.1 .1 .1');
        this.el.append(this.box);
    },
    update: function () {
        this.hand = this.data.hand === 'left' ? 4 : 5;
    },
    tick: function () {
        if (!this.isTracking) return;
        if (navigator.getGamepads) {
            const gp = navigator.getGamepads();

            if (gp) {
                if (gp && gp[this.hand]) {
                    if (gp[this.hand].pose && gp[this.hand].pose.position) {
                        var p = gp[this.hand].pose.position;
                        // var r = gp[4].pose.orientation;
                        // var q = new THREE.Quaternion();
                        // q.fromArray(r);
                        // var v = new THREE.Euler();
                        // v.setFromQuaternion(q);
                        // console.log(v.x);

                        this.box.setAttribute('position', { x: p[0], y: p[1], z: p[2] });
                        this.box.object3D.quaternion.fromArray(gp[this.hand].pose.orientation);
                        // this.box.setAttribute('rotation', {
                        //     x: THREE.Math.radToDeg(v.x),
                        //     y: THREE.Math.radToDeg(v.y),
                        //     z: THREE.Math.radToDeg(v.z)
                        // });
                        // console.log(gp[4].pose.position);
                    }
                }
            }
        }
    },
});