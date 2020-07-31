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
}

function setup() {
    setupAliens();
    createCanvas(400, 400);
    spiller = new Spiller(200, 300)
}

function setupAliens() {
    HP = 3
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
                    Score += (Level * 100);
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
}

function draw() {

    if (Menu) {
        image(MenuImage, 0, 0);
    } else if (GameOver) {
        background(0);
        image(OverImage, 0, 0);
        Level = 1;
        Score = 0;
    } else {
        rectMode(CENTER)
        background(BakgrunnImage);
        fill(0, 255, 0);
        spiller.show();
        spiller.update();

        if (spiller.isHit()) {
            HP--
            if (HP < 1) {
                GameOver = true
                    Level = 1
                    Score = 0
                    setTimeout(setupAliens, 5000);
            }
        }

        drawAliens();
        drawLaser();

        fill(255);
        textSize(15);
        text("Score: " + Score, 20, 40);
        text("Level: " + Level, 20, 20)
        text("Highscore: " + getHighscore(), 20, 60);
        text("HP: " + HP, 20, 80)
        setHighscore();

        if (aliens.length == 0) {
            Level++;
            setupAliens();
        }

        slettFigurer();
    }

}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        spiller.settHastighet(-2);
    } else if (keyCode === RIGHT_ARROW) {
        spiller.settHastighet(2);
    }

    if (key === ' ') {
        spiller.settHastighet(0);
    }
    if (key === 'e') {
        if (laser.length <= 4) {
            laser.push(new Laser(spiller.pos.x + 7.5, spiller.pos.y, 4));
        }
    }
    if (keyCode === ESCAPE) {
        Menu = !Menu;
    }
}
