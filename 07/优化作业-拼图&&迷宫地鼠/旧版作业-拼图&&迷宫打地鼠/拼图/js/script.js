
window.onload = function() {
	speller.init();
	piece=document.getElementById("puzzle-pane").getElementsByTagName("div");
	document.getElementById("restart").onclick=rndBoxCall;
	document.getElementById("pic1").onclick=change1;
	document.getElementById("pic2").onclick=change2;
	document.getElementById("pic3").onclick=change3;
	document.getElementById("sourcepic").onclick=show;
	document.getElementById("resum").onclick=resum;
	document.getElementById("selectlevel").addEventListener('click', easy);
};

/*简单和困难的转换，通过控制初始移动的步数*/
function easy() {
	speller.number = 100;
	document.getElementById("selectlevel").removeEventListener('click', easy);
	document.getElementById("selectlevel").addEventListener('click', complex);
	document.getElementById("selectlevel").innerText = "困难";
}
function complex() {
	speller.number = 200;
	document.getElementById("selectlevel").removeEventListener('click', complex);
	document.getElementById("selectlevel").addEventListener('click', easy);
	document.getElementById("selectlevel").innerText = "简单";
}

// -----------------------还原----------------
function resum() {
	speller.start = false;
	var piece1classname = piece[1].className.substring(13);
	piece[15].className = "15 notdisplay position15";
	for (var i = 0; i <= 9; i++) {
		piece[i].className = "";
		piece[i].className += i;
		piece[i].className += "  position";
		piece[i].className += i;
		if (piece1classname == "background3") {
			piece[i].className += " background3";
		}
		else if (piece1classname == "background2") {
			piece[i].className += " background2";
		}
		else if (piece1classname == "background1") {
			piece[i].className += " background1";
		}
	}
	for (var i = 10; i < 15; i++) {
		piece[i].className = "";
		piece[i].className += i;
		piece[i].className += " positio";
		piece[i].className += i;
		if (piece1classname == "background3") {
			piece[i].className += " background3";
		}
		else if (piece1classname == "background2") {
			piece[i].className += " background2";
		}
		else if (piece1classname == "background1") {
			piece[i].className += " background1";
		}
	}
	speller.blank = 15;
	show();
}

/*---------------左边原图的显示与否-----------*/
function show() {
	document.getElementById("pic1").className = "display";
	document.getElementById("pic2").className = "display";
	document.getElementById("pic3").className = "display";
}
function notshow() {
	document.getElementById("pic1").className = "notdisplay";
	document.getElementById("pic2").className = "notdisplay";
	document.getElementById("pic3").className = "notdisplay";
}

/*-------------------改拼图图片--------------------*/
function change2() {
	for (var i = 0; i < piece.length-1; i++) {
		piece[i].className = piece[i].className.substring(0, 12);
		piece[i].className += " background1";
	}
	if (!speller.check()) {
		resum();
	}
}
function change3() {
	for (var i = 0; i < piece.length-1; i++) {
		piece[i].className = piece[i].className.substring(0, 12);
		piece[i].className += " background2";
	}
	if (!speller.check()) {
		resum();
	}
}
function change1() {
	for (var i = 0; i < piece.length-1; i++) {
		piece[i].className = piece[i].className.substring(0, 12);
		piece[i].className += " background3";
	}
	if (!speller.check()) {
		resum();
	}
}

/*----------------打乱拼图----------------*/
function rndBoxCall() {
	speller.step = 0;
	document.getElementById("stepnumber").innerText = "Step: ";
	document.getElementById("stepnumber").innerText += 0;
	notshow();
	document.getElementById("restart").innerText = "重新开始";
	speller.start = true;
	blankposition();
	randominit();
	blankposition();
	if (speller.check()) {
		rndBoxCall();
	}
	var piece=document.getElementById("puzzle-pane").getElementsByTagName("div");
	for (var i = 0; i < piece.length; i++) {
		piece[i].onclick = move;
	}
}
function randominit() {
	var count = 0;
	while (count < speller.number && flag) {  
		var d = parseInt(Math.random() * 4);
		var posB = speller.blank * 1;
		//console.log(posB);
		var yB = parseInt(posB / 4);
		var xB = parseInt(posB % 4);
		var cls = 0;
		if (d == 0 && yB != 0) {
			cls = posB - 4;
		}
		else if (d == 1 && xB != 3) {
			cls = posB + 1;
		}
		else if (d == 2 && yB != 3) {
			cls = posB + 4;
		}
		else if (d == 3 && xB != 0) {
			cls = posB - 1;
		}
		if (cls > 0 && cls < 16) {
			speller.swapTwo(speller.getById(speller.blank), speller.getById(cls));
			speller.blank = cls;
			count++;
		}
	}
}

// ---------------记录空白块位置-------------
function blankposition() {
	if (speller.blank == 15) {
		flag = true;
	} else {
		while (speller.blank < 12) {
			speller.swapTwo(speller.getById(speller.blank), speller.getById(speller.blank+4));
			speller.blank = speller.blank+4;
		}
		while (speller.blank != 15) {
			speller.swapTwo(speller.getById(speller.blank), speller.getById(speller.blank+1));
			speller.blank = speller.blank+1;
		}
		if (speller.blank == 15) {
			flag = true;
		}
	}
}

/*------------------点击移动拼图块--------------------*/
function move() {
	if (!speller.start) {
		alert("点击重新开始游戏吧");
		speller.step = 0;
		document.getElementById("stepnumber").innerText = "Step: ";
		document.getElementById("stepnumber").innerText += 0;
	} else {
		var pos = this.id * 1;
		var y = parseInt(pos / 4);
		var x = parseInt(pos % 4);
		var posB = speller.blank * 1;
		var yB = parseInt(posB / 4);
		var xB = parseInt(posB % 4);
		if (Math.abs(x - xB) + Math.abs(y - yB) == 1) {
			speller.swapTwo(this, speller.getById(posB));
			speller.step++;
			document.getElementById("stepnumber").innerText = "Step: ";
			document.getElementById("stepnumber").innerText += speller.step;
			speller.blank = pos;
		}
	}
	if (speller.check() && speller.start) {
		var result = "哇，你真棒！\n你一共走了";
		result += speller.step;
		result += "步";
		alert(result);
	}
}
speller = {/*初始化某些参数*/
	init: function (level) {
			this.boxs = document.getElementById("puzzle-pane").getElementsByTagName("div");
			this.blank = this.boxs.length-1;
			this.start = false;
			this.number = 200;
			this.step = 0;
	},
	/*检查是否完成*/
	check: function () {  
		for (var i = 0; i < this.boxs.length; i++) {
			if (parseInt(this.boxs[i].className) != this.boxs[i].id) return false;
		}
		return true;
	}, 
	/*根据id获取对象*/
	getById: function (cls) {
		for (var i = 0; i < 16; i++) {
			if (this.boxs[i].id == cls) {
				return this.boxs[i];
			}
		}
		return null;
	},
	/*交换两个方格*/
	swapTwo: function (boxA, boxB) {
		var cls = boxA.className;
		boxA.className = boxB.className;
		boxB.className = cls;
	}
};  