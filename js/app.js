// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x  += this.speed * dt;
    // when enemy reaches end of canvas, it comes back to initial position
    if(this.x >505){
        this.x = 0;
        this.speed = Math.floor(Math.random() * (300 - 30 + 1) + 30);
    }
    // check collision
    if((player.x - this.x) < 65 &&
            (player.y - this.y) < 65 &&
            (this.x - player.x) < 65 &&
            (this.y - player.y) < 65){
                player.resetPosition();
                player.lives -= 1;
                player.lifeLoss.innerHTML = player.lives;
            }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
    this.score = 0;
    this.lives = 3;
    // show score at game over
    this.backdrop = document.querySelector('.backdrop');
    this.backdrop.style.display = 'none';
    this.modal = document.querySelector('.modal');
    this.modal.style.display = 'none';
    // score shown in the game
    this.scoreShown = document.getElementById("score");
    // score shown in the modal
    this.finalScore = document.getElementById('finalScore');
    // this.finalScore.innerHTML = score;
    this.lifeLoss = document.getElementById("lives");
};


Player.prototype.update = function(dt) {
     // this.x  += this.speed * dt;
    // prevent player from going off canvas
    if(this.x < 0){
        this.x = 0;
    }

    if(this.x > 400){
        this.x = 400;
    }

    if(this.y > 400){
        this.y = 400;
    }
    // check if player reached the sky to increment score
    if(this.y < 0){
        this.score += 10;
        this.scoreShown.innerHTML = this.score;
        // position player back where it started
        this.resetPosition();
    }
    this.gameOver();
}

Player.prototype.resetPosition = function() {
    this.x = 200;
    this.y = 380;
}

Player.prototype.gameOver = function() {
    if(this.lives === 0){
        this.backdrop.style.display = 'block';
        this.modal.style.display = 'block';
        this.finalScore.innerHTML = this.score;
    };

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// make the player move
Player.prototype.handleInput = function(keyup) {
    switch (keyup) {
        case 'left' :
            this.x -= 100;
            break;
        case 'right' :
            this.x += 100;
            break;
        case 'up' :
            this.y -= 80;
            break;
        case 'down' :
            this.y += 80;
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var yEnemyCoordinates = [240, 140, 55];

// create enemies with 0 as x coordinate, yEnemyCoordinates for y,
// random speed formula 400 max, 30 min
yEnemyCoordinates.forEach(function(y){
    enemy = new Enemy(0, y, Math.floor(Math.random() * (400 - 30 + 1) + 30));
    allEnemies.push(enemy);
});

var player = new Player (200, 380, 50);


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

