AFRAME.registerComponent('game', {
    schema: {
        spawntime: {
            default: 2000
        },
        cactusChance: { default: 0.2 }
    },
    init: function () {
        this.countdown = this.data.spawntime;
        this.targets = Array.from(document.querySelectorAll('.placeholder'));

    },

    update: function (oldData) {

    },

    tick: function (time, timeDelta) {
        this.countdown -= timeDelta;
        if (this.countdown <= 0) {
            //spawn cupcake or cactus
            const rnd = ~~(Math.random() * this.targets.length);

            if (!this.targets[rnd].hasChildNodes()) {
                let entity = document.createElement('a-entity');
                if (Math.random() < this.data.cactusChance) {
                    entity.setAttribute("mixin", "cactus");
                } else {
                    entity.setAttribute("mixin", "cupcake");
                }
                entity.setAttribute('destroy','1000');
                this.targets[rnd].append(entity);
            }

            this.countdown = this.data.spawntime;
        }
    },

});