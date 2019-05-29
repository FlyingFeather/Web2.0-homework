$(function () {
	document.getElementsByClassName("apb")[0].addEventListener('click', excuteToGetNumber);
	document.getElementById("button").addEventListener('mouseleave', reset);
})

var xhr;
function excuteToGetNumber() {
	$("#info-bar li").html("");
	document.getElementsByClassName("apb")[0].removeEventListener('click', excuteToGetNumber);
	var classnameNum = ['0', '1', '2', '3', '4'];
	var ifclick = new Array("0", "0", "0", "0", "0");
	$('.apb').addClass('disable');
	for (var key in classnameNum) {
		$("."+key+" .unread").addClass('show');
		$("."+key+" .unread").html("...");
		$("."+key).addClass('disabled');
		(function (key) {
			xhr = $.get("/?date="+Math.random(), function(data, status) {
				$("."+key+" .unread").html(data);
				ifclick[key] = 1;
				if (ifclick[0] == 1 && ifclick[1] == 1 && ifclick[2] == 1 && ifclick[3] == 1 && ifclick[4] == 1) {
					var result = 0;
					for (var i = 1; i <= 5; i++) {
						result += parseInt($('#control-ring li:nth-child('+i+')').find('span').html());
					}
					$("#info-bar").addClass('enabled');
					var test = setTimeout(function() {
						showChange(result);
					},300);
				}
			});
		}) (key);
	}
}
// 在大圆呈现数字前延时保持一段时间的蓝色
function showChange(currentNumber) {
	$("#info-bar li").html(currentNumber);
	$("#info-bar").removeClass('enabled');
	$(".button").removeClass("disabled");
	$(".button").removeClass("disabled1");
	$('.apb').removeClass('disable');
	document.getElementsByClassName("apb")[0].addEventListener('click', excuteToGetNumber);
}
function reset() {
	document.getElementsByClassName("apb")[0].addEventListener('click', excuteToGetNumber);
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
