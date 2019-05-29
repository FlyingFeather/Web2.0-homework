var global = {ifClick: new Array("0", "0", "0", "0", "0"), isSend: 0};
var xhr;
function Query(that) {
	if ($(that).hasClass("mask")) return "0";
	if ($(that).hasClass("history")) return "1";
	if ($(that).hasClass("message")) return "2";
	if ($(that).hasClass("setting")) return "3";
	if ($(that).hasClass("sign")) return "4";
}
function add() {
	for (var key in global.ifClick) {
		if (global.ifClick[key] == 0) return;
	}
	var result = 0;
	for (var i = 1; i <= 5; i++) {
		result += parseInt($('#control-ring li:nth-child('+i+')').find('span').html());
	}
	$('#info-bar li').html(result);
	$("#info-bar").removeClass("enabled");
	$(".button").removeClass("disabled");
	$(".button").removeClass("disabled1");
	for (var key in global.ifClick) global.ifClick[key] = 0; // 重置，设为可点击
}
// 重置样式
function reset() {
	for (var key in global.ifClick) global.ifClick[key] = 0;
	global.isSend = 0;
	$(".button").removeClass("disabled");
	$(".button").removeClass("disabled1");
	$("#info-bar").removeClass("enabled");
	$("#info-bar li").html("");
	$(".unread").removeClass('show');
	if (xhr && xhr.readyState != 4) {  // 终止请求
		xhr.abort();
	}
}

function excuteToGetNumber() {
	var target = event.target;
	var position = Query(event.target);
	var getFiveNumber = 1;
	if (global.ifClick[position] == 1 || global.isSend == 1) return;
	global.isSend = 1;
	$(target).find('span').addClass('show');
	$(target).find('span').html("...");
	$('#control-ring').find('li').addClass('disabled'); // 其余灭活
	$(target).removeClass('disabled');
	xhr = $.get("/", function(data, status) {
		$(target).find('span').html(data);
		global.ifClick[position] = 1;
		$(target).addClass('disabled1');   // 灭活当前按钮
		for (var key in global.ifClick) {
			if (global.ifClick[key] == 0) {
				$("."+key).removeClass('disabled')  // 激活（enable）其余按钮，呈现为蓝色
				getFiveNumber = 0;
			}
		}
		if (getFiveNumber == 1)  {
			$("#info-bar").addClass('enabled');
		}
		global.isSend = 0;
	});
}
window.onload = function () {
	var buttons = document.getElementsByClassName("button");
	for (var i = 0; i < buttons.length; i++) buttons[i].addEventListener('click', excuteToGetNumber);
	document.getElementById("info-bar").addEventListener('click', add);
	document.getElementById("button").addEventListener('mouseleave', reset);
}
