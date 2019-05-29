$(function () {
	document.getElementsByClassName("apb")[0].addEventListener('click', showClickOrder);
	document.getElementById("button").addEventListener('mouseleave', reset);
})
var xhr;
function excuteToGetNumber(i, result, randomOrderArray) {
	document.getElementsByClassName("apb")[0].removeEventListener('click', showClickOrder);
	var classnameNum = ['0', '1', '2', '3', '4'];
	$("."+classnameNum[randomOrderArray[i]]+" .unread").addClass('show');
	$("."+classnameNum[randomOrderArray[i]]+" .unread").html("...");
	$('.apb').addClass('disable');  // 灭活@
	$('.button').addClass('disabled');  // 灭活其他
	$("."+classnameNum[randomOrderArray[i]]).removeClass('disabled');
	xhr = $.get("/", function(data, status) {
		$("."+classnameNum[randomOrderArray[i]]+" .unread").html(data);
		$("."+classnameNum[randomOrderArray[i]]).addClass('disabled1');  // 当前灭活
		$('.button').removeClass('disabled'); // 其余激活
		result += parseInt(data);
		if (i != 4) {
			excuteToGetNumber(i+1, result, randomOrderArray);
		}
		else {
			$("#info-bar").addClass('enabled');
			var test = setTimeout(function() {
				showChange(result);
			},600);
		}
	});
}
// 在大圆呈现数字前延时保持一段时间的蓝色
function showChange(currentNumber) {
	$("#info-bar #sum").html(currentNumber);
	$("#info-bar").removeClass('enabled');
	$('.apb').removeClass('disable');
	$(".button").removeClass("disabled");
	$(".button").removeClass("disabled1");
	document.getElementsByClassName("apb")[0].addEventListener('click', showClickOrder);
}
function Sort() {
	var array = [0, 1, 2, 3, 4];
	var temp, randomNumber;
	for (var i = 4; i >= 0; i--) {
		randomNumber = Math.round(Math.random()*i);
		temp = array[randomNumber];
		array[randomNumber] = array[i];
		array[i] = temp;
	}
	return array;
}

function showClickOrder() {
	reset();
	var randomOrderArray = Sort();
	var object = ['A','B','C','D','E'];
	var clickOrder = object[randomOrderArray[0]]+object[randomOrderArray[1]]+object[randomOrderArray[2]]+object[randomOrderArray[3]]+object[randomOrderArray[4]];
	$("#info-bar #clickOrder").html(clickOrder);
	$("."+object[randomOrderArray[0]]+" .unread").addClass('show');
	$("."+object[randomOrderArray[0]]+" .unread").html("...");
	excuteToGetNumber(0, 0, randomOrderArray);
}

function reset() {
	document.getElementsByClassName("apb")[0].addEventListener('click', showClickOrder);
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

