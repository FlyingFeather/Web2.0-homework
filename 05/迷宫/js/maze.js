window.onload = function() {
	var count = 0;
	var ischeat = false;
	document.getElementById("start").onmouseover=function() {
		document.getElementById("display").className = "notshow";  // 展示字体过渡
		document.getElementById("end").className -= "end";
		this.className = "start";
		var display = true;   // 信息提示展示与否判断
		var iswin = true;
		var a = true;  // 协助判断作弊与否
		ischeat = false;
		var end = false; // 判断鼠标是否经过“E”.
		document.getElementById("display").textContent="";
		// 墙壁的变化------------------------------------------------
		document.getElementById('top').onmouseover=showred;
		document.getElementById('top').onmouseout=showgray;
		document.getElementById('right').onmouseover=showred;
		document.getElementById('right').onmouseout=showgray;
		document.getElementById('left').onmouseover=showred;
		document.getElementById('left').onmouseout=showgray;
		document.getElementById('bottom').onmouseover=showred;
		document.getElementById('bottom').onmouseout=showgray;
		document.getElementById('middle').onmouseover=showred;
		document.getElementById('middle').onmouseout=showgray;
		function showred(event) {
			if (display) {
				event.target.className="red";
				document.getElementById("display").className = "show";
				document.getElementById("display").textContent="You lose";
				iswin = false;
			}
			document.getElementById("start").className -= "start";
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
			document.getElementById("start").className -= "start";
			this.className = "end";
			display = false;
			end = true;
			if (a && iswin && !ischeat) {
				document.getElementById("display").className = "show";
				document.getElementById("display").textContent="You win";
				a = false;
			}
			else if (a && iswin && ischeat) {
				ischeat = false;
				a = false;
				document.getElementById("display").className = "show";
				document.getElementById("display").textContent="Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!"
			}
		}
	}
}

