
function Model(canvas, context, config) {
	this.canvas = canvas;
	this.ctx = context;
	this.config = config;

	this.pucks = [];
	this.toBeReplaced = [];

	this.resetPucks();

	this.whosTurn = "A";
}

Model.prototype.resetPucks = function() {
	this.pucks = [];

	// Add soccer ball
	this.pucks.push(new Puck(new V(this.canvas.width/2, this.canvas.height/2), "ball", 50));
	
	// Add player pucks
	var placingCenterPucks = true;
	var xa = this.canvas.width / 4;
	var xb = this.canvas.width - xa;
	for(var y = this.canvas.height / 2; y > 90; y -= 130) {
		// Give each player a new puck above the previous
		this.pucks.push(new Puck(new V(xa, y), "A", 50));
		this.pucks.push(new Puck(new V(xb, y), "B", 50));

		// If that wasn't the center puck, add another puck below
		if(!placingCenterPucks) {
			this.pucks.push(new Puck(new V(xa, this.canvas.height - y), "A", 50));
			this.pucks.push(new Puck(new V(xb, this.canvas.height - y), "B", 50));
		}
		placingCenterPucks = false
	}
	// Add another row of player pucks with random sizes
	placingCenterPucks = true;
	xa -= 130;
	xb += 130;
	for(var y = this.canvas.height / 2; y > 90; y -= 180) {
		var randomRad = 20 + Math.random() * 60;
		// Give each player a new puck above the previous
		this.pucks.push(new Puck(new V(xa, y), "A", randomRad));
		this.pucks.push(new Puck(new V(xb, y), "B", randomRad));

		// If that wasn't the center puck, add another puck below
		if(!placingCenterPucks) {
			randomRad = 20 + Math.random() * 60;
			this.pucks.push(new Puck(new V(xa, this.canvas.height - y), "A", randomRad));
			this.pucks.push(new Puck(new V(xb, this.canvas.height - y), "B", randomRad));
		}
		placingCenterPucks = false
	}
};

Model.prototype.drawAll = function() {
	// Shortcuts
	var ctx = this.ctx;
	var canvas = this.canvas;

	// Draw background
	ctx.fillStyle = "#c3a049"; // Dirt color
	ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

	// Draw center guide box for placing ball (white) puck
	ctx.strokeStyle = "black";
	ctx.lineWidth = 5;
	ctx.strokeRect(canvas.width / 4, canvas.height / 4, canvas.width / 2, canvas.height / 2);

	// Draw pucks
	for(var i = 0; i < this.pucks.length; i++) {
		this.pucks[i].draw(ctx);
	}
};

Model.prototype.draw = function(layer) {
	switch(layer) {
		case "all":
			this.drawAll();
			break;
	}
};