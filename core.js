const imageArray = ["imgs/player.png","imgs/jumper.png","imgs/rightArm.png","imgs/rightLeg.png","imgs/leftArm.png","imgs/leftLeg.png","imgs/background.png","imgs/pole.png","imgs/nullarea.png"];

var ctxId = document.getElementById("ctx");

//LOADING
loadImages(imageArray,images=>{
	//SETUP
	console.log(images);
	var game = new Game(ctxId,(9/16),"white","gray",window.innerWidth,window.innerHeight,images);
	var controller = new Controller(document);
	
	//GAME
	window.requestAnimationFrame(drawCoreFunction);
	function drawCoreFunction(){
		
		game.clear();
		
		game.backgroundAnimation();
		game.foregroundAnimation();
		game.jumper.update();
		
		if(!game.isGameOver){
			game.pole.update();
			game.checkCollisions();
		}
		
		if(document.getElementById("gameScreen").style.display != "none"){
			window.requestAnimationFrame(drawCoreFunction);
		}
	}
	
	
	//CONTROLLERS
	controller.keydown(function(e){
		var key = e.which || e.keyCode;
		if( (key == 32 || e.type=='touchstart') && !controller.pressed && !game.isGameOver){
			controller.pressed = true;
			game.jumper.jump();
		}
	});

	controller.keyup(function(e){
		controller.pressed = false;
	});
	
	
	//RESIZING
	game.onResize();
	
	
	//LISTENERS
	document.getElementById("restart").addEventListener("click",()=>{
		game.reset();
	});
	
});
