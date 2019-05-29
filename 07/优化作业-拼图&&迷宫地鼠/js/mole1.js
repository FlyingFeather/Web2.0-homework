variable = {
	Time: 30, loop: 0, scores: 0,
	stops: false, starts: false, isplaying: false,
}
$(function() {
	var themoles = $("#mole-container");
	var createButton = document.createDocumentFragment();
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 10; j++) {
			var mole = document.createElement("button");
			createButton.appendChild(mole);
		};
		var newLine = document.createElement("br");
		createButton.appendChild(newLine);
	};
	themoles.append(createButton);
	inialSomeValue();
	ClickEvent();
	RandomShowMoles();
})
function inialSomeValue() {
	variable.Time = 30; // 计算时间
	variable.scores = 0;
	variable.stops = variable.starts = variable.isplaying = false;
}
function ClickEvent() {
	$("#start").click(function() {
		if (!variable.starts) setSomeValue();  // 在开始之前
		else if (variable.starts && !variable.stops && variable.isplaying) {  // 在玩着的时候
			variable.stops = true;
			stopCount();
			$("#button").val("Game over");
			$("#score").val(variable.scores);
			buttons.className = 'white';
			confirm("Game over.\nyour score is " + variable.scores);
		} else if (variable.starts && variable.stops && variable.isplaying) {  // 停止之后
			variable.stops = false;
			setSomeValue();
		}})
}
function setSomeValue() {
	variable.Time = 30;
	variable.scores = 0;
	variable.starts = true;
	variable.startTime = setTimeout(start, 1000, 29);
}
	// ----------------------开始，一段时间执行end()--------------------------
function start(event) {
	variable.isplaying = true;
	$("#score").val(variable.scores);
	$("#button").val("Playing");
	$("#block").val(variable.Time);
	var ran = parseInt(Math.random()*60, 10)+1;
	buttons = $("button")[ran];
	buttons.className = 'blue';
	variable.loop = setInterval(end, 1000);
}
	// ---------------------------停止计数--------------------------
function stopCount() {
	clearTimeout(variable.startTime);
	clearTimeout(variable.loop);
}
// -------------------结束后的样式以及控制时间递减-------------
function end() {
	if (variable.Time == -1) {
		clearInterval(variable.loop);
		starts = false;
		buttons.className = 'white';
		$("#score").val(variable.scores);
		confirm("Game over.\nyour score is "+variable.scores);
		variable.stops = true;
		return;
	}
	$("#block").val(variable.Time);
	variable.Time = variable.Time-1;
}
// ---------------随机出现地鼠-------------------------------
function RandomShowMoles() {
	for (var i = 1; i < 61; i++) {
		document.getElementsByTagName("button")[i].onclick=function() {
			if (!($("#button").val() == "Game over") && variable.Time > 0) {
			// ----------------点中----------------
				if (this == buttons) {
					variable.scores = variable.scores + 1;
					$("#score").val(variable.scores);
					this.className = 'white'
					var ran = parseInt(Math.random()*60, 10)+1;
					buttons = $('button')[ran];
					buttons.className = 'blue';
				} else { // 未点中
					if (variable.scores > 0) variable.scores = variable.scores-1;
					$("#score").val(variable.scores);
				}
			}
		}
	}
}