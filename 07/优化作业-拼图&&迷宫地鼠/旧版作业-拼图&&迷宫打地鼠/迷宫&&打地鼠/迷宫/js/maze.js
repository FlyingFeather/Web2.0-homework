window.onload = function() {
	var count = 0;
	var ischeat = false;
	IdStart = document.getElementById("start");
	IdDisplay = document.getElementById("display");
	IdStart.onmouseover=function() {
		IdDisplay.className = "notshow";  // 展示字体过渡
		document.getElementById("end").className -= "end";
		this.className = "start";
		var display = true;   // 信息提示展示与否判断
		var iswin = true;
		var a = true;  // 协助判断作弊与否
		ischeat = false;
		var end = false; // 判断鼠标是否经过“E”.
		IdDisplay.textContent="";
		// 墙壁的变化------------------------------------------------
		IdTop = document.getElementById('top');
		IdRight = document.getElementById('right');
		Idleft = document.getElementById('left');
		IdBottom = document.getElementById('bottom');
		IdMiddle = document.getElementById('middle');
		IdTop.onmouseover=showred;
		IdTop.onmouseout=showgray;
		IdRight.onmouseover=showred;
		IdRight.onmouseout=showgray;
		Idleft.onmouseover=showred;
		Idleft.onmouseout=showgray;
		IdBottom.onmouseover=showred;
		IdBottom.onmouseout=showgray;
		IdMiddle.onmouseover=showred;
		IdMiddle.onmouseout=showgray;
		function showred(event) {
			if (display) {
				event.target.className="red";
				IdDisplay.className = "show";
				IdDisplay.textContent="You lose";
				iswin = false;
			}
			IdStart.className -= "start";
		}
		function showgray(event) {
			display = false;
			event.target.className="gray";
			iswin = false;
		}
		// ------------------------------------------------------------
		document.getElementById("position").onmouseleave=cheat;
		function cheat() {
			ischeat = true;
		}
		document.getElementById("end").onmouseover=function() {
			IdStart.className -= "start";
			this.className = "end";
			display = false;
			end = true;
			if (a && iswin && !ischeat) {
				IdDisplay.className = "show";
				IdDisplay.textContent="You win";
				a = false;
			}
			else if (a && iswin && ischeat) {
				ischeat = false;
				a = false;
				IdDisplay.className = "show";
				IdDisplay.textContent="Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!"
			}
		}
	}
}