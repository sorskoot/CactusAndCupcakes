/** Global AFrame */
AFRAME.registerComponent('game', {
    schema: {
        spawntime: { default: 2000 },
        cactusChance: { default: 0.2 },
        enitityLifetime: { default: 1000 },
        state: {
            oneOf: ['title', 'playing','game-over'],
            default: 'title',
            schemaChange: true
        }
    },
    init: function () {
        this.countdown = this.data.spawntime;
        this.targets = Array.from(document.querySelectorAll('.placeholder'));
        this.titlescreen = document.getElementById('titlescreen');
        this.gameoverscreen = document.getElementById('gameoverscreen');
        this.score=0;
        document.querySelectorAll('[tracked-controls]').forEach(d => {
            d.addEventListener('buttondown', (e) => {
                if (this.data.state === 'title') {
                    this.data.state = 'playing';
                    this.titlescreen.setAttribute('visible', 'false');
                    this.gameoverscreen.setAttribute('visible', 'false');
                    this.targets.forEach(d => d.innerHTML = '');
                    this.score = 0;
                    this.updateScore();
                }
            })
        })        
    },
    tick: function (time, timeDelta) {
        if (this.data.state !== 'playing') {
            return;
        }
        this.countdown -= timeDelta;
        if (this.countdown <= 0) {
            //spawn cupcake or cactus
            const rnd = ~~(Math.random() * this.targets.length);

            if (!this.targets[rnd].hasChildNodes()) {
                let entity = document.createElement('a-entity');
                if (Math.random() < this.data.cactusChance) {
                    entity.setAttribute("mixin", "cactus");
                    entity.classList.add('cactus');
                } else {
                    entity.setAttribute("mixin", "cupcake");
                    entity.classList.add('cupcake');
                }
                entity.setAttribute('destroy', this.data.enitityLifetime);
                entity.classList.add('touchable');
                this.targets[rnd].append(entity);
            }

            this.countdown = this.data.spawntime;
        }
    },
    gameover:function(){
        this.data.state = 'gameover';
        this.gameoverscreen.setAttribute('visible', 'true');
        this.targets.forEach(d => d.innerHTML = '');
    },
    scoring:function(){
        this.score++;
        this.updateScore();        
    },
    updateScore:function(){
        document.getElementById('score')
            .setAttribute('text',{value:`score:${this.score}`});
    }
});