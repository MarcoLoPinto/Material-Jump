class MenuSetup{
	
	static createPopupMenu(id,parentId,styleClass,x,y,width,height){
		var popup = document.createElement("div");
		popup.setAttribute("id", id);
		popup.setAttribute("class", styleClass);
		popup.setAttribute("style", "position: absolute; left: "+(x-width/2)+"; top: "+(y-height/2)+"; width: "+width+"; height: "+height+";");
		
		document.getElementById(parentId).appendChild(popup);
	}
	
	static createButton(id,parentId,styleClass,text,callback){
		var btn = document.createElement("BUTTON");

		var t = document.createTextNode(text);
		btn.setAttribute("class", styleClass);
		btn.appendChild(t);
		
		document.getElementById(parentId).appendChild(btn);
		
		//LISTENER
		btn.addEventListener("click",callback);
	}
	
	static createP(id,parentId,styleClass,text){
		var p = document.createElement("p");
		var t = document.createTextNode(text);
		p.appendChild(t);
		p.setAttribute("id", id);
		p.setAttribute("class", styleClass);
		document.getElementById(parentId).appendChild(p);
	}
	
	static setValue(id,v){
		document.getElementById(id).innerHTML = v;
	}
	
	static resizePopup(id,x,y,width,height){
		var obj = document.getElementById(id);

		
		obj.style.left = (x-width/2);
		obj.style.top = (y-height/2);
		obj.style.width = width;
		obj.style.height = height;
		
		
		//obj.setAttribute("style", "position: absolute; left: "+(x-width/2)+"; top: "+(y-height/2)+"; width: "+width+"; height: "+height+";");
		
		/*
		var ratio = (width/parseFloat(obj.style.width));
		obj.style.left = (parseFloat(obj.style.left)*ratio) + "px";
		obj.style.top = (parseFloat(obj.style.top)*ratio) + "px";
		obj.style.width = (parseFloat(obj.style.width)*ratio) + "px";
		obj.style.height = (parseFloat(obj.style.height)*ratio) + "px";
		*/
	}
	
}