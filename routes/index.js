var express = require('express');
var router = express.Router();
var path=require('path')
var {login,show,select,insert,update ,find}=require('../Model/ConnectToMusicList')
// 验证码
var validate=''
var flag=0;
//用户信息
// var userdetail=[
//   {
//    tooken:'1619884161', username:'13188813188',password:'123',name:'大迪欧你给的',level:'5',mobile:'13188813188',age:'18',idcard:'425242129320043630',signed:'0',foncuser:'12',fans:'221'
//   },
// ]
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  
});
// 登录模块接口
router.get('/login/logon',async (req,res,next)=>{
  // console.log(req.url)
  let username=req.query.username;
  let password=req.query.password;
  // let username=19925956050;
  // let password=123456;
  let result=await login('base_user',username,password) 
  res.send(result)
  // userdetail.forEach(item=>{
  //   if(username==item.username&&password==item.password){
  //     flag=1;
  //     // if(item.tooken==null||item.tooken==undefined){
  //     //   let usercode=parseInt(Math.random()*1000000000);
  //     //   item.tooken=usercode
  //     // }
  //     res.status(200).json({message:'登录成功！',userdetail:item});
  //   }
  // })
  // if(flag==1){falg=0; return;}
  // res.status(201).json({message:'密码错误或用户不存在！'});
})
//获取验证码
router.get('/login/forgetpwd',function(req,res,next){
  userdetail.forEach((item,index)=>{
    if(req.query.tooken==item.tooken){
      flag=1;
      item.validate=parseInt(Math.random()*10000)
      res.status(200).json({message:validate});
    }
    return item;
  }
  )
  if(flag==1){falg=0; return;}
  res.status(404).json({message:'用户tooken不存在,请先登录！'})
})
//重置密码
router.get('/login/setPWD',function(req,res,next){
  userdetail.forEach(item=>{
    if(req.query.validate==item.validate){
      item.password=req.query.password;
      res.status(200).json({message:'密码重置成功,请重新登录！'})
    }
  })
  if(flag==1){falg=0; return;}
  res.status(404).json({message:'验证码错误！'})
})
//切换登录方式-保留
router.get('/login/loginStyle',function(req,res,next){

})

//获取用户详情
router.get('/Mine/userDetail',function(req,res,next){
  userdetail.forEach(item=>{
    if(req.query.tooken==item.tooken){
      flag=1;
      item.signed='1';
      res.status(200).json({message:'签到成功！',userdetail:item})
    }
  })
  if(flag==1){falg=0; return;}
  res.status(404).json({message:'用户tooken不存在，请重新登录！'})
})

//请求访问音频文件
router.get('/Music/List',async (req,res,next)=>{
  try {
    let result = await show('musiclist','music')
    result.map(item=>{
      item.name=item.music_path;
      item.flag={
        only:(item.onlyone==1?true:false),
        SQ:(item.SQ==1?true:false)
      }
      delete item.SQ
      delete item.onlyone
      delete item.music_path
    });

    res.send(result);
  } catch (e) {
    res.send(e);
  }
})
//获取随机音乐资源
router.get('/Music/List/searchMusic',async (req,res,next)=>{
  if(req.query.name!=undefined&&req.query.name){
    let result = await select('musiclist','music_path',req.query.name,'music')
    result.map(item=>{
      item.name=item.music_path;
      item.flag={
            only:(item.onlyone==1?true:false),
            SQ:(item.SQ==1?true:false)
          }
          delete item.SQ
          delete item.onlyone
          delete item.music_path
    })
      
          res.send(result)
  }
  else{
    var arrlen=req.query.id.split(','),resullist=new Array();
    if(arrlen.length>=2){
      for(let i=0;i<arrlen.length;i++){
        let result = await select('musiclist','id',arrlen[i],'music')
        resullist.push(result)
      }
      res.send(resullist)
    }
    else {
      let result = await select('musiclist','id',req.query.id,'music')
      result[0].name=result[0].music_path;
      result[0].flag={
            only:(result[0].onlyone==1?true:false),
            SQ:(result[0].SQ==1?true:false)
          }
          delete result[0].SQ
          delete result[0].onlyone
          delete result[0].music_path
      res.send(result[0])
    }
  }
  
  
})
//获取视频资源
router.get('/Video/List/tuijianContents',async (req,res,next)=>{
  try{
    let TJ_videolist=await select('videoplay','flag','TJ','video')

    res.send(TJ_videolist)
  }catch(e){
    res.send(e)
  }
  
})
// 获取云村数据
router.get('/Acticle/List/cloudcountryside',async (req,res,next)=>{
  try{
    let G_Acticale=await select('yuncun','flag','cloud','article')
    G_Acticale.map(item=>{
      item.img_path=item.img_path
      item.author_img=item.author_img_path
      item.author_name=item.author
      item.content=item.content.toString()
      delete item.author
      delete item.author_img_path
    }
      )
    res.send(G_Acticale)
  }catch(e){
    res.send(e)
  }
})
// 查询接口
router.get('/SearchMusic/find',async (req,res,next)=>{
  try {
    let result = await find('musiclist','all')
    let currentplay=await find('musiclist','currentplay')
    currentplay.splice(3)
    result.splice(5)
    let current_search=[currentplay,result]
    res.send({current_search});
  } catch (e) {
    res.send(e);
  }
})

//查询专辑
router.get('/Album/music',async (req,res,next)=>{
 try{
  let album_list=await show('discovery_carousel','music')
  album_list.map(item=>{
    item.musiclist=item.m_list.split(',')
    item.detail=item.detail.toString()
    delete item.m_list
  })
  res.send(album_list)
 }catch(e){
   res.send(e)
 }
})


module.exports = router;
