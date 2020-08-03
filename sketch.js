let spiller;
let aliens = [];
let laser = [];
let alienImage;
let spillerImage;
let BakgrunnImage;
let OverImage;
let GameOver = false;
let Score = 0;
let Level = 1;
let AlienLaser = [];
let myStorage = window.localStorage;
let HP = 3
    let MenuImage;
let Menu = true;
let OpgrImage;
let Opgr = false
    let Opgr2 = 0
    let Speed = 2
    let Score2 = 1
    let OpgrCap = 3
    let HPCap = 3
    let LaserSpeed = 2
    let LaserCap = 4
    let BossImage
    let boss = false
    let Boss2

function getHighscore() {
    return myStorage.getItem("highscore");
}

function setHighscore() {
    if (getHighscore() == null || parseInt(getHighscore()) < Score) {
        myStorage.setItem("highscore", "" + Score);
    }
}

function preload() {
    alienImage = loadImage(alienPng);
    spillerImage = loadImage(spillerPng);
    BakgrunnImage = loadImage(BakgrunnPng);
    OverImage = loadImage(OverPng);
    MenuImage = loadImage(MenyPng);
    OpgrImage = loadImage(OpgrPng);
    BossImage = loadImage(BossPng);
}

function setup() {
    setupAliens();
    createCanvas(400, 400);
    spiller = new Spiller(200, 300)
        Boss2 = new Boss(200, 50)
}

function setupAliens() {
    HP = HPCap
        GameOver = false;
    aliens = [];
    AlienLaser = [];
    for (let index = 0; index < 7; index++) {
        for (let rad = 0; rad < 4; rad++) {
            aliens.push(new Alien(50 + index * 50, 50 + rad * 30));
        }
    }
}

function drawAliens() {
	
    let aliensKollidert = false
        for (let index = 0; index < aliens.length; index++) {
            if (aliens[index].harKollidert()) {
                aliensKollidert = true;
            }
        }

        for (let index = aliens.length - 1; index >= 0; index--) {
            if (aliensKollidert) {
                aliens[index].snu();
            }
            if (aliens[index].pos.y >= 300) {
                GameOver = true
                    setTimeout(setupAliens, 5000);
                aliens[index].pos.y = 50
            }
			
            aliens[index].show();
            aliens[index].update();

            for (let indexl = laser.length - 1; indexl >= 0; indexl--) {
                if (aliens[index].getCenter().dist(laser[indexl].pos) < 10) {
                    aliens[index].skalSlettes = true;
                    laser[indexl].skalSlettes = true;
                    Score += (Level * 100 * Score2);
                }
            }

        }
}
function drawLaser() {
    for (let index = laser.length - 1; index >= 0; index--) {
        laser[index].show();
        laser[index].update();
        if (laser[index].pos.y < 0) {
            laser[index].skalSlettes = true
        }

    }

    for (let index = AlienLaser.length - 1; index >= 0; index--) {
        AlienLaser[index].show();
        AlienLaser[index].update();
        if (AlienLaser[index].pos.y > 450) {
            AlienLaser[index].skalSlettes = true
        }
    }
}

function slettFigurer() {
    for (let indexA = aliens.length - 1; indexA >= 0; indexA--) {
        if (aliens[indexA].skalSlettes) {
            aliens.splice(indexA, 1);
        }
    }
    for (let indexB = laser.length - 1; indexB >= 0; indexB--) {
        if (laser[indexB].skalSlettes) {
            laser.splice(indexB, 1);
        }
    }
    if (Boss2.skalSlettes) {
        boss = false
    }
}

function draw() {

    if (Menu) {
        image(MenuImage, 0, 0);
    } else if (GameOver) {
        background(0);
        image(OverImage, 0, 0);
        Level = 1;
        Score = 0;
        Speed = 2
            OpgrCap = 3
            Score2 = 1
            HPCap = 3
            LaserSpeed = 2
            LaserCap = 4

    } else if (Opgr) {
        image(OpgrImage, 0, 0);

    } else {
        rectMode(CENTER)
        background(BakgrunnImage);
        fill(0, 255, 0);
        spiller.show();
        spiller.update();
        if (boss) {
            Boss2.show();
            Boss2.update();
			
			Boss2.harKollidert();
        }

        if (spiller.isHit()) {
            HP--
            if (HP < 1) {
                GameOver = true
                boss = false
                    Level = 1
                    Score = 0
                    setTimeout(setupAliens, 5000);
            }
        }

        drawAliens();
        drawLaser();

        fill(255);
        textSize(15);
        text("Score: " + ~~Score, 20, 40);
        text("Level: " + Level, 20, 20)
        text("Highscore: " + ~~getHighscore(), 20, 60);
        text("HP: " + HP, 20, 80)
        if (boss) {text("Boss: " + Boss2.HP, 20, 100)} 
        setHighscore();

        if (aliens.length == 0 && boss == false) {
            Level++
            if (Level == 10) {
                Boss2 = new Boss(200, 50)
                boss = true
            } else {
				setupAliens();
			}
        }

        slettFigurer();
    }

}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        spiller.settHastighet(Speed * -1);
    } else if (keyCode === RIGHT_ARROW) {
        spiller.settHastighet(Speed);
    }

    if (key === ' ') {
        spiller.settHastighet(0);
    }
    if (key === 'e') {
        if (laser.length <= LaserCap) {
            laser.push(new Laser(spiller.pos.x + 7.5, spiller.pos.y, LaserSpeed, color(0, 255, 0)));
        }
    }
    if (keyCode === ESCAPE) {
        Menu = !Menu;
    }
    if (key === "q") {
        Opgr = !Opgr;
    }
    if (Opgr) {
        if (key === "1") {
            if (OpgrCap > Opgr2 && Score > 3000) {
                Speed += 1
                Opgr2++
                Score -= 3000
            }
        }
        if (key === "2") {
            if (OpgrCap > Opgr2 && Score > 20000) {
                Score2 += 0.1
                Opgr2++
                Score -= 20000
            }
        }
        if (key === "3" && Score > 30000) {
            OpgrCap++
            Score -= 30000
        }
        if (key === "4") {
            if (OpgrCap > Opgr2 && Score > 20000) {
                HPCap += 1
                Opgr2++
                Score -= 20000
            }
        }
        if (key === "5" && Score > 20000) {
            if (OpgrCap > Opgr2) {
                LaserSpeed++
                Opgr2++
                Score -= 20000
            }
        }
        if (key === "6") {
            if (OpgrCap > Opgr2 && Score > 20000) {
                LaserCap++
                Opgr2++
                Score -= 20000
            }
        }
    }
}
