
Dimension = function (width, height) {
	this.width  = width;
	this.height = height;
};

Dimension.prototype.resizeBoth = function(size) {
	this.width = size;
	this.height = size;
};