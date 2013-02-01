/**
 * Color value
 *
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @constructor
 */
Color = function(r, g, b) {
	this.r = r;
	this.g = g;
	this.b = b;
};

Color.prototype.fade = function(percent) {
	this.fadePercent = percent;
};

Color.prototype.hex = function() {
	return '#' + this.r.toString(16).lpad('0', 2) + this.g.toString(16).lpad('0', 2) + this.b.toString(16).lpad('0', 2);
};