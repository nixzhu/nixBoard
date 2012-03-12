function grid(cxt) {
	// the first point is (30, 30)
	for (var i = 0; i < 19; i++) {
		cxt.beginPath();
		cxt.moveTo(0+30,   (i+1)*30);
		cxt.lineTo(600-30, (i+1)*30);
		cxt.stroke();
	}
	for (var i = 0; i < 19; i++) {
		cxt.beginPath();
		cxt.moveTo((i+1)*30,   0+30);
		cxt.lineTo((i+1)*30, 600-30);
		cxt.stroke();
	}

}
function ninePoints(cxt) {
	var np = new Array(
		[120,120],[300,120],[480,120],
		[120,300],[300,300],[480,300],
		[120,480],[300,480],[480,480]
	);
	
	for (var i = 0; i < np.length; i++) {
		//circle
		cxt.beginPath();
		cxt.arc(np[i][0],np[i][1],3,0,2*Math.PI,false);
		//cxt.arc(120,120,4,0,2*Math.PI,false);
		cxt.fillStyle="black";
		cxt.fill();
	}
}


var move_count = 0;
function mousedownHandler(e) {
	var x, y;
	if (e.offsetX || e.offsetX == 0) {
		x = e.offsetX ;//- imageView.offsetLeft;
		y = e.offsetY ;//- imageView.offsetTop;
	}
	if (x < 30-10 || x > 600-30+10)
		return;
	if (y < 30-10 || y > 600-30+10)
		return;
	
	var xok = false;
	var yok = false;
	for (var i = 1; i <= 19; i++) {
		if (x > i*30-15 && x < i*30+15) { //10 better than 15
			x = i*30;
			xok = true;
		}
		if (y > i*30-15 && y < i*30+15) {
			y = i*30;
			yok = true;
		}
	}
	if (!xok || !yok)
		return;


	move_count ++;
	var c = document.getElementById("weiqi");
	var cxt = c.getContext("2d");
	cxt.beginPath();
	cxt.arc(x,y,15,0,2*Math.PI,false);
	if (move_count % 2 == 1)
		cxt.fillStyle="black";
	else
		cxt.fillStyle="white";
	cxt.fill();

}

function mousemoveHandler(e) {
	var x, y;
	if (e.offsetX || e.offsetX == 0) {
		x = e.offsetX ;//- imageView.offsetLeft;
		y = e.offsetY ;//- imageView.offsetTop;
	}
	if (x < 30-10 || x > 600-30+10)
		return;
	if (y < 30-10 || y > 600-30+10)
		return;
	
	var xok = false;
	var yok = false;
	for (var i = 1; i <= 19; i++) {
		if (x > i*30-15 && x < i*30+15) { //10 better than 15
			x = i*30;
			xok = true;
		}
		if (y > i*30-15 && y < i*30+15) {
			y = i*30;
			yok = true;
		}
	}

	var c = document.getElementById("path");
	var cxt = c.getContext("2d");
	//cxt.fillStyle = "silver";
	//cxt.fillRect(0,0,600,600);
	cxt.clearRect(0,0,600,600);
	if (!xok || !yok)
		return;
	cxt.beginPath();
	cxt.arc(x,y,15,0,2*Math.PI,false);
	cxt.fillStyle="gray";
	cxt.fill();

	cxt.beginPath();
	cxt.arc(x,y,10,0,2*Math.PI,false);
	if (move_count % 2 == 0)
		cxt.fillStyle="black";
	else
		cxt.fillStyle="white";
	cxt.fill();

}

function mouseoutHandler(e) {
	var c = document.getElementById("path");
	var cxt = c.getContext("2d");
	cxt.clearRect(0,0,600,600);
}

function initBoard() {
	var c = document.getElementById("weiqi");
	//c.addEventListener('mousedown', mousedownHandler, false);
	//cxt.mousedown = mousedownHandler;
	var c_path = document.getElementById("path");
	c_path.addEventListener('mousedown', mousedownHandler, false);
	c_path.addEventListener('mousemove', mousemoveHandler, false);
	c_path.addEventListener('mouseout', mouseoutHandler, false);
	//cxt.addEventListener('mouseup', canvasMouseHandler, false);
	var cxt = c.getContext("2d");
	cxt.fillStyle = "silver";
	cxt.fillRect(0,0,600,600);

	grid(cxt);
	ninePoints(cxt);
	//pan[3][6] = 1;
}

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}
//window.addEventListener("load", initBoard, true);
addLoadEvent(initBoard);
