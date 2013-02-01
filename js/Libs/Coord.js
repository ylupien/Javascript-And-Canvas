/**
 * Coordinate value
 * 
 * @param {Number} x
 * @param {Number} y
 * @constructor
 */
Coord = function (x, y) {
	this.x = x;
	this.y = y;
};

Coord.prototype.moveTo = function(x, y) {
	this.x = x;
	this.y = y;
};

Coord.prototype.xAdd = function (v) {
	this.x = this.x + v;
};

Coord.prototype.yAdd = function (v) {
	this.y = this.y + v;
};

Coord.prototype.assign = function(coord) {
	this.x = coord.x;
	this.y = coord.y;
};