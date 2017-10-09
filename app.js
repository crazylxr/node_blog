/*
* 应用程序的启动（入口）文件
* */
var express = require('express');
var swig = require('swig');
var moogoose = require('mongoose');
var bodyParser = require('body-parser');
var Cooikes = require('cookies');

var User = require('./models/User');

//创建app应用 => Node JS http.createServer();
var app = express();

//设置静态文件托管
app.use('/public', express.static(__dirname + '/public'));

//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法。
app.engine('html', swig.renderFile);
//设置文件存放的目录，第一个参数不能动，第二个参数是模板目录
app.set('views', './views');
//注册所使用的模板引擎，第一个不能动，第二个和app.engine定义的第一个参数相同
app.set('view engine', 'html');
//设置不缓存
swig.setDefaults({cache: false});

//bodyparser设置
app.use( bodyParser.urlencoded({extended: true}));

//cookies设置
app.use(function (req, res, next) {
    req.cookies = new Cooikes(req, res);

    //解析用户cookie信息
    req.userInfo = {};
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            // console.log(User.findByID(req.userInfo._id));
            //获取当前登录用户的类型，是否是管理员
            User.findById(req.userInfo._id).then(function (userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            });


        }catch (e){
            console.log(e);
            next();
        }
    }else {
        next();
    }
    // console.log(req.cookies.get('userInfo'));


});

/*
  根据不同的功能划分模块
 */

app.use('/admin', require('./routers/admin'));
app.use('/login', require('./routers/login'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));


//连接数据库
moogoose.connect('mongodb://localhost:27017/blog', function (err) {
    if(err){
        console.log('数据库连接失败');
    }else {
        console.log("数据库连接成功");
        //监听http请求
        app.listen(8081);
    }
});



//用户发送http请求 -> url -> 解析路由 -> 找到匹配的规则 -> 执行绑定函数，返回对应内容
//public -> 静态 -> 直接读取指定目录下的文件
//动态 -> 处理业务逻辑，加载模板，解析模板 -> 返回数据