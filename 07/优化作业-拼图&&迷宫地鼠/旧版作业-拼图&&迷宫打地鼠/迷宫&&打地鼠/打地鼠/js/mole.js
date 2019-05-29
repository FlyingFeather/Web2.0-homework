window.onload=function() {
	// ------------------生成地鼠--------------------------
	var themoles = document.getElementById("mole-container");
	var a = document.createDocumentFragment();
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 10; j++) {
			var mole = document.createElement("button");
			a.appendChild(mole);
		};
		var newLine = document.createElement("br");
		a.appendChild(newLine);
	};
	themoles.appendChild(a);

	var c = 30; // 计算时间
	var number = 0; // 分数
	var loop, startTime;      // 控制时间
	var ran = parseInt(Math.random()*60, 10)+1;  // 随机数
	var buttons;  // 当前出现的地鼠
	var stops = false, starts = false, isplaying = false;
	count();
	show();

	function count() {
		document.getElementById("start").onclick = function() {
			if (!starts) { // 在开始之前
				c = 30;
				number = 0;
				starts = true;
				startTime = setTimeout(start, 1000, 29);
			} else if (starts && !stops && isplaying) {  // 在玩着的时候
				stops = true;
				stopCount();
				document.getElementById("button").value = "stop";
				document.getElementById("score").value = number;
			}
			else if (starts && stops && isplaying) {  // 停止之后
				stops = false;
				start(c);
			}
		}
	}
	// ----------------------开始，一段时间执行end()--------------------------
	function start(event) {
		isplaying = true;
		document.getElementById("score").value = number;
		document.getElementById("button").value = "Playing";
		document.getElementById("block").value=c;
		// ran = parseInt(Math.random()*60, 10)+1;
		buttons = document.getElementsByTagName('button')[ran];
		buttons.className = 'blue';
		loop = setInterval(end, 1000);
	}
	// ---------------------------停止计数--------------------------
	function stopCount() {
		clearTimeout(startTime);
		clearTimeout(loop);
	}
	// -------------------结束后的样式以及控制时间递减-------------
	function end() {
		if (c == -1) {
			clearInterval(loop);
			starts = false;
			buttons.checked = false;
			showwhite(buttons);
			document.getElementById("score").value = number;
			var output = "Game over.\nyour score is ";
			output += number;
			confirm(output);
			return;
		}
		document.getElementById("block").value = c;
		c = c-1;
	}
	// ---------------随机出现地鼠-------------------------------
 	function show() {
		for (var i = 1; i < 61; i++) {
			document.getElementsByTagName("button")[i].onclick=function() {
				if (!(document.getElementById("button").value == "stop") && c > 0) {
				// ----------------点中----------------
					if (this == buttons) {
						number = number + 1;
						document.getElementById("score").value = number;
						showwhite(this);
						ran = parseInt(Math.random()*60, 10)+1;
						buttons = document.getElementsByTagName('button')[ran];
						buttons.className = 'blue';
					} else { // 未点中
						if (number > 0) 
							number = number-1;
						document.getElementById("score").value = number;
					}
				}
			}
		}
	}
	// --------------换白色背景-------------------
	function showwhite(a) {
		a.className = 'white';
	}
}