var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
	// The image/sprite for our enemy
    this.sprite = 'images/puppy.png';
};
//same for player
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-cat-girl.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // when off canvas, reset position of enemy to move across again
    if (this.x > 550) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 512);
    }

    // if collision happened between player and enemies, reset their positions
    if (player.x < this.x + 60 && player.x + 37 > this.x && player.y < this.y + 25 &&  30 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
	 // toggle if collision occur 
        document.querySelector('h1').style.backgroundColor = 'red';
        setTimeout(function () {
            document.querySelector('h1').style.backgroundColor = 'white';
        }, 400);  
    }
};
 
// Prevent player from moving beyond canvas wall boundaries
Player.prototype.update = function() {
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // Check if player won the game and reset their positions
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
		// toggle if player wins
        document.querySelector('h2').style.backgroundColor = 'green';
        setTimeout(function () {
            document.querySelector('h2').style.backgroundColor = 'white';
        }, 400);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handleInput() method
Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
// Place the player object in a variable called player
var player = new Player(200, 380, 50);
// Position "y" where the enemies will are created
var enemyPosition = [60, 140, 220];
var enemy;

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
