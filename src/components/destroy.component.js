AFRAME.registerComponent('destroy', {
    schema: {
        type:'int',
        default: 1500
    },
    init: function () {
        this.countdown = this.data;
    },
    tick: function (time, timeDelta) {
        this.countdown -= timeDelta;
        if (this.countdown <= 0) {
            this.el.remove();
        }
    }

});