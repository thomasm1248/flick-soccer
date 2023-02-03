

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



function Puck(pos, type) {
	this.type = type;
	this.pos = pos;
	this.vel = new V();
	this.rad = 50;
	this.box = new V(this.rad, this.rad);
	this.mass = 10;

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
	ctx.strokeStyle = this.selected ? "gray" : "black";
	ctx.lineWidth = 5;
	ctx.stroke();

	ctx.restore();
};