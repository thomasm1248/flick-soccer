
function GameOver(engine, winner) {
	// Shortcuts
	this.engine = engine;
	this.model = engine.model;
	this.config = engine.config;

	// The name of the winning team
	this.winner = winner;

	// Keep track of how dark the overlay should be
	this.fadeIn = 0;
	this.fadeInRate = 0.01;
}

/* Game loop

Everything that happens each frame in the game is done here.

*/
GameOver.prototype.update = function() {
	// Shortcuts
	var pucks = this.model.pucks;
	var canvas = this.engine.canvas;
	var ctx = this.engine.ctx;

	// Physics
	elasticCollisions(pucks);
	applyFriction(pucks, 0.15);
	applyVelocity(pucks);

	// Draw
	this.model.draw("all");

	// Fade in overlay
	if(this.fadeIn < 1) {
		this.fadeIn += this.fadeInRate;
	}

	// Draw game over overlay
	ctx.save();
	ctx.globalAlpha = this.fadeIn * 0.5;
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.globalAlpha = this.fadeIn < 1 ? this.fadeIn : 1;
	ctx.fillStyle = "black";
	ctx.font = "bold 50px Courier";
	ctx.baseline = "center";
	ctx.textAlign = "center";
	ctx.fillText(this.winner + "\nWins!", canvas.width/2, canvas.height/2);
	ctx.restore();
};