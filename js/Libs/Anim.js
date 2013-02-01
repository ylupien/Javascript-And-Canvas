Anim = function() {
	this.coord = new Coord(0, 0);

	this.image = new Image();
	this.image.src = 'images/anim.png';
	
	this.life = 10;
};

Anim.prototype = new IStageable();

Anim.prototype.initialize = function(stage) {
	this.stageDimension = stage.getDimension();
};

Anim.prototype.run = function() {
	 this.life = this.life + 0.5;
	 this.coord.xAdd(4);
	 if (this.coord.x > this.stageDimension.width) {
		 this.coord.x = -100;
	 }
};

Anim.prototype.renderTo = function(surface) {
	surface.save();
	surface.translate(this.coord.x, this.coord.y);
	
	var x = Math.floor(this.life) % 6;
	var y = (Math.floor(this.life / 6)) % 5
	
	surface.drawImage(
		this.image, x * 100, y * 123, 100, 123, 
		-50, -61, 100, 123
	);
	surface.restore();
};


Anim.prototype.isAlive = function() {
	return this.life > 0;
}
