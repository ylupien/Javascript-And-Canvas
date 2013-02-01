Sparcle = function() {
	
	this.stage = null;
	
	this.coord = new Coord(0, 0);
	
	this.particleCount = 0;
	this.maxPaticle    = 200;
	this.spawn         = 10;
	
	this.life = 50;
}

Sparcle.prototype = new IStageable();

Sparcle.prototype.initialize = function(stage) {
	this.stage = stage;
	
	jQuery(this.stage).bind(
		Stage.EV_ENTERFRAME, 
		jQuery.proxy(this._onStageEnterFrame, this)
	);
};

Sparcle.prototype._onStageEnterFrame = function() {
	if (this.life > 0) {
		this._spawnParticles();
	}
};

Sparcle.prototype._spawnParticles = function() {
	for(var i=0; i<this.spawn; i++ ) {
		this._spawnParticle();
	}
};


Sparcle.prototype._spawnParticle = function() {
	var particle = new Particle();
	
	particle.life  = Math.randRange(25, 100);
	particle.speed = Math.randRange(2, 20) / 10;
	
	particle.coord.assign(this.coord);
	particle.dimension.resizeBoth(Math.randRange(1, 10));
	
	particle.directionAngle = Math.randRange(1, 360);
	
	particle.start();
	
	jQuery(particle).bind(
		IStageable.EV_DESTROY, 
		jQuery.proxy(this._onParticleDestroy, this)
	);
	
	this.particleCount++;
	
	this.stage.add(particle);
};

Sparcle.prototype._onParticleDestroy = function() {
	this.particleCount --;
};

Sparcle.prototype.run = function() {
	this.life --;
	
};

Sparcle.prototype.isAlive = function() {
	return this.particleCount > 0;
};
