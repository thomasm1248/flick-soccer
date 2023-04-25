
function Model(canvas, context, config) {
	this.canvas = canvas;
	this.ctx = context;
	this.config = config;

	this.pucks = [];
	this.toBeReplaced = [];

	var totalRedMass = 1
	var totalBlueMass = 2
	while(Math.abs(totalRedMass / totalBlueMass - 1) > 0.1) {
		this.resetPucks();
		totalRedMass = 0;
		totalBlueMass = 0;
		for(var puck in this.pucks) {
			if(puck.type == "A") {
				totalRedMass += puck.mass;
			} else if(puck.type == "B") {
				totalBlueMass += puck.mass;
			}
		}
	}

	this.whosTurn = "A";
}

Model.prototype.resetPucks = function() {
	this.pucks = [];

	// Add soccer ball
	this.pucks.push(new Puck(new V(this.canvas.width/2, this.canvas.height/2), "ball"));
	
	// Add player pucks
	var placingCenterPucks = true;
	var xa = this.canvas.width / 4;
	var xb = this.canvas.width - xa;
	for(var y = this.canvas.height / 2; y > 80; y -= 130) {
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
	// Add another row of player pucks
	placingCenterPucks = true;
	xa -= 130;
	xb += 130;
	for(var y = this.canvas.height / 2; y > 80; y -= 180) {
		// Give each player a new puck above the previous
		this.pucks.push(new Puck(new V(xa, y), "A"));
		this.pucks.push(new Puck(new V(xb, y), "B"));

		// If that wasn't the center puck, add another puck below
		if(!placingCenterPucks) {
			this.pucks.push(new Puck(new V(xa, this.canvas.height - y), "A"));
			this.pucks.push(new Puck(new V(xb, this.canvas.height - y), "B"));
		}
		placingCenterPucks = false
	}
};

Model.prototype.drawAll = function() {
	// Shortcuts
	var ctx = this.ctx;

	// Draw background
	ctx.fillStyle = "#46e275"; // Green grass
	ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

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