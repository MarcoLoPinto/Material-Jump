class Game{
	constructor(ctxId,ratio,foregroundColor,backgroundColor,initWidth,initHeight,images){
		this.ctx = ctxId.getContext("2d");
		this.images = images;
		
		this.view = new FitViewport(ctxId,this.ctx,ratio,16,"white","gray",window.innerWidth,window.innerHeight);
		this.jumper = new Jumper(images["jumper"],images["rightArm"],images["rightLeg"],images["leftArm"],images["leftLeg"],this.view.getCanvas().width/2,this.view.getCanvas().height/2,this.view.getDimension()*(3/2),this.view.getCanvas().height,0,this.view.getDimension()/30);
		this.pole = new Pole(images["pole"],this.view.getDimension()*2,this.view.getCanvas().height,this.view.getDimension()*10,this.view.getDimension()*10,this.view.getDimension()/10,120,this.view.getCanvas().width,-2*this.view.getDimension());
		this.backgroundClass = new Background(this.view.getCanvas().width,0,-this.view.getDimension()/50);
		
		document.body.style = "background-image: url("+images["nullarea"].src+")";
		
		this.isGameOver = false;
	}
	
	clear(){
		this.view.clearCanvasArea(0,0,this.view.getCanvas().width,this.view.getCanvas().height);
	}
	
	backgroundAnimation(){
		this.backgroundClass.draw(this.view.getContext(),this.images["background"],this.view.getCanvas().width,this.view.getCanvas().height);
	}
	
	foregroundAnimation(){
		this.pole.draw(this.view.getContext());
		this.jumper.draw(this.view.getContext());
	}
	
	update(){
		this.pole.update();
		this.jumper.update();
	}
	
	onResize(){
		$( window ).resize(() => {
		  this.view.resizeCanvas(window.innerWidth,window.innerHeight);
		  this.jumper.onResize(this.view.getDimension()*(3/2));
		  this.pole.onResize(this.view.getDimension()*2);
		  this.backgroundClass.onResize(-this.view.getDimension()/50);
		});
	}
	
	reset(){
		this.isGameOver = false;
		this.selectScreen(["menuScreen"],["gameScreen"]);
		this.jumper.reset();
		this.pole.reset();
	}
	
	gameOver(){
		this.jumper.velocity = -this.jumper.MAX_VELOCITY;
		this.isGameOver = true;
		this.selectScreen([],["menuScreen"]);
	}
	
	checkCollisions(){
		for(var i = 0; i < this.pole.poles.length; i++){
			if(( (this.jumper.x+this.jumper.dimension/2) >= this.pole.poles[i].position) && ((this.jumper.x-this.jumper.dimension/2) <= (this.pole.poles[i].position+this.pole.width))){
				//console.log("checking");
				if( !((this.jumper.y-this.jumper.dimension*(3/4)) >= this.pole.poles[i].gap && (this.jumper.y+this.jumper.dimension) <= (this.pole.poles[i].gap+this.pole.poles[i].hole)) ){
					//console.log("collision");
					this.gameOver();
					return true;
				}
			}
		}
		if(this.jumper.y >= this.jumper.minHeight){
			this.gameOver();
			return true;
		}
		return false;
	}
	
	selectScreen(toHide,toShow){
		toHide.forEach(i=>{
			document.getElementById(i).style.display ="none";
		});
		toShow.forEach(j=>{
			document.getElementById(j).style.display ="block";
		});
	}
	
	
}