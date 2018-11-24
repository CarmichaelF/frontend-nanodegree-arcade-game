let difficult = 80,
    yEnemy = 60,
    lessOne = false;
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

class Enemy extends Root {
    constructor(x, y, sprite) {
        super(x, y, sprite);
        this.speed = Math.random() * (difficult - difficult / 2) + difficult / 2;
    }
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

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.collision();
        this.x += this.speed * dt;
        if (this.x > ctx.canvas.width) {
            if (lessOne === true) {
                player.decreaseLevel();
                lessOne = false;
            }
            this.x = -101;
            this.speed = Math.random() * (difficult - difficult / 2) + difficult / 2;
        }
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

function resetLevels() {
    player = new Player(202, 405, 'images/char-boy.png');
    difficult = 80;
    allEnemies = inicializeEnemies();
    player.stop = false;
}

class Player extends Root {
    constructor(x, y, sprite) {
        super(x, y, sprite);
        this.moveUpDown = 85.5;
        this.moveLeftRight = 101;
        this.life = 3;
        this.level = 1;
        this.stop = false;
    }

    update() {
        let life = document.getElementById("life");
        let level = document.getElementById("level");
        life.innerHTML = this.life;
        level.innerHTML = this.level;
        if (this.y === -22.5) {
            this.increaseLevel();
        }
    }

    increaseLevel() {
        this.y = 405;
        this.level++;
        if (this.level < 5) {
            difficult += difficult;
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

    decreaseLevel() {
        if (this.level > 1) {
            difficult -= 100;
            allEnemies.pop();
            this.level--;
        }
    }

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
    // Draw the enemy on the screen, required method for game
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

function inicializeEnemies() {
    return [new Enemy(-110, 60, 'images/enemy-bug.png'),
        new Enemy(-101, 140, 'images/enemy-bug.png'),
        new Enemy(-201, 220, 'images/enemy-bug.png')
    ];
}

let player = new Player(202, 405, 'images/char-boy.png');
let allEnemies = inicializeEnemies();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };

    player.handleInput(allowedKeys[e.keyCode]);

});