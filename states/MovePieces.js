
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
	
	// Remove pucks that are out of bounds and add to replace list
	for(var i = 0; i < pucks.length; i++) {
		var pos = pucks[i].pos;
		var rad = pucks[i].rad;
		if(pos.x < rad || pos.x > canvas.width - rad || pos.y < rad || pos.y > canvas.height - rad) {
			this.model.toBeReplaced.push(pucks[i]);
			pucks.splice(i--, 1);
		}
	}

	// Draw
	this.model.draw("all");

	// Switch to PlayerTurn when pieces stop moving
	for(var i = 0; i < pucks.length; i++) {
		if(pucks[i].vel.normSquared() != 0) {
			return; // At least one puck is moving
		}
	}
	// If none of the pieces are moving,
	this.engine.state = new PlayerTurn(this.engine);
};