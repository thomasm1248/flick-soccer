
function MovePieces(engine) {
	// Shortcuts
	this.engine = engine;
	this.model = engine.model;
	this.config = engine.config;
}

/* Game loop

Everything that happens each frame in the game is done here.

*/
MovePieces.prototype.update = function() {
	// Shortcuts
	var pucks = this.model.pucks;
	var canvas = this.engine.canvas;

	// Physics
	elasticCollisions(pucks);
	applyFriction(pucks, 0.15);
	applyVelocity(pucks);
	
	// Check if ball made it to either side
	var winConditionMet = false;
	var winner = "";
	// Find the ball puck
	for(var i = 0; i < pucks.length; i++) {
		// Check for win condition
		if(pucks[i].type === "ball") {
			var x = pucks[i].pos.x;
			var y = pucks[i].pos.y;
			var rad = pucks[i].rad;
			// If the ball goes off the top or bottom, it can no longer score
			if(y < rad || y > canvas.height - rad) {
				break;
			}
			// Otherwise, it can score
			if(x < rad) {
				winner = "Blue Team";
				winConditionMet = true;
			} else if(x > canvas.width - rad) {
				winner = "Red Team";
				winConditionMet = true;
			}
		}
	}

	// Draw
	this.model.draw("all");

	// If win condition was met, display the game over screen
	if(winConditionMet) {
		this.engine.state = new GameOver(this.engine, winner);
	}

	// Switch to PlayerTurn when pieces stop moving
	for(var i = 0; i < pucks.length; i++) {
		if(pucks[i].vel.normSquared() != 0) {
			return; // At least one puck is moving
		}
	}
	// Remove pucks that went out of bounds
	for(var i = 0; i < pucks.length; i++) {
		// Shortcuts
		var pos = pucks[i].pos;
		var rad = pucks[i].rad;

		// Check if the puck is out of bounds
		if(pos.x < rad || pos.x > canvas.width - rad || pos.y < rad || pos.y > canvas.height - rad) {
			this.model.toBeReplaced.push(pucks[i]);
			pucks.splice(i--, 1);
		}
	}
	// If none of the pieces are moving,
	this.engine.state = new PlayerTurn(this.engine);
};