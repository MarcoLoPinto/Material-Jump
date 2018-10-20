class Background{
	constructor(startX,endX,velocity){
		this.startX = startX;
		this.endX = endX;
		this.velocity = velocity;
		this.x = startX;
	}
	
	
	draw(ctx,img,width,height){//"OVERRIDE" BACKGROUND
		ctx.save();
		ctx.beginPath();
		
		this.x += this.velocity;
		if(Math.abs(this.x) >= Math.abs(this.endX-this.startX)) this.x = this.startX;
		
		ctx.drawImage(img,this.x-width,0,width,height);
		ctx.drawImage(img,this.x,0,width,height);
		ctx.drawImage(img,this.x+width,0,width,height)
		ctx.restore();
	}
	
	onResize(velocity){
		this.startX = this.startX*(velocity/this.velocity);
		this.endX = this.endX*(velocity/this.velocity);;
		this.x = this.x*(velocity/this.velocity);;
		this.velocity = velocity;
	}
	
	
}