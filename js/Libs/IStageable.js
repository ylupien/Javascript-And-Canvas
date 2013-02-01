
IStageable = function() { };

IStageable.EV_DESTROY = 'destroy';

IStageable.prototype.initialize = function(stage) { };

IStageable.prototype.start = function() { };

IStageable.prototype.run = function() { };

IStageable.prototype.renderTo = function(surface) { }

IStageable.prototype.isAlive = function() { };
