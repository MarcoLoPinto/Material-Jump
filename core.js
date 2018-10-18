//console.log("Loaded");
//SETUP

var ctxId = document.getElementById("ctx");

var game = new FitViewport(ctxId,ctxId.getContext("2d"),(9/16),16,"white","gray",window.innerWidth,window.innerHeight);
var jumper = new Jumper(undefined,game.getCanvas().width/2,game.getCanvas().height/2,game.getDimension(),game.getCanvas().height,0,game.getDimension()/30);
var controller = new Controller(document);
var pole = new Pole(game.getDimension()*2,game.getCanvas().height,game.getDimension()*10,game.getDimension()*10,game.getDimension()/10,120,game.getCanvas().width,-game.getDimension());

//GAME

function drawCoreFunction(){
	game.clearCanvasArea(0,0,game.getCanvas().width,game.getCanvas().height);
	
	pole.update();
	pole.draw(game.getContext());
	jumper.update();
	jumper.draw(game.getContext());
	
	checkCollisions();
	
	window.requestAnimationFrame(drawCoreFunction);
}

function checkCollisions(){
	for(var i = 0; i < pole.poles.length; i++){
		if((jumper.x >= pole.poles[i].position) && (jumper.x <= (pole.poles[i].position+pole.width))){
			//console.log("checking");
			if( !(jumper.y >= pole.poles[i].gap && jumper.y <= (pole.poles[i].gap+pole.poles[i].hole)) ){
				//console.log("collision");
				jumper.isDead = true;
			}
		}
	}
}

window.requestAnimationFrame(drawCoreFunction);

$( window ).resize(() => {
  game.resizeCanvas(window.innerWidth,window.innerHeight);
  jumper.onResize(game.getDimension());
  pole.onResize(game.getDimension());
});


controller.keydown(function(e){
	var key = e.which || e.keyCode;
	if( (key == 32 || e.type=='touchstart') && !console.pressed){
		console.pressed = true;
		jumper.jump();
	}
});

controller.keyup(function(e){
	console.pressed = false;
});
