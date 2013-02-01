/**
 * Star.  
 * 
 * @constructor
 */
Star = function() {
	
	this.coord     = new Coord(0, 0);
	this.dimension = new Dimension(3, 3);

	this.side = 5;
	
	this.life = 150;
};

Star.prototype = new IStageable();

Star.prototype.initialize = function(stage) {
	this.stageDimension = stage.getDimension();
};

Star.prototype.start = function() {
	this._initialLife = this.life;
};

Star.prototype.run = function() {
	this.life--;
};

Star.prototype.renderTo = function(surface) {
	var radius = this.life;
	surface.save();
	surface.translate(this.coord.x, this.coord.y);
	surface.beginPath()
	
	surface.rotate(Math.computedCos[this.life % 360]);
	surface.moveTo(radius, 0);
	
	for (var i=0; i<(this.side * 2) - 1; i++){
		surface.rotate(Math.PI / this.side);
	  if(i%2 == 0) {
		  surface.lineTo((radius / 0.525731) * 0.200811, 0);
	  } else {
		  surface.lineTo(radius, 0);
	  }
	}	
	surface.closePath();
	surface.fill();
	surface.restore();
};

Star.prototype.isAlive = function() {
	return this.life > 0;
}
