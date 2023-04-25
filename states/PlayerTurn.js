
function PlayerTurn(engine) {
	// Shortcuts
	this.engine = engine;
	this.model = engine.model;
	this.config = engine.config;

	// State of turn
	this.state = this.model.toBeReplaced.length > 0 ? "placing" : "selecting";
	this.selectedPuck;
}

PlayerTurn.prototype.update = function() {
	// Shortcuts
	var pucks = this.model.pucks;
	var canvas = this.engine.canvas;
	var mouse = this.engine.mouse;

	// User input
	switch(this.state) {
		case "aiming":
			if(mouse.clicked) {
				this.selectedPuck.selected = false;
				this.selectedPuck.vel = mouse.pos.subtract(this.selectedPuck.pos).scale(0.05);
				this.engine.state = new MovePieces(this.engine);
				this.model.whosTurn = this.model.whosTurn === "A" ? "B" : "A";
			}
			break;
		case "selecting":
			if(mouse.clicked) {
				// Find which puck was clicked
				for(var i = 0; i < pucks.length; i++) {
					var puck = pucks[i];
					var puckRadSquared = puck.rad * puck.rad;
					if(puck.pos.subtract(mouse.pos).normSquared() < puckRadSquared) {
						if(puck.type !== this.model.whosTurn) break;
						this.selectedPuck = puck;
						puck.selected = true;
						this.state = "aiming";
						break;
					}
				}
			}
			break;
		case "placing":
			if(mouse.clicked) {
				var puckToPlace = this.model.toBeReplaced[0];

				// You can't place the puck on another puck
				var overlap = false;
				for(var i = 0; i < pucks.length; i++) {
					if(pucks[i].pos.dist(puckToPlace.pos) < pucks[i].rad + puckToPlace.rad) {
						overlap = true;
						break;
					}
				}

				// You can't place a puck off the field
				if(puckToPlace.pos.x < puckToPlace.rad || puckToPlace.pos.x > canvas.width - puckToPlace.rad || puckToPlace.pos.y < puckToPlace.rad || puckToPlace.pos.y > canvas.height - puckToPlace.rad) overlap = true;

				// You can't place the ball puck out of the box
				var w = canvas.width / 4;
				var h = canvas.height / 4;
				if(puckToPlace.type === "ball" && (puckToPlace.pos.x < puckToPlace.rad + w || puckToPlace.pos.x > canvas.width - puckToPlace.rad - w || puckToPlace.pos.y < puckToPlace.rad + h || puckToPlace.pos.y > canvas.height - puckToPlace.rad - h)) overlap = true;

				// Skip placement if a rule a broken
				if(!overlap) {
					pucks.push(puckToPlace);
					puckToPlace.vel = new V();
					puckToPlace.pos = mouse.pos;
					this.model.toBeReplaced.splice(0, 1);
					if(this.model.toBeReplaced.length === 0) {
						this.state = "selecting";
					}
				}
			}
			break;
	}

	// Draw
	this.model.draw("all");
	if(this.state === "placing") {
		var ctx = this.engine.ctx;
		ctx.save();
		ctx.globalAlpha = 0.5;
		var puckToPlace = this.model.toBeReplaced[0];
		puckToPlace.pos = mouse.pos;
		puckToPlace.draw(ctx);
		if(puckToPlace.type === "ball") {
			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, canvas.width, canvas.height / 4);
			ctx.fillRect(0, canvas.height / 4, canvas.width / 4, canvas.height / 4 * 3);
			ctx.fillRect(canvas.width / 4, canvas.height / 4 * 3, canvas.width / 4 * 3, canvas.height / 4);
			ctx.fillRect(canvas.width / 4 * 3, canvas.height / 4, canvas.width / 4, canvas.height / 2);
		}
		ctx.restore();
	}
};