
// 本计算器只保留八位有效数字。
/*输入太多想看到后面的数字其实可以用左右键将框右移，这个点还在思考怎么改进，
暂时只是修改了显示字体的大小，但数据很多的时候还是需要移动框才能看见，一般不会输入那么多数据吧？
*/
var clearmsg = false;  // 判断是否计算过一次。
var ispoint = true;  // 判断点是否出现过，表达式中只能输入一个点，之后输入无效。
var isoperator = false; // 根据互评添加，为了解决不进行运算直接等号出现的问题。
var expression = document.getElementById("text");
var message = "";

window.onload = function() {
	var buttons = document.getElementsByClassName('button');
	for (var i = 0; i < buttons.length-1; i++) {
		buttons[i].onclick = numbershow;
	}
	var operators = document.getElementsByClassName('operator');
	for (var j = 0; j < operators.length; j++) {
		operators[j].onclick = fuhaoshow;
	}
}
//------------------------------数字键-------------------------------------------------
function numbershow(event) {
	/*根据互评建议增加*/
	if (expression.value.length > 18) {
		expression.style.fontSize="18px";
	} else {
		expression.style.fontSize="25px";
	}
	/*-------------------------------*/
	if (clearmsg) {
		expression.value = "";
		clearmsg = false;
	}
	if (expression.value == "0") {
		expression.value = event.target.value;
	} else {
		expression.value += event.target.value;
	}
}

// --------------------------------运算符号和括号键-----------------------------------------------------
document.getElementById(")").onclick = function() {
	if (expression.value == "0") {
		alert("错误的输入");
	} else {
		expression.value += ")";
	}
}
function fuhaoshow(event) {
	if (clearmsg) {
		expression.value = "0";
		clearmsg=false;
	}
	ispoint = true;
	isoperator = true;
	if (expression.value.substr(-1) == "*" || expression.value.substr(-1) == "/" ||
		expression.value.substr(-1) == "+" || expression.value.substr(-1) == "-") {
		document.getElementById("text").value=document.getElementById("text").value.slice(0,-1);
		expression.value += event.target.value;
	} else {
		expression.value += event.target.value;
	}
}
// -----------------------------------------------------------------------------------------------

//------------------------------------计算结果-------------------------------------------------
document.getElementById("=").onclick = function getResult() {
	var data = document.getElementById("text");
	ispoint = true;
	try {
		// 根据互评建议增加
		if (!isoperator && data.value.length > 8) { // 精度缺失特殊情况处理
			data.value = data.value; // 不自定义保留有效位数。
		}
		// 根据互评建议增加
		if (data.value.length > 8 && data.value.substr(1, 1) == "." && data.value.substr(0, 1) == "0"
			&& data.value.substr(2, 7) == "0000000") {
			data.value = eval(data.value); // 不自定义保留有效位数。
		} else {
			data.value = parseFloat(eval(data.value).toFixed(8)); // 保留八位有效数字
		}
		clearmsg = true;
	} catch(err) {
		showError();
		// alert("error"); // 修改错误提示方式
		data.value = "0";
	}
	isoperator = false;
}

//---------------------------------点-----------------------------------------------------------
document.getElementById(".").onclick = function point() {
	var p = document.getElementById(".");
	var expression = document.getElementById("text");
	if (expression.value.substr(-1) == "*" || expression.value.substr(-1) == "/" ||
		expression.value.substr(-1) == "+" || expression.value.substr(-1) == "-") {
		expression.value += "0";
	}
	if (ispoint && clearmsg) {
		expression.value = "0";
		expression.value += p.value;
		ispoint = false;
		clearmsg = false;
	}
	if (ispoint) {
		clearmsg = false;
		expression.value += p.value;
		ispoint = false;
	}
}

//------------------------------清空键-----------------------------------------------------
document.getElementById("CE").onclick = function funclear() {
	expression.style.fontSize="25px"; // 根据互评建议增加
	var a = document.getElementById("text").value = "0";
	clearmsg = false;
	ispoint = true;
	document.getElementById("error").textContent = message;
}

//-------------------------------------退格键---------------------------------------------------
document.getElementById("back").onclick = function funback() {
	var expression = document.getElementById("text");
	if (expression.value.substr(-1) == ".") {
		ispoint = true;
	}
	if (expression.value == "0") {
		expression.value = "0";
	} else {
		document.getElementById("text").value=document.getElementById("text").value.slice(0,-1);
	}
	if (expression.value == "") {
		expression.value = "0";
	}
}
// -------------------------错误输出，按CE键清除错误提示--------------------------
function showError() {
	message += expression.value;
	message += "不是合法算式";
	document.getElementById("error").textContent = message;
	message = "";
}