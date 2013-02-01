Math.randRange = function(start, end) {
	return Math.floor(Math.random()*(end-start+1))+start;	
}

Math.computedCos = [];
Math.computedSin = [];

for(var i=-360; i<360; i++) {
	Math.computedCos[i] = (Math.cos(Math.PI * i / 180));
	Math.computedSin[i] = (Math.sin(Math.PI * i / 180));
};
