const imageArray = ["imgs/player.png","imgs/jumper.png","imgs/rightArm.png","imgs/rightLeg.png","imgs/leftArm.png","imgs/leftLeg.png","imgs/background.png","imgs/pole.png","imgs/nullarea.png"];

var ctxId = document.getElementById("ctx");
var screenWidth = () => window.innerWidth ? window.innerWidth : $(window).width();
var screenHeight = () => window.innerHeight ? window.innerHeight : $(window).height();

var game;
//LOADING
loadImages(imageArray,images=>{
	//SETUP
	console.log(images);
	game = new Game(ctxId,(9/16),"white","gray",screenWidth(),screenHeight(),images);
	var controller = new Controller(document);
	
	MenuSetup.createP("scoreText","scoreScreen","scoreText","Score:");
	MenuSetup.createP("scoreTextValue","scoreScreen","scoreText","0");
	
	MenuSetup.createPopupMenu("popupDeath","menuScreen","popup flex-centered inline-column",screenWidth()/2,screenHeight()/2,game.view.getCanvas().width*(3/4)/game.view.getBrowserZoomLevel(),game.view.getCanvas().width*(3/4)/game.view.getBrowserZoomLevel());
	MenuSetup.createP("deathText","popupDeath","popupText","You Died!");
	MenuSetup.createP("bestScore","popupDeath","popupText","Best Score:0");
	MenuSetup.createButton("retry","popupDeath","button","Retry",()=>{
		game.reset();
	});
	
	//GAME
	window.requestAnimationFrame(drawCoreFunction);
	function drawCoreFunction(){
		
		game.clear();
		
		game.backgroundAnimation();
		game.foregroundAnimation();
		game.jumper.update();
		
		if(!game.isGameOver){
			game.pole.update();
			game.checkPolePositionsScore();
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
	$( window ).resize(() => {
		game.onResize(screenWidth,screenHeight);
		MenuSetup.resizePopup("popupDeath",screenWidth()/2,screenHeight()/2,game.view.getCanvas().width*(3/4)/game.view.getBrowserZoomLevel(),game.view.getCanvas().width*(3/4)/game.view.getBrowserZoomLevel());
	});
	
	
});
