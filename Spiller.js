class Spiller {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.hastighet = 0;
		this.w = 20;
		this.h = 25;
    }
	
	 getCenter() {
        return createVector(this.pos.x + this.w / 2, this.pos.y + this.h / 2);
    }

    settHastighet(hastighet) {
        this.hastighet = hastighet;
    }

    show() {
        fill(0, 255, 0)
        //rect(this.pos.x, this.pos.y, 50, 50);
        image(spillerImage, this.pos.x, this.pos.y);
    }
	
	isHit() {
		let hit = false
		
		for(let index = AlienLaser.length - 1; index >= 0; index--) {
			if (this.getCenter().dist(AlienLaser[index].pos) < 12.5) {
				hit = true;
				AlienLaser.splice(index, 1);
			}
		}
		
		return hit;
	}

    update() {
        if (this.hastighet > 0 && this.pos.x > width - 20) {
            this.hastighet = 0
        }
        if (this.hastighet < 0 && this.pos.x < 0) {
            this.hastighet = 0
        }
        this.pos.x += this.hastighet
    }
}
