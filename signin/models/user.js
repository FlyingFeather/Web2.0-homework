var mongodb = require('./data');

module.exports = User;

//读取用户信息
User.get = function(name, callback) {
	mongodb.open(function (error, db) {
		Errorhandle(error);
		db.collection('users', function (error, collection) {
			mongoHandle(error);
			//查找匹配的用户*/
			collection.findOne({name: name}, function (error, user) {
				mongodb.close();
				Errorhandle(error);
				callback(null, user);//返回查询的用户信息
			});
		});
	});
};
/*findUser: function(username, password) {
	return users.findOne({username: username}) .then(function(user){
		return user ? bcrypt.compare(password, user.password).then(function(){
			return user;
		}) : Promise.reject("user doesn't exist");
	});
},*/
function User(user) {
	this.name = user.name;
	this.password = user.password;
	this.email = user.email;
	this.studentid = user.studentid;
	this.phone = user.phone;
};

function Errorhandle(error) {
	if (error) {
		return callback(error);//错误，返回 error 信息
	}
};
function mongoHandle(error) {
	if (error) {
		mongodb.close();
		return callback(error);//错误，返回 error 信息
	}
}
User.prototype.save = function(callback) {
	var user = {name: this.name,password: this.password,email: this.email,studentid: this.studentid,phone: this.phone};
	mongodb.open(function (error, db) {
		Errorhandle(error);
		db.collection('users', function (error, collection) {
			mongoHandle(error);
			//记录新的用户数据
			collection.insert(user, {safe: true}, function (error, user) {
				mongodb.close();
				Errorhandle(error);
				callback(null, user[0]);
			});
		});
	});
};// 参考网上的逻辑