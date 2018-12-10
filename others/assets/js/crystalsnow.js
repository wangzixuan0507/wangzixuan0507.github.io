canvasApp();

function canvasSupport() {
	return Modernizr.canvas;
}

function canvasApp() {
	if (!canvasSupport()) {
		return;
	}
	
	var displayCanvas = document.getElementById("canvas2");
	var context = displayCanvas.getContext("2d");
	
	var centerX;
	var centerY;
	var boundaryRad;
	var particleList;
	var numParticles;
	var displayWidth;
	var displayHeight;
	var timer;
	var p;
	var particleColor;
	var particleRad;
	var boundaryRadSquare;
	var spriteSheetCanvas;
	var spriteSheetContext;
	var lastX;
	var lastY;
	var exitX;
	var exitY;
	var exitRad;
	var vx;
	var vy;
	var twiceProjFactor;
	var coreRad;
	var spriteCircleInnerRad, spriteCircleOuterRad, spriteCircleOuterDiam;
	var radSquare;
	var initVelMax;
	var temp;
	var haloEdgeColor,haloOuterColor;
	var background = new Image();
		background.src = "crystalBall.png";
	
	init();
	
	function init() {
		
		numParticles = 50;
		
		particleColor = "#fff";		
		particleRad = 5;
		coreRad = 2;
		particleDiam = 2*particleRad;
		displayWidth = displayCanvas.width;
		displayHeight = displayCanvas.height;
		centerX = displayWidth/2;
		centerY = displayHeight/2;
		boundaryRad = 0.5*Math.min(displayWidth,displayHeight) - particleRad - 1;
		boundaryRadSquare = boundaryRad*boundaryRad;
		
		initVelMax = 0.6;
				
		particleList = {};
		createParticles();
		
		makeSpriteSheet();
		
		context.drawImage(background,0,15,385,440);
		
		timer = setInterval(onTimer, 1000/80);
	}
	
	function createParticles() {
		var angle;
		var dist;
		var vAngle;
		var vMag;
		for (var i = 0; i < numParticles; i++) {
			angle = Math.random()*2*Math.PI;
			dist = 0.8*boundaryRad*Math.sqrt(Math.random());
			vAngle = Math.random()*2*Math.PI;
			vMag = initVelMax*(0.6 + 0.4*Math.random());
			var newParticle = {	x: dist*Math.cos(angle),
					 			y: dist*Math.sin(angle),
					 			velX: vMag*Math.cos(vAngle),
								velY: vMag*Math.sin(vAngle)}
			if (i > 0) {
				newParticle.next = particleList.first;
			}
			particleList.first = newParticle;				
		}
	}
	
	function makeSpriteSheet() {
		spriteCircleOuterRad = boundaryRad+particleRad;
		spriteCircleOuterDiam = 2*spriteCircleOuterRad;

		spriteSheetCanvas = document.createElement('canvas');
		spriteSheetCanvas.width = particleRad*2 + spriteCircleOuterDiam;
		spriteSheetCanvas.height = spriteCircleOuterDiam;
		spriteSheetContext = spriteSheetCanvas.getContext("2d");
		
		//draw particle - core
		spriteSheetContext.fillStyle = particleColor;
		spriteSheetContext.beginPath();
		spriteSheetContext.arc(particleRad, particleRad, coreRad, 0, 2*Math.PI, false);
		spriteSheetContext.closePath();
		spriteSheetContext.fill();
	
	}

	
	function onTimer() {
		context.globalCompositeOperation = "source-over";
		
		// context.fillStyle = "#000000";
		// context.fillRect(0,0,displayWidth,displayHeight);
		context.drawImage(background,0,15,385,440);
		
		//update and draw particles
		context.globalCompositeOperation = "lighter";
		p = particleList.first;
		while (p != null) {
			//update
			lastX = p.x;
			lastY = p.y;
			
			p.x += p.velX;
			p.y += p.velY;
			
			//boundary
			radSquare= p.x*p.x + p.y*p.y;
			if (radSquare > boundaryRadSquare) {
				
				//find intersection point with circle. simple method: midpoint
				exitX = (lastX + p.x)/2;
				exitY = (lastY + p.y)/2;
				
				//scale to proper radius
				exitRad = Math.sqrt(exitX*exitX + exitY*exitY);
				exitX *= boundaryRad/exitRad;
				exitY *= boundaryRad/exitRad;
				
				p.x = exitX;
				p.y = exitY;

				//bounce
				twiceProjFactor = 2*(exitX*p.velX + exitY*p.velY)/boundaryRadSquare;
				vx = p.velX - twiceProjFactor*exitX;
				vy = p.velY - twiceProjFactor*exitY;
				p.velX = vx;
				p.velY = vy;
			}
			
			//draw by copying from sprite sheet			
			context.drawImage(spriteSheetCanvas,
								0,0,particleDiam,particleDiam,
								Math.round(centerX + p.x - particleRad),
								Math.round(centerY + p.y - particleRad),
								particleDiam,particleDiam);

			//advance
			p = p.next;
		}
			
		//boundary circle from sprite sheet
		context.globalCompositeOperation = "source-over";
		context.drawImage(spriteSheetCanvas,
							2*particleRad,0,spriteCircleOuterDiam,spriteCircleOuterDiam,
							centerX-spriteCircleOuterRad,centerY-spriteCircleOuterRad,spriteCircleOuterDiam,spriteCircleOuterDiam);
	}
}
