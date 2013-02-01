/**
 * Spiral of particles.
 * 
 * @constructor
 */
Spiral = function() {
	this.coord = new Coord(0, 0);
	
	this.particleCount = 0;
	this.maxPaticle = 359;
	
	this.directionAngle = 0;
	this.angleStep = -16;
	
	this.life = 200;
};

Spiral.prototype = new IStageable();

Spiral.prototype.initialize = function(stage) {
	this.stage = stage;
	
	jQuery(this.stage).bind(
		Stage.EV_ENTERFRAME, 
		jQuery.proxy(this._onStageEnterFrame, this)
	);
};

Spiral.prototype._onStageEnterFrame = function() {
	if (this.particleCount < this.maxPaticle && this.life > 0) {
		this._spawnNewParticle();
	}
	
};

Spiral.prototype._spawnNewParticle = function() {
	var particle = new Particle();

	particle.life  = 200;
	particle.speed = 1;
	
	particle.coord.assign(this.coord);

	particle.dimension.resizeBoth(2, 2);
	
	this.directionAngle = this.directionAngle + this.angleStep;
	
	
	particle.directionAngle = this.directionAngle;
	
	particle.start();

	jQuery(particle).bind(
		IStageable.EV_DESTROY, 
		jQuery.proxy(this._onParticleDestroy, this)
	);

	this.particleCount ++;
	
	this.stage.add(particle);
};

Spiral.prototype._onParticleDestroy = function() {
	this.particleCount --;
};

Spiral.prototype.run = function() {
	this.life --;
}

Spiral.prototype.isAlive = function() {
	this.particleCount > 0;
}
