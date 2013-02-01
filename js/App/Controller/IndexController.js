/**
 * Index MVC controller. 
 * 
 * @constructor
 * @param {Window} window
 */
IndexController = function(window) {
	this.window        = window;
	
	this.document      = window.document;
	
	this.canvas        = this.document.getElementById('myDrawing');
	this.canvas.width  = window.innerWidth - 16;
	this.canvas.height = window.innerHeight - 60;
	
	this.stage = new Stage(this.canvas);
	
	jQuery(this.canvas).click(
		jQuery.proxy(this._onDocumentClick, this)
	);

	jQuery(this.document).find('.spawn').click(
		jQuery.proxy(this._onBtnSpawnClick, this)
	);

	jQuery(this.document).find('#color').change(
		jQuery.proxy(this._onColorChange, this)
	);
	
	$('#color').ColorPicker({
		onChange: function (hsb, hex, rgb) {
			$('#color').val('#' + hex);
			$('#color').change();
			
		}		
	});
};

IndexController.prototype.start = function() {
	this._drawFrame();
};


IndexController.prototype._onDocumentClick = function(event) {
	var coord = new Coord();
	coord.x = event.pageX - this.canvas.offsetLeft;
	coord.y = event.pageY - this.canvas.offsetTop;
	
	if (Math.randRange(0, 1)) {
		this._createSpiral(coord);
	} else {
		this._createSparcle(coord);
	}
};

IndexController.prototype._onColorChange = function(event) {
	this.stage.surface.strokeStyle = jQuery(event.target).val();
	this.stage.surface.fillStyle = jQuery(event.target).val();
};

IndexController.prototype._onBtnSpawnClick = function(event) {
	var action = jQuery(event.target).attr('id');
	
	var coord = new Coord();
	coord.x = Math.randRange(0, this.canvas.width);
	coord.y = Math.randRange(0, this.canvas.height);
	
	if (action == 'spiral')  { this._createSpiral(coord); }
	if (action == 'sparcle') { this._createSparcle(coord); }
	if (action == 'heart') { this._createHeart(coord); }
	if (action == 'runner') { this._createRunner(coord); }
	if (action == 'star') { this._createStar(coord); }
};


IndexController.prototype._createHeart = function(coord) {
	var spiralLeft = new Spiral();
	spiralLeft.coord.assign(coord);
	spiralLeft.directionAngle = 90;
	spiralLeft.angleStep = 1
	this.stage.add(spiralLeft);

	var spiralRight = new Spiral();
	spiralRight.coord.assign(coord);
	spiralRight.directionAngle = 90;
	spiralRight.angleStep = -1
	this.stage.add(spiralRight);
	
}; 


IndexController.prototype._createSpiral = function(coord) {
	var spiral = new Spiral();
	spiral.coord.assign(coord);
	spiral.angleStep = Math.randRange(-16, 16);
	spiral.angleStep = (spiral.angleStep === 0 ? 2 : spiral.angleStep);
	this.stage.add(spiral);
}; 

IndexController.prototype._createSparcle = function(coord) {
	var sparcle = new Sparcle();
	sparcle.coord.assign(coord);
	this.stage.add(sparcle);
};

IndexController.prototype._createRunner = function(coord) {
	var anim = new Anim();
	anim.coord.assign(coord);
	this.stage.add(anim);
};

IndexController.prototype._createStar = function(coord) {
	var star = new Star();
	star.coord.assign(coord);
	this.stage.add(star);
};

IndexController.prototype._drawFrame = function() {
	this.stage.run();
	this.window.requestAnimFrame(jQuery.proxy(this._drawFrame, this));
};


// I Know this is not cool here...  
// Not sure where to put init of controller... But controller are linked to HTML views.
// 
// In desktop application Controllers create instance of the views. 
// In web application the view include / start the controller.
jQuery(document).ready(function() {
	(new IndexController(window)).start();
});