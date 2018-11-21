let difficult = 50;
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
        this.speed = (Math.random() * difficult) + difficult;
    }
    collision() {
        let widthLimit = 80,
            heightLimit = 60;
        if ((player.x + widthLimit > this.x) &&
            (player.x < this.x + widthLimit) &&
            (player.y + heightLimit > this.y) &&
            (player.y < this.y + heightLimit)) {
            player.y = 405;

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
            this.x = -101;
            this.speed = (Math.random() * difficult) + difficult;
        }
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player extends Root {

    constructor(x, y, sprite) {
        super(x, y, sprite);
        this.moveUpDown = 85.5;
        this.moveLeftRight = 101;
    }

    update() {
        if (this.y === -22.5) {
            this.y = 405;
            this.level++;
            if(this.level < 10){
                difficult += 50;
            }
        }
    }

    handleInput(key) {
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
                    break;
                }
        }
    }
    // Draw the enemy on the screen, required method for game
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player(202, 405, 'images/char-boy.png');
let allEnemies = [new Enemy(-110, 60, 'images/enemy-bug.png'),
    new Enemy(-101, 140, 'images/enemy-bug.png'),
    new Enemy(-201, 220, 'images/enemy-bug.png'),
    new Enemy(-301, 60, 'images/enemy-bug.png'),
    new Enemy(-401, 140, 'images/enemy-bug.png'),
    new Enemy(-501, 220, 'images/enemy-bug.png')
];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});