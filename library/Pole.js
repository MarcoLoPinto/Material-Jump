class Pole{
	constructor(img,width,height,minGap,maxGap,velocity,frequency,startX,endX){ //height of all pole, up and down + gap
		//Not depending on the ratio
		this.img = img;
		this.frequency = frequency;
		this.frequencyStart = frequency;
		
		//Depends on the ratio
		this.width = width;
		this.height = height;
		this.minGap = minGap;
		this.maxGap = maxGap;
		this.velocity = velocity;
		this.startX = startX;
		this.endX = endX;
		
		//poles
		this.poles = [];
	}
	
	update(){
		if(this.frequency <= this.frequencyStart){
			let randomDimension = this.maxGap + ( Math.random()*(this.maxGap - this.minGap) ); //gap size
			let randomGap = (Math.random() * (this.height-randomDimension)); //position
			
			//console.log("dimension gap: "+randomGap);
			
			this.frequencyStart = 0;
			this.poles.push({position:this.startX,gap:randomGap,hole:randomDimension});
			
		} else this.frequencyStart++;
		
		for(var i = 0; i<this.poles.length; i++){
			if(this.poles[i].position <= this.endX){
				this.poles.shift(); //because is FIFO
				i--;
			}
			else{
				this.poles[i].position -= this.velocity;
			}
		}
		
	}
	
	draw(ctx){
		
		for(var i = 0; i<this.poles.length; i++){
			ctx.save();
			ctx.beginPath();
			
			ctx.translate(this.poles[i].position,0);
			//Up part
			ctx.drawImage(this.img,0,this.poles[i].gap,this.width,-this.height);
			//Bottom part
			ctx.drawImage(this.img,0,this.poles[i].gap+this.poles[i].hole,this.width,this.height);
			
			ctx.restore();
		}
		/*
		for(var i = 0; i<this.poles.length; i++){
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = "black";
			
			ctx.translate(this.poles[i].position,0);
			//Up part
			//ctx.fillRect(0, 0, this.width, this.poles[i].gap);
			//Bottom part
			//ctx.fillRect(0, this.poles[i].gap+this.poles[i].hole, this.width, this.height);
			
			//console.log("drawing at x: "+this.poles[i].x);
			
			ctx.restore();
		}
		*/
		
	}
	
	onResize(updatedWidth){ //Scaling all factors generating a ratio with the width
		let ratio = (updatedWidth/this.width);
		
		for(var i = 0; i<this.poles.length; i++){
			this.poles[i].position = this.poles[i].position*ratio;
			this.poles[i].gap = this.poles[i].gap*ratio;
			this.poles[i].hole = this.poles[i].hole*ratio;
		}
		
		this.width = this.width*ratio;
		this.height = this.height*ratio;
		this.minGap = this.minGap*ratio;
		this.maxGap = this.maxGap*ratio;
		this.velocity = this.velocity*ratio;
		this.startX = this.startX*ratio;
		this.endX = this.endX*ratio;
		
	}
	
}