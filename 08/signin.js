var http = require('http');
var urlTool = require('url');
var querystring = require('querystring');
var fs = require('fs');
var validator = require('./js/validator')
var users = {};

http.createServer(function(req, res) {
	switch(req.url) {
		case '/validator.js':
			sendFile(res, 'js/validator.js', 'text/javascript');
			break;
		case '/signup.js':
			sendFile(res, 'js/signup.js', 'text/javascript');
			break;
		case '/style.css':
			sendFile(res, 'css/style.css', 'text/css');	
			break;
		default:
			req.method === 'POST' ? registUser(req, res) : sendHtml(req, res);
	}
}).listen(8000);

console.log("Signup server is listenning at 8000");
function sendFile(res, filepath, mime) {
	res.writeHead(200, {"Content-Type": mime});
	res.end(fs.readFileSync(filepath));
}
function registUser(req, res) {
	req.on('data', function(chunk) {
		try {
			var user = parseUser(chunk.toString());
			checkUser(user);
			users[user.username] = user;
			res.writeHead(301, {Location: '?username=' + user.username});
			res.end();
		} catch (error) {
			console.warn("regist error: ", error);
			showSignup(res, user, error.message);
		}
	});
}
//检查注册用户的数据格式的合法性，唯一性
function checkUser(user) {
	var errorMessages = [];
	for (var key in user) {
		if (!validator.isFieldValid(key, user[key])) {
			errorMessages.push(validator.form[key].errorMessage);
		}
		if (!validator.isAttrValueUnique(users, user, key)) {
			errorMessages.push(
				"key: "+key+" is not unique by value: " + user[key]
				);
		}
	}
	if (errorMessages.length > 0) throw new Error(errorMessages.join('<br />'));
}

function parseUser(message) {
	params = message.match(/username=(.+)&sid=(.+)&phone=(.+)&email=(.+)/);
	var user = {username: params[1], sid: params[2], phone: params[3], email: decodeURIComponent(params[4])};
	console.log(user);
	return user;
}

function parseUsername(req) {
	return querystring.parse(urlTool.parse(req.url).query).username;
}

function isRegistedUser(username) {
	return !!users[username];
}

function sendHtml(req, res) {
	var username = parseUsername(req);
	if (!username || !isRegistedUser(username)) {
		showSignup(res, {username: username}, null);
	} else {
		showDetail(res, users[username]);
	}
}

// 动态生成注册页面
function showSignup(response, user, error) {
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("<!DOCTYPE 'html'><html><head>");
	response.write("<meta http-equiv='Content-Type' content='text/html; charset=utf-8' /><title>注册</title><link rel='stylesheet' href='style.css'>");
	response.write("<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.js'></script><script type='text/javascript' src='validator.js'></script><script type='text/javascript' src='signup.js'></script>");
	response.write("</head><body><div class='container'><h1>注册用户</h1><form method='post'>");
	if (error) {response.write('<div class="error">' + error + '</div>');}
	response.write('<div class="username"><label for="username">用户名</label><input id="username" name="username"');
	if (user.username) {response.write('value='+user.username);}
	response.write('><span class="error"></span></div><div class="sid"><label for="sid">学号</label><input id="sid" name="sid"');
	if (user.sid) {response.write('value='+user.sid);}
	response.write('><span class="error"></span></div>');
	response.write('<div class="phone"><label for="phone">电话</label><input id="phone" name="phone"');
	if (user.phone) {response.write('value='+user.phone);}
	response.write('><span class="error"></span></div><div class="email"><label for="email">邮箱</label><input id="email" name="email"');
	if (user.email) {response.write('value='+user.email);}
	response.write('><span class="error"></span></div><div class="buttons"><input type="reset" value="重置" class="button reset"><input type="submit" value="提交" class="button submit"></div>');
	response.write("</form></div></body></html>");
	response.end();
}

//动态生成信息页面
function showDetail(response, user) {
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("<!DOCTYPE 'html'>");
	response.write("<html>");
	response.write("<head>");
	response.write("<meta http-equiv='Content-Type' content='text/html; charset=utf-8' /><title>详情</title><link rel='stylesheet' href='style.css'>");
	response.write("</head>");
	response.write("<body>");
	response.write('<div class="contain"><h1>用户详情</h1><p>用户名<span>' + user.username + '</span></p><p>学号<span>' + user.sid + '</span></p><p>电话<span>' + user.phone + '</span></p><p>邮箱<span>' + user.email + '</span></p>');
	response.write("</div></body>");
	response.write("</html>");
	response.end();
}
