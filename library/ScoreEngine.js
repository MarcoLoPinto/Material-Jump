class ScoreEngine{
	constructor(){
		
		this.roundScore = 0;
		if(localStorage.getItem("score") == undefined){
			localStorage.setItem("score", 0);
		}
	}
	
	setScore(s){
		localStorage.setItem("score", s);
	}
	
	getBestScore(){
		return localStorage.score;
	}
	
	resetRoundScore(){
		this.roundScore = 0;
	}
	
	incrementRoundScore(val){
		this.roundScore += val;
	}
	
	checkAndSetForNewRecord(){
		if(parseInt(localStorage.score) < this.roundScore){
			localStorage.setItem("score", this.roundScore);
		}
	}
	
}