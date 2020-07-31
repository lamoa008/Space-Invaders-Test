class Laser {
    constructor(x, y, vel, c) {
        this.pos = createVector(x, y);
        this.hastighet = vel;
        this.w = 5
            this.h = 10
            this.skalSlettes = false;
			this.c = c
    }

    settHastighet(hastighet) {
        this.hastighet = hastighet;
    }

    show() {
        fill(this.c)
        rect(this.pos.x, this.pos.y, this.w, this.h);
    }

    update() {

        this.pos.y -= this.hastighet
    }
}
