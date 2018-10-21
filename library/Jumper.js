class Jumper{
	
	constructor(bodyImg,rightArmImg,rightLegImg,leftArmImg,leftLegImg,x,y,dimension,minHeight,maxHeight,gravityUnit){
		//Not depending on the ratio
		this.bodyImg = bodyImg;
		this.rightArmImg = rightArmImg;
		this.leftArmImg = leftArmImg;
		this.rightLegImg = rightLegImg;
		this.leftLegImg = leftLegImg;
		this.angle = 0;
		
		//this.isDead = false;
		
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
		
		//restarting level
		this.startingX = x;
		this.startingY = y;
	}
	
	jump(){
		this.angle = this.MAX_ANGLE*(Math.PI/180);
		
		this.velocity = -this.MAX_VELOCITY;
	}
	
	update(){ //   1 : [this.MAX_ANGLE*(Math.PI/180)] = unitAngle : this.MAX_VELOCITY
		let unitAngle = this.MAX_VELOCITY/(this.MAX_ANGLE*(Math.PI/180));
		
		if(Math.abs(this.velocity) <= this.MAX_VELOCITY) this.velocity += this.gravityUnit;
		if(!this.isDead) this.y += this.velocity;
		if(this.y>this.minHeight) this.y = this.minHeight;
		else if(this.y<this.maxHeight) this.y = this.maxHeight;
		
		if(!this.isDead) this.angle = this.velocity/unitAngle;
		else this.angle += 0.1;
	}
	
	draw(ctx){
		if(this.bodyImg === undefined){
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = "black";
			
			ctx.translate(this.x,this.y);
			ctx.rotate(this.angle);
			
			//ctx.arc(this.x,this.y,this.dimension,0,2*Math.PI);
			
			ctx.moveTo(this.dimension/2, 0);
			ctx.lineTo(- this.dimension/2,- this.dimension/2);
			ctx.lineTo(- this.dimension/2,+ this.dimension/2);
			
			ctx.fill();
			ctx.restore();
		} else {
			ctx.save();
			ctx.beginPath();
			
			let bodyDimension = this.dimension*2;
			let armDimensionX = bodyDimension*0.13*(6/5);
			let armDimensionY = bodyDimension*0.35*(6/5);
			let legDimensionX = bodyDimension*0.16*(6/5);
			let legDimensionY = bodyDimension*0.3*(6/5);
			
			ctx.translate(this.x,this.y);
			//BODY
			ctx.drawImage(this.bodyImg,-bodyDimension/2,-bodyDimension/2,bodyDimension,bodyDimension);
			//ARM DX
			ctx.translate(-armDimensionX*(5/4),-armDimensionY/5);
			ctx.rotate(this.angle);
			ctx.translate(0,armDimensionY/4);
			ctx.drawImage(this.rightArmImg,-armDimensionX/2,-armDimensionY/2,armDimensionX,armDimensionY);
			//ARM SX
			ctx.translate(0,-armDimensionY/4);
			ctx.rotate(-this.angle);
			ctx.translate(+2*armDimensionX*(5/4),0);
			ctx.rotate(-this.angle);
			ctx.translate(0,armDimensionY/4);
			ctx.drawImage(this.leftArmImg,-armDimensionX/2,-armDimensionY/2,armDimensionX,armDimensionY);
			//LEG DX
			ctx.translate(0,-armDimensionY/4);
			ctx.rotate(this.angle);
			ctx.translate(-2*armDimensionX*(5/4)+legDimensionX/4,bodyDimension*(13/24));
			ctx.rotate(this.angle);
			ctx.translate(0,legDimensionY/4);
			
			ctx.drawImage(this.rightLegImg,-legDimensionX/2,-legDimensionY/2,legDimensionX,legDimensionY);
			//LEG SX
			ctx.translate(0,-legDimensionY/4);
			ctx.rotate(-this.angle);
			ctx.translate(2*armDimensionX*(5/4)-2*legDimensionX/4,0);
			ctx.rotate(-this.angle);
			ctx.translate(0,legDimensionY/4);
			ctx.drawImage(this.leftLegImg,-legDimensionX/2,-legDimensionY/2,legDimensionX,legDimensionY);
			/*
			ctx.translate(this.x,this.y);
			
			ctx.rotate(this.angle);
			ctx.drawImage(this.bodyImg,-this.dimension/2,-this.dimension/2,this.dimension,this.dimension);
			ctx.rotate(-this.angle);
			*/
			ctx.restore();
		}
		
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
	
	reset(){
		this.x = this.startingX;
		this.y = this.startingY;
		this.angle = 0;
		this.velocity = 0;
	}
	
	
}