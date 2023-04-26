

function Object(pos) {
	this.pos = pos;
	this.rad = 0;
	this.box = new V(this.rad, this.rad);

	this.remove = false;
}

Object.prototype.draw = function(ctx) {
	ctx.save();
	translate(ctx, this.pos);

	ctx.restore();
};



function Puck(pos, type, rad) {
	this.type = type;
	this.pos = pos;
	this.vel = new V(Math.random()*4-2, Math.random()*4-2);
	if(rad === undefined) {
		this.rad = 20 + Math.random() * 60;
	} else {
		this.rad = rad;
	}
	this.box = new V(this.rad, this.rad);
	this.mass = this.rad * this.rad / 500;

	// Used by game state to select a puck to be flicked
	this.selected = false;

	this.remove = false;
}

Puck.prototype.draw = function(ctx) {
	ctx.save();
	translate(ctx, this.pos);

	switch(this.type) {
		case "A":
			ctx.fillStyle = "red";
			break;
		case "B":
			ctx.fillStyle = "blue";
			break;
		case "ball":
			ctx.fillStyle = "white";
			break;
		default:
			ctx.fillStyle = "black";
			break;
	}
	ctx.beginPath();
	ctx.arc(0, 0, this.rad, 0, Math.PI*2);
	ctx.fill();
	ctx.strokeStyle = "black";
	ctx.strokeStyle = this.selected ? "white" : "black";
	ctx.lineWidth = 5;
	ctx.stroke();

	ctx.lineWidth = this.rad * 0.2;
	ctx.lineCap = "round";
	ctx.beginPath();
	ctx.arc(0, 0, this.rad * 0.7, -1.5, -0.5);
	ctx.strokeStyle = "white";
	ctx.globalAlpha = 0.3;
	ctx.stroke();

	ctx.restore();
};