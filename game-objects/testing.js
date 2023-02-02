

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
	this.vel = new V(Math.random() * 10 - 5, Math.random() * 10 - 5);
	this.rad = 50;
	this.box = new V(this.rad, this.rad);
	this.mass = 10;

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
	ctx.lineWidth = 5;
	ctx.stroke();

	ctx.restore();
};