class OffScreenLoader{
	
	static createOffscreenCanvas(width,height,callback) {
		var offScreenCanvas = document.createElement('canvas');
		offScreenCanvas.width = width;
		offScreenCanvas.height = height;
		
		callback(offScreenCanvas); //return canvas element
	}
	
	static copyToOnScreen(offScreenCanvas,onScreenCanvas) {
		var onScreenContext = onScreenCanvas.getContext('2d');
		onScreenContext.drawImage(offScreenCanvas, 0, 0);
	}
	
	
}