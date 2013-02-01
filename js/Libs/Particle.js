/**
 * Particle.  
 * 
 * @constructor
 */
Particle = function() {
	
	this.coord     = new Coord(0, 0);
	this.dimension = new Dimension(3, 3);
	
	this.directionAngle = 0;
	this.speed          = 1;
	
	this.life  = 10;
};

Particle.prototype = new IStageable();

Particle.prototype.initialize = function(stage) {
	this.stageDimension = stage.getDimension();
};

Particle.prototype.start = function() {
	this._initialLife = this.life;
};

Particle.prototype.run = function() {
	
	this.coord.xAdd(Math.computedCos[this.directionAngle % 360] * this.speed);
	this.coord.yAdd(Math.computedSin[this.directionAngle % 360] * this.speed);
	
	this.life--;
};

Particle.prototype.renderTo = function(surface) {

	var percentOfLifeTime = (this.life * 100) / this._initialLife;
	var opacity = Math.round(percentOfLifeTime, 2);
	
	var curAlpha = surface.globalAlpha;
	surface.globalAlpha = opacity / 100;

	surface.fillRect(
		this.coord.x, this.coord.y, 
		this.dimension.width, this.dimension.height
	);
	
	surface.globalAlpha = curAlpha;
};


Particle.prototype.isAlive = function() {
	return this.life > 0;
}
