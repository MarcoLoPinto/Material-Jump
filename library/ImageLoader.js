function loadImages(imgArray, callback){
	var positionName;
	var loadCount = 0;
	var preloaded = false;
	var loadedImages = [];
	let total = imgArray.length;
	
	for(let i = 0; i < total ; i++){
		var img = new Image();
		
		img.onload = ()=>{
			loadCount++;
			if(loadCount==total){
				preloaded = true;
				callback(loadedImages);
			}
		}
		
		img.src = imgArray[i];
		img.onerror = ()=>{
			alert('Some images could not be loaded.'); 
		}
		positionName = imgArray[i].substring(imgArray[i].lastIndexOf("/") + 1,imgArray[i].lastIndexOf("."));
		loadedImages[positionName] = img;
	}
	this.images = loadedImages;
}