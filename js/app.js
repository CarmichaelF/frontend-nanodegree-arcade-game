/*
difficulty - Variable used to set the difficulty of the game, setting the speed of enemys.
yEnemy - Variable used to set the position Y of a new enemy based on the level.
lessOne - Variable used to define when an enemy will disappear based on the "collision method".
*/
let difficulty = 80,
    yEnemy = 60,
    lessOne = false;
//Root class used to build Player and Enemy.
class Root {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

//Enemy class used to instantiate new enemys.
class Enemy extends Root {
    constructor(x, y, sprite) {
        super(x, y, sprite = 'images/enemy-bug.png');
        this.speed = Math.random() * (difficulty - difficulty / 2) + difficulty / 2;
    }
    //Method used to verify if there was collision.
    collision() {
        let widthLimit = 80,
            heightLimit = 60;
        if ((player.x + widthLimit > this.x) &&
            (player.x < this.x + widthLimit) &&
            (player.y + heightLimit > this.y) &&
            (player.y < this.y + heightLimit)) {
            if (player.life > 0) {
                player.y = 405;
                player.life--;
                lessOne = true;
                life.innerHTML = this.life;
            } else {
                allEnemies.map((enemy) => {
                    enemy.speed = 0
                });
                player.stop = true;
                $('#myModal').modal('show');
            }
        }
    }

    // Update the enemy's position, required method for game.
    // Parameter: dt, a time delta between ticks.
    update(dt) {
        this.collision();
        this.x += this.speed * dt;
        if (this.x > ctx.canvas.width) {
            if (lessOne === true) {
                player.decreaseLevel();
                lessOne = false;
            }
            this.x = -101;
            this.speed = Math.random() * (difficulty - difficulty / 2) + difficulty / 2;
        }
    }
}

//Function used to reset the levels.
function resetLevels() {
    player = new Player(202, 405, 'images/char-boy.png');
    difficulty = 80;
    allEnemies = inicializeEnemies();
    player.stop = false;
}

//Player Class, used to instantiate new enemys.
class Player extends Root {
    constructor(x, y, sprite) {
        super(x, y, sprite);
        this.moveUpDown = 85.5;
        this.moveLeftRight = 101;
        this.life = 3;
        this.level = 1;
        this.stop = false;
    }
    //Update the enemy's position, required method for game.
    update() {
        let life = document.getElementById("life");
        let level = document.getElementById("level");
        life.innerHTML = this.life;
        level.innerHTML = this.level;
        if (this.y === -22.5) {
            this.increaseLevel();
        }
    }
    //Increases the game level.
    increaseLevel() {
        this.y = 405;
        this.level++;
        if (this.level < 5) {
            difficulty += difficulty;
            life.innerHTML = this.life;
            allEnemies.push(new Enemy(-110, yEnemy, 'images/enemy-bug.png'));
            yEnemy += 80;
            if (yEnemy === 220) {
                yEnemy = 60;
            }
        } else {
            alert("Você passou todos os 5 níveis, parabéns!");
            resetLevels();
        }
    }
    //Decreases the game level.
    decreaseLevel() {
        if (this.level > 1) {
            difficulty -= 100;
            allEnemies.pop();
            this.level--;
        }
    }
    //Used to "catch" the key pressed.
    handleInput(key) {
        if (this.stop === false) {
            switch (key) {
                case 'left':
                    if (this.x > 0) {
                        this.x -= this.moveLeftRight;
                    }
                    break;
                case 'up':
                    this.y -= this.moveUpDown;
                    break;
                case 'right':
                    if (this.x < 404) {
                        this.x += this.moveLeftRight;
                    }
                    break;
                case 'down':
                    if (this.y < 404) {
                        this.y += this.moveUpDown;

                    }
                    break;
            }
        }
    }
}


//Function used to "reset" enemys.
function inicializeEnemies() {
    return [new Enemy(-110, 60),
        new Enemy(-101, 140),
        new Enemy(-201, 220)
    ];
}

let player = new Player(202, 405, 'images/char-boy.png');
let allEnemies = inicializeEnemies();

// This listens for key presses and sends the keys to Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };

    player.handleInput(allowedKeys[e.keyCode]);

});
