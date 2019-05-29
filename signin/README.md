
这次作业难度对自己来说大了些，参考了好多网上的资料以及教学视频。
其中参考比较多的是：http://www.cnblogs.com/imwtr/p/4360341.html

启动项目命令：npm start
(启动文件是app.js, 不是./bin/www)

按照实际情况只将用户名作为用户的唯一标识，即不能创建同名用户，其余不限。
可以通过http://localhost:8000/?username=XXX的形式访问，当XXX不是当前登录用户时，
显示只能够访问自己的数据，但直接跳转显示http://localhost:8000/login


----------------------

文件结构：
-signin
---bin
    www
---data (链接数据库时可使用)
---models
	data.js
	user.js
---node_modules
---public
	images
	javascripts
		jquery.js
		valid.js
	stylesheets
		style.css
---routes
	index.js
	module.js
	users.js
---sessions
---views
	detail.ejs
	error.ejs
	index.ejs
	login.ejs
	regist.ejs
---app.js
---package.json
---README.md