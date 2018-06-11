//引入Express框架及相关工具
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';

//加载ORM服务
import sequelize from './data-model/data-base';


//引入数据服务模块
import register from './data_servers/register';
import login from './data_servers/login';
import createUser from './data_servers/createUser';
import postAppMessage from './data_servers/postAppMessage';
import postWebMessage from './data_servers/postWebMessage';
import deleteMessage from './data_servers/deleteMessage';
import follow from './data_servers/follow';
import unFollow from './data_servers/unFollow';
import getFollow from './data_servers/getFollow';
import getUser from './data_servers/getUser';
import updateUser from './data_servers/updateUser';
import findUser from './data_servers/findUser';
import getMessage from './data_servers/getMessage';
import homeMessage from './data_servers/homeMessage';
import changePassword from './data_servers/changePassword';


//var mysql  = require('mysql2');
//mport mysql  from 'mysql2';

//通过Express框架创建一个ExpressApp对象
const app = express();

//支持跨域请求
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();    
})

//添加静态文件服务器
//使用express自带的static中间件，对source目录提供静态文件服务
app.use('/resource',express.static('./resource'));

//解析JSON数据表单
app.use(bodyParser.json())
//解析表单文件
app.use(multer().any());


//配置请求路由
app.post('/api/register',register);
app.post('/api/login',login);
app.post('/api/createUser',createUser);
app.post('/api/postAppMessage',postAppMessage);
app.post('/api/postWebMessage',postWebMessage);
app.post('/api/deleteMessage',deleteMessage);
app.post('/api/follow',follow);
app.post('/api/unFollow',unFollow);
app.post('/api/getFollow',getFollow);
app.post('/api/updateUser',updateUser);
app.post('/api/getUser',getUser);
app.post('/api/getMessage',getMessage);
app.post('/api/homeMessage',homeMessage);
app.post('/api/findUser',findUser);
app.post('/api/changePassword',changePassword);



//开启监听服务
const server = app.listen(5000,()=>{
	console.log('开启成功，访问http://localhost:9010');
});


