$(function(){
	$("#start").mouseover(function() {
		variable.findIdDisplay.removeClass("show"), variable.findIdDisplay.addClass("notshow");
		initializeVariable();//$("#end").removeClass("end");//$(this).addClass("start");
		variable.findIdDisplay.text("");
		$('#top, #right, #left, #bottom, #middle').mouseover(function(){showred(this)});  //墙壁变红
		$('#top, #right, #left, #bottom, #middle').mouseout(function(){showgray(this)});
		$("#position").mouseleave(function(){variable.ischeat = true;});
		$("#end").mouseover(function(){isend(this);});
	})
})
variable = {
	Textdisplay: true,   // 信息提示展示与否判断
	iswin: true,
	isCheatSecond: true,  // 协助判断作弊与否
	ischeat: false,
	isMouseOverEnd: false,
	findIdDisplay: $("#display"),
}
var initializeVariable=function() {
	variable.Textdisplay = true;
	variable.iswin = true;
	variable.isCheatSecond = true;
	variable.ischeat = false;
	variable.isMouseOverEnd = false;
}
var ControlToShowTopText=function () {
	variable.findIdDisplay.removeClass("notshow"); 
	variable.findIdDisplay.addClass("show");
}
var isend = function(that) { //$("start").removeClass("start");//$(that).addClass("end");
	variable.Textdisplay = false, variable.isMouseOverEnd = true;
	if (variable.isCheatSecond && variable.iswin && !variable.ischeat) {// ControlToShowTopText();
		variable.findIdDisplay.text("You win");
		variable.isCheatSecond = false;
	} else if (variable.isCheatSecond && variable.iswin && variable.ischeat) {
		variable.ischeat = false, variable.isCheatSecond = false;
		variable.findIdDisplay.text("Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!");
	}
	ControlToShowTopText();
}
var showred = function(event) {
	if (variable.Textdisplay) {
		$(event).removeClass("gray");
		$(event).addClass("red");
		variable.findIdDisplay.addClass("show");
		variable.findIdDisplay.text("You lose");
		variable.iswin = false;
	} //$("#start").removeClass("start");
}
var showgray= function(that) {
	variable.Textdisplay = false;
	$(that).removeClass("red");
	$(that).addClass("gray");
	variable.iswin = false;
}
