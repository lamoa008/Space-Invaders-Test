class Alien {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.hastighet = 1 + (Level / 10);
        this.w = 20
            this.h = 25
            this.skalSlettes = false;
    }

    getCenter() {
        return createVector(this.pos.x + this.w / 2, this.pos.y + this.h / 2);
    }

    settHastighet(hastighet) {
        this.hastighet = hastighet;
    }

    snu() {
        this.hastighet *= -1
        this.pos.y += 10
    }

    harKollidert() {
        if (this.hastighet > 0 && this.pos.x > width - this.w) {
            return true
        }
        if (this.hastighet < 0 && this.pos.x < 0) {
            return true
        }
        return false
    }

    show() {
        fill(255, 0, 0)
        //rect(this.pos.x, this.pos.y, this.w, this.h);
        image(alienImage, this.pos.x, this.pos.y);
    }
    update() {

        if (random(10000) < 5 + Level) {
            AlienLaser.push(new Laser(this.pos.x, this.pos.y, -1));
        }
        this.pos.x += this.hastighet
    }

}
