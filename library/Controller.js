class Controller{
	constructor(scope){
		this.scope = scope;
		this.pressed = false;
	}
	
	keydown(callback){
		$( this.scope ).on('keydown',callback);
		$( this.scope ).on('dragstart',callback);
	}
	
	keyup(callback){
		$( this.scope ).on('keyup',callback);
		$( this.scope ).on('dragend',callback);
	}
	
	//NB: [key => callback(key,this.pressed)] to pass multiple args callback
}