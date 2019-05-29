window.onload = function() {
	$('.unread').hide();
	$("#button").mouseout(function() {
		setTimeout(function() {
			resetAll();
		}, 10);
	});
	$("#button").mouseover(function() {
		clearTimeout();
	})
	document.getElementsByClassName("apb")[0].addEventListener('click', startToAdd);
}
function startToAdd() {
	document.getElementsByClassName("apb")[0].removeEventListener('click', startToAdd);
	$('.unread').hide();
	if($("#clickOrder").text() == "") {
		clickAfter();
	} else {
		$("#clickOrder").text("");
		resetAll();
		startToAdd();
	}
}
function getRandomArray() {
	array = ["A","B","C","D","E"];
	for (var i = 0; i < 20; i++) {
		var random1 = Math.round(Math.random()*4);
		var random2 = Math.round(Math.random()*4);
		array = sort(random1, random2, array);
	}
	return array[0]+array[1]+array[2]+array[3]+array[4];
}
// 颜色变化
function showGrayRing() {
	var object = ['A','B','C','D','E'];
	for(var key in object) {
		$('#'+object[key]).css({"backgroundColor":"#686868"});
	}
}
function showBlueRing() {
	var object = ['A','B','C','D','E'];
	for(var key in object) {
		$('#'+object[key]).css({"backgroundColor":"#303F9F"});
	}
}

function resetAll() {
	document.getElementsByClassName("apb")[0].addEventListener('click', startToAdd);
	hideNumber();
	showBlueRing();
	$("#clickOrder").text("");
}
function isSucess() {
	var pos = Math.round(Math.random()*1);
	var istrue = [true, false];
	return istrue[pos];
}
function hideNumber() {
	var form = {A:1,B:1,C:1,D:1,E:1};
	for(var key in form) {
		$('#'+key).find('span').text("").hide();
	}
	$(".sum").text("");
}
function clickAfter() {
	showGrayRing();
	$("#clickOrder").text(getRandomArray());
	var orderN = $("#clickOrder").text();
	var error = isSucess();
	var callback = "1";
	eval(orderN[0]+"Handler(0, 0, error, callback)");
}
function clearM() {
	$(".sum").text("");
	$(".sum1").text("");
}
function AHandler(sum, i, error, callback) {
	clearM();
	if (!error) {
		if (callback != "" && callback != "1") {
			var message = "callee error:"+callback;
			$(".sum1").text(message);
		}
		$(".sum").text("这是个天大的秘密");
		error = isSucess();
		callback = "";
		bubbleHandler("A", sum, i, error, callback);
	} else {
		if (callback != "" && callback != "1") {
			$(".sum1").text("callee error:"+callback);
		}
		callback = "这不是个天大的秘密";
		error = isSucess();
		errorHandler("A", sum, i, error, callback);
	}
}
function BHandler(sum, i, error, callback) {
	clearM();
	if (!error) {
		if (callback != "" && callback != "1") {
			var message = "callee error:"+callback;
			$(".sum1").text(message);
		}
		$(".sum").text("我不知道");
		error = isSucess();
		callback = "";
		bubbleHandler("B", sum, i, error, callback);
	} else {
		if (callback != "" && callback != "1") {
			$(".sum1").text("callee error:"+callback);
		}
		callback = "我知道了";
		error = isSucess();
		errorHandler("B", sum, i, error, callback);
	}
}
function CHandler(sum, i, error, callback) {
	clearM();
	if (!error) {
		if (callback != "" && callback != "1") {
			var message = "callee error:"+callback;
			$(".sum1").text(message);
		}
		$(".sum").text("你不知道");
		callback = "";
		error = isSucess();
		bubbleHandler("C", sum, i, error, callback);
	} else {
		if (callback != "" && callback != "1") {
			$(".sum1").text("callee error:"+callback);
		}
		callback = "你知道";
		error = isSucess();
		errorHandler("C", sum, i, error, callback);
	}
}
function DHandler(sum, i, error, callback) {
	clearM();
	if (!error) {
		if (callback != "" && callback != "1") {
			var message = "callee error:"+callback;
			$(".sum1").text(message);
		}
		$(".sum").text("他不知道");
		callback = "";
		error = isSucess();
		bubbleHandler("D", sum, i, error, callback);
	} else {
		if (callback != "" && callback != "1") {
			$(".sum1").text("callee error:"+callback);
		}
		callback = "他知道";
		error = isSucess();
		errorHandler("D", sum, i, error, callback);
	}
}
function EHandler(sum, i, error, callback) {
	clearM();
	if (!error) {
		if (callback != "" && callback != "1") {
			var message = "callee error:"+callback;
			$(".sum1").text(message);
		}
		$(".sum").text("才怪");
		callback = "";
		error = isSucess();
		bubbleHandler("E", sum, i, error, callback);
	} else {
		if (callback != "" && callback != "1") {
			$(".sum1").text("callee error:"+callback);
		}
		callback = "当然";
		error = isSucess();
		errorHandler("E", sum, i, error, callback);
	}
}
function NHandler(N, sum, i, error) {
	if (!error) {
		$(".sum").text("才怪");
		error = isSucess();
		bubbleHandler(N, sum, i, error);
	} else {
		$(".sum").text("当然");
		error = isSucess();
		errorHandler(N, sum, i, error);
	}
}
function bubbleHandler(letter, sum, i, error, callback) {
	if ($("#clickOrder").text() != "") {
		$('#'+letter).css({"backgroundColor":"#303F9F"});
		$('#'+letter).find('span').show();
		$('#'+letter).find('span').text("...").show();
		$.get("/",function(data,status) {
			if($("#clickOrder").text() != "") {
				$('#'+letter).find('span').text(data).show();
				showGrayRing();
				successcall(sum, data, i, error, callback);
			}
		});
	}
}
// 成功处理接收数据
function successcall(sum, data, i, error, callback) {
	var order = $("#clickOrder").text();
	sum += parseInt(data);
	if (i == 4) {
		$(".sum1").text("");
		$(".sum").text("楼主异步调用战斗力感人，目测不超过"+sum);
		document.getElementsByClassName("apb")[0].addEventListener('click', startToAdd);
		showBlueRing();
	}
	else eval(order[i+1]+"Handler(sum, i+1, error, callback)");
}
function errorHandler(letter, sum, i, error, callback) {
	if ($("#clickOrder").text() != "") {
		$('#'+letter).css({"backgroundColor":"#303F9F"});
		var xhr = $.get("/",function(data,status) {
			if($("#clickOrder").text() != "") {
				showGrayRing();
				errorcall(sum, data, i, error, callback);
			}
		});
	}
}
// 失败调用
function errorcall(sum, data, i, error, callback) {
	var order = $("#clickOrder").text();
	if (i == 4) {
		$(".sum1").text("");
		$(".sum").text("楼主异步调用战斗力感人，目测不超过"+sum);
		document.getElementsByClassName("apb")[0].addEventListener('click', startToAdd);
		showBlueRing();
	}
	else eval(order[i+1]+"Handler(sum, i+1, error, callback)");
}
function sort(random1, random2, array) {
	var temp = array[random1];
	array[random1] = array[random2];
	array[random2] = temp;
	return array;
}
