
var config = {
	fullscreen: true
};

var engine = new Engine($("canvas")[0], Model, PlayerTurn, config);
engine.init();