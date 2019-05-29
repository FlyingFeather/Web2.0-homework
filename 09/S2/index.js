var global = {ifClick: new Array("0", "0", "0", "0", "0"), isSend: 0};
var xhr;
function Query(that) {
	if ($(that).hasClass("mask")) return "0";
	if ($(that).hasClass("history")) return "1";
	if ($(that).hasClass("message")) return "2";
	if ($(that).hasClass("setting")) return "3";
	if ($(that).hasClass("sign")) return "4";
}
function excuteToGetNumber(i, result) {
	document.getElementsByClassName("apb")[0].removeEventListener('click', getFirstNum);
	$('.apb').addClass('disable');
	var classnameNum = ['0', '1', '2', '3', '4'];  // 利用classname查找到对应的小圆
	$("."+classnameNum[i]).find('span').addClass('show');
	$("."+classnameNum[i]+" .unread").html("...");  // 等待随机数
	$('.button').addClass('disabled'); // 灭活其他
	$("."+classnameNum[i]).removeClass('disabled');
	xhr = $.get("/", function(data, status) {
		$("."+classnameNum[i]+" .unread").html(data);
		$("."+classnameNum[i]).addClass('disabled1'); // 当前灭活
		$('.button').removeClass('disabled'); // 其余激活
		result += parseInt(data);
		if (i != 4) excuteToGetNumber(i+1, result);
		else {
			$("#info-bar").addClass('enabled');
			var test = setTimeout(function() {
				showChange(result);
			},1000);
		}
	});
}
// 在大圆呈现数字前延时保持一段时间的蓝色
function showChange(result) {
	$("#info-bar li").html(result);
	$("#info-bar").removeClass('enabled');
	$(".button").removeClass("disabled");
	$(".button").removeClass("disabled1");
	$('.apb').removeClass('disable');
	document.getElementsByClassName("apb")[0].addEventListener('click', getFirstNum);
}
function getFirstNum() {
	reset();
	excuteToGetNumber(0, 0);
}
// 鼠标离开大圆重置
function reset() {
	document.getElementsByClassName("apb")[0].addEventListener('click', getFirstNum);
	$(".button").removeClass("disabled");
	$(".button").removeClass("disabled1");
	$("#info-bar").removeClass("enabled");
	$('.apb').removeClass('disable');
	$("#info-bar li").html("");
	$(".unread").removeClass('show');
	if (xhr && xhr.readyState != 4) {  // 终止请求
		xhr.abort();
	}
}

$(function () {
	document.getElementsByClassName("apb")[0].addEventListener('click', getFirstNum);
	document.getElementById("button").addEventListener('mouseleave', reset);
})
