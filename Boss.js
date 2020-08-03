class Boss {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.hastighet = 2
        this.w = 100
        this.h = 100
        this.skalSlettes = false;
        this.HP = 50
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
            Boss2.snu()
            return true
        }
        if (this.hastighet < 0 && this.pos.x < 0) {
            Boss2.snu()
            return true
        }
        return false
    }

    show() {
        fill(255, 0, 0)
        //rect(this.pos.x, this.pos.y, this.w, this.h);
        image(BossImage, this.pos.x, this.pos.y);
    }

    getCenter() {
        return createVector(this.pos.x + this.w / 2, this.pos.y + this.h / 2);
    }

    update() {

        if (random(500) < 5 + Level) {
            AlienLaser.push(new Laser(this.pos.x + 50, this.pos.y + 75, -1, color(255, 0, 0)));
        }
        this.pos.x += this.hastighet

        if (this.HP == 0) {
            boss = false
            Level++
            Score += 100000
        }


        for (let indexl = laser.length - 1; indexl >= 0; indexl--) {
            if (Boss2.getCenter().dist(laser[indexl].pos) < 50) {
                laser[indexl].skalSlettes = true;
                Boss2.HP--
            }
        }
    }


}
