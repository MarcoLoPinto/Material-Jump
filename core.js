//console.log("Loaded");
//SETUP

var ctxId = document.getElementById("ctx");

var game = new FitViewport(ctxId,ctxId.getContext("2d"),(9/16),16,"white","gray",window.innerWidth,window.innerHeight);
var jumper = new Jumper(undefined,game.getCanvas().width/2,game.getCanvas().height/2,game.getDimension(),game.getCanvas().height,0,game.getDimension()/30);
var controller = new Controller(window);

//GAME

function drawCoreFunction(){
	game.clearCanvasArea(0,0,game.getCanvas().width,game.getCanvas().height);
	
	jumper.update();
	jumper.draw(game.getContext());
	
	window.requestAnimationFrame(drawCoreFunction);
}

window.requestAnimationFrame(drawCoreFunction);

$( window ).resize(() => {
  game.resizeCanvas(window.innerWidth,window.innerHeight);
  jumper.onResize(game.getDimension());
});


controller.keydown(function(key,press){
	if( (key.which == 32 || key.touches[0]) && !console.pressed){
		console.pressed = true;
		jumper.jump();
	}
});

controller.keyup(function(key,press){
	console.pressed = false;
});
