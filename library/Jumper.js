class Jumper{
	
	constructor(img,x,y,dimension,minHeight,maxHeight,gravityUnit){
		//Not depending on the ratio
		this.img = img;
		this.angle = 0;
		
		//Depends on the ratio
		this.minHeight = minHeight;
		this.maxHeight = maxHeight;
		this.x = x;
		this.y = y;
		this.velocity = 0;
		this.gravityUnit = gravityUnit;
		this.MAX_VELOCITY = gravityUnit*20;
		this.MAX_ANGLE = 45;
		this.dimension = dimension;
	}
	
	jump(){
		this.angle = this.MAX_ANGLE*(Math.PI/180);
		
		this.velocity = -this.MAX_VELOCITY;
	}
	
	update(){ //   1 : [this.MAX_ANGLE*(Math.PI/180)] = unitAngle : this.MAX_VELOCITY
		let unitAngle = this.MAX_VELOCITY/(this.MAX_ANGLE*(Math.PI/180));
		
		if(Math.abs(this.velocity) <= this.MAX_VELOCITY) this.velocity += this.gravityUnit;
		this.y += this.velocity;
		if(this.y>this.minHeight) this.y = this.minHeight;
		else if(this.y<this.maxHeight) this.y = this.maxHeight;
		
		this.angle = this.velocity/unitAngle;
	}
	
	draw(ctx){
		if(this.img === undefined){
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = "black";
			
			ctx.translate(this.x,this.y);
			ctx.rotate(this.angle);
			
			//ctx.arc(this.x,this.y,this.dimension,0,2*Math.PI);
			
			ctx.moveTo(this.dimension, 0);
			ctx.lineTo(- this.dimension,- this.dimension);
			ctx.lineTo(- this.dimension,+ this.dimension);
			
			ctx.fill();
			ctx.restore();
		}
		if(this.velocity == 0) console.log(window.innerWidth/this.y);
		
	}
	
	onResize(dimension){
		let ratio = (dimension/this.dimension);
		
		this.x = this.x*ratio;
		this.y = this.y*ratio;
		this.velocity = this.velocity*ratio;
		this.gravityUnit = this.gravityUnit*ratio;
		this.minHeight = this.minHeight*ratio;
		this.maxHeight = this.maxHeight*ratio;
		this.MAX_VELOCITY = this.gravityUnit*20;
		
		this.dimension = dimension;
	}
	
}