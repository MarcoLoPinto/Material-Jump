class Controller{
	constructor(scope){
		this.scope = scope;
		this.pressed = false;
	}
	
	keydown(callback){
		$( this.scope ).on('keydown touchstart',callback);
	}
	
	keyup(callback){
		$( this.scope ).on('keyup touchend',callback);
	}
	
	//NB: [key => callback(key,this.pressed)] to pass multiple args callback
}