
/**
 * Stage where IStageable element can live.  
 * 
 * @param {HTMLCanvasElement} canvas
 * @constructor
 */
function Stage(canvas) {
	this.runnables = [];
	this.canvas = canvas;
	
	this.surface = canvas.getContext('2d');
	this.surface.strokeStyle = "#000000";
	this.surface.fillStyle = "#000000";
}

Stage.EV_ENTERFRAME = 'enterframe';
Stage.EV_EXITFRAME  = 'exitframe';

Stage.prototype.runningCount = function() { 
	return this.runnables.length; 
};

Stage.prototype.getSurface = function() { 
	return this.surface; 
};

Stage.prototype.getDimension = function() { 
	return new Dimension(
		this.canvas.width, 
		this.canvas.height
	);
};

Stage.prototype.add = function(stageable) {
	stageable.initialize(this);
	stageable.start();
	this.runnables.push(stageable);
};

Stage.prototype.run = function() {
	jQuery(this).trigger(Stage.EV_ENTERFRAME);
	
	this.surface.clearRect(
		0, 0, 
		this.canvas.width, 
		this.canvas.height
	);
	
	for(var i=0; i<this.runnables.length; i++) {
		this.runnables[i].run();
		this.runnables[i].renderTo(this.surface);
		if (this.runnables[i].isAlive() === false) {
			jQuery(this.runnables[i]).trigger(IStageable.EV_DESTROY);
			this.runnables.splice(i, 1);
			i--;
		}
	}
	
	jQuery(this).trigger(Stage.EV_EXITFRAME);
};


Stage.prototype.isAlive = function() {
	this.runnables.length > 0;
}