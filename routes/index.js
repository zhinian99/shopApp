var express = require('express');
var fs =require("fs");
var cors=require("cors")
var router = express.Router();

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


//login 登录
router.post('/reg',cors(corsOptions),function(req,res,next){
	// console.log(req.body);//parameter
  let parm=req.body;
  let num=1;
  getFile(parm,res,num)//open file and get data
})
//register 注册
router.post('/login',cors(corsOptions),function(req,res,next){
  // console.log(req.body)//parameter
  let parm=req.body;
  let num=0;
  getFile(parm,res,num)
})
function getFile(parm,res,num){
  fs.readFile("user.json",function(err,data){
    if(err) console.log(err)
    data=JSON.parse(data.toString());
    if(num==1){
      register(data,parm,res)
    }else if(num==0){
      login(data,parm,res)
    }
  })
}
//register
function register(data,parm,res){
  let user=data.user;
  for(let i=0;i<user.length;i++){
    if(user[i].user==parm.user){
      res.end("用户名已存在")
      return 0;
    }
  }
  data.user.push(parm);
  data=JSON.stringify(data);
  fs.writeFileSync("user.json",data)
  res.end("注册成功");
}

//login
function login(data,parm,res){
  let user=data.user
  for(let i=0;i<user.length;i++){
    if(user[i].user=parm.user&&user[i].psw==parm.psw){
      res.end("success");
      return 0;
    }
  }
  res.end("登录失败")
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
