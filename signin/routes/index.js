var crypto = require('crypto'),
User = require('../models/user.js');

module.exports = function(app) {
	app.get('/', function (req, res) {
		// 已登录用户管理
		//console.log(req.session.user);
		if (req.session.user != null) {
			console.log('name : ' + req.session.user['name']);
			console.log('query name : ' + req.query['username']);
			if (req.session.user['name'] != req.query['username']) {
				if (req.query['username'] != undefined)
					req.flash('success', '只能够访问自己的数据!');
			}
			showinfo(res, req);
		} else {
			showindex(res, req);   
		}
	});
	// 注册操作
	app.get('/regist', itisnotlogin);
	app.get('/regist', function (req, res) {
		res.render('regist', {
			title: '注册',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});

	app.post('/regist', itisnotlogin);
	app.post('/regist', function (req, res) {
		var name = req.body.name,password = req.body.password,password_re = req.body['password-repeat'];
		var md5 = crypto.createHash('md5'),password = md5.update(req.body.password).digest('hex');
		var newUser = new User({name: name,password: password,email: req.body.email,studentid: req.body.studentid,phone: req.body.phone
		});
		// 判断新注册的用户是否合法
		var flag = false;
		User.get(newUser.name, function (err, user) {
			if (err) {req.flash('error', err);return res.redirect('/');}
			if (user) {req.flash('error', '用户已存在!');return res.redirect('/regist');}
			newUser.save(function (err, user) {
				if (err) {req.flash('error', err);return res.redirect('/regist');}
				req.session.user = user;
				req.flash('success', '您已注册成功!\n请登录');
				//res.redirect('/login');
				console.log(newUser.name);
			});
			req.session.user = newUser;
			res.render('detail', {
			title: '详情',
			name: req.session.user['name'],
			email: req.session.user['email'],
			studentid: req.session.user['studentid'],
			phone: req.session.user['phone'],
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()}); 
		});
		if (flag) {
			req.session.user = newUser;
			showinfo(res, req);
		}
	});
	// 登录
	app.get('/login', itisnotlogin);
	app.get('/login', function (req, res) {
		res.render('login', {
			title: '登录',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		}); 
	});

	app.post('/login', itisnotlogin);
	app.post('/login', function (req, res) {
		var md5 = crypto.createHash('md5'), password = md5.update(req.body.password).digest('hex');
		User.get(req.body.name, function (err, user) {
			check(req, res, user, password);
			if (user && user.password == password) {
				req.session.user = user; 
				req.flash('success', '登录成功!');
				console.log(req.session.user['name'] + '登录!');
				console.log(user);
				showinfo(res, req);
			}
		});
	});
	// 登出
	app.get('/logout', itislogin);
	app.get('/logout', function (req, res) {
		console.log(req.session.user['name'] + '登出!');
		req.session.user = null;
		req.flash('success', '成功登出!');
		res.redirect('/login');
	});
};

// 显示操作
function showinfo(res, req) {
	res.render('detail', {
	title: '详情',
	name: req.session.user['name'],
	email: req.session.user['email'],
	studentid: req.session.user['studentid'],
	phone: req.session.user['phone'],
	user: req.session.user,
	success: req.flash('success').toString(),
	error: req.flash('error').toString()}); 
}
function showindex(res, req) {
	res.render('index', {
	title: '项目主页',
	user: req.session.user,
	success: req.flash('success').toString(),
	error: req.flash('error').toString()});  
}

// 检查操作
function check(req, res, user, password) {
	if (!user) {
		req.flash('error', '用户名不存在!'); 
		return res.redirect('/login');
	}
	if (user.password != password) {
		req.flash('error', '密码错误!'); 
		return res.redirect('/login');
	}
}
function itislogin(req, res, next) {
	if (!req.session.user) {
		req.flash('error', '未登录!'); 
		res.redirect('/login');
	}
	next();
}

function itisnotlogin(req, res, next) {
	if (req.session.user) {
		req.flash('error', '已登录!'); 
		res.redirect('back');
	}
	next();
}