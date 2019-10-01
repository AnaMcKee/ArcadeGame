// Enemies our player must avoid
class Enemy{
    constructor (x, y, speed){
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt){
       // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x  += this.speed * dt;
        // when enemy reaches end of canvas, it comes back to initial position
        if(this.x >505){
            this.x = 0;
            this.speed = Math.floor(Math.random() * (300 - 30 + 1) + 30);
        }
        // check collision following Axis-Aligned Bounding Box algorithm
        // source https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        if (this.x < player.x + 62 &&
            this.x + 62 > player.x &&
            this.y < player.y + 62 &&
            this.y + 72 > player.y){
                console.log(player.x);
                console.log(player.y);
                player.resetPosition();
                player.lives -= 1;
                player.lifeLoss.innerHTML = player.lives;
                alert("You crashed with the enemy!");
        }
    }
    // Draw the enemy on the screen, required method for game
    render() {
       ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor (x, y, speed) {
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
    }
    update(dt) {
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
            alert("You scored!");
        }
        this.gameOver();
    }
    resetPosition() {
        this.x = 200;
        this.y = 380;
    }
    gameOver() {
        // check if there is no lives left, to give player the final score
        if(this.lives === 0){
            this.backdrop.style.display = 'block';
            this.modal.style.display = 'block';
            this.finalScore.innerHTML = this.score;
            document.querySelector(".score-board").style.display = 'none';
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // make the player move in keyboard
    // tile size: col = 101 and row = 83
    handleInput(keyup) {
        switch (keyup) {
            case 'left' :
                this.x -= 101;
                break;
            case 'right' :
                this.x += 101;
                break;
            case 'up' :
                this.y -= 83;
                break;
            case 'down' :
                this.y += 83;
                break;
        }
    }
}

class Gems{
    constructor(){
        // randomize gem location
        let row = Math.floor(Math.random() * 3) + 1;
        let col = Math.floor(Math.random() * 5);
        this.x = col * 101;
        this.y = (row * 83) - 25;
        this.sprite = allGems[0];
        this.visual = true;
    }
    render(){
        if(this.visual){
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
    }
    update(){
        // Gems collision
        const diffX = Math.abs(player.x - this.x);
        const diffY = Math.abs(player.y - this.y);
            if(diffX < 70 && diffY < 30){
                this.visual = false;
                alert('You scored 20 points!!');
                player.score += 20;
                player.scoreShown.innerHTML = player.score;
                this.visualWin = false;
                gem = new Gems();
            }
    }
}

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
allGems = ['images/Gem Green.png',
            'images/Gem Orange.png',
            'images/Gem Blue.png'];

var gem = new Gems();

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

