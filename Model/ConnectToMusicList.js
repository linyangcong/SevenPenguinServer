const db=require('../db_config/config')

//login接口
let login=(tablename,username,password)=>{
  return new Promise((resolve,reject)=>{
    db.query('select * from '+tablename+' where username='+username+' and password='+password,(err,rows)=>{
      if(err){
        reject(err)
      }
      resolve(rows)
    })
  })
}


let show = (tablename,type) => {
  console.log(tablename,type)
    return new  Promise((resolve, reject) => {
      if(type=='music'){
        db.query('select * from '+tablename, (err, rows) => {
          if(err) {
            reject(err);
          }
          resolve(rows);
        })
      }
      else if(type=='video'){
        db.query('select * from '+tablename, (err, rows) => {
          if(err) {
            reject(err);
          }
          resolve(rows);
        })
      }
      else reject('查询失败！')
    })
  }//显示全部 （select*）
  
  let select = (tablename,attrname,attribute,type) => {
    return new Promise((resolve, reject) => {
      if(type=='music'){
        db.query(`select * from ${tablename} where ${attrname} like '%${attribute}%'`, (err, rows) => {
          if(err) {
            reject(err);
          }
          resolve(rows);
        })
      }
     else if(type=='video'){
        db.query(`select * from ${tablename} where ${attrname} = '${attribute}'`, (err, rows) => {
          if(err) {
            reject(err);
          }
          resolve(rows);
        })
      }
      else if(type=='article'){
        db.query(`select * from ${tablename} where ${attrname} = '${attribute}'`, (err, rows) => {
          if(err) {
            reject(err);
          }
          resolve(rows);
        })
      }
      
    })
  }//查询一行（传参)
  
  let update = (updateattributename, newdata,attributename,attribute) => {
    return new Promise((resolve, reject) => {
      db.query(`update musiclist set ${updateattributename} = '${newdata}' where ${attributename} = '${attribute}'`,(err,rows) => {
        if(err) {
          reject(err);
        }
        resolve(rows);
      })
    }) 
  }//修改
  
  let insert = (attributenames, attributes) => {
    return new Promise((resolve, reject) => {
      db.query(`insert into musiclist ${attributenames} values ${attributes}`, (err,rows) => {
        if(err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }


  let find = (tablename,type,listtype) => {
      return new  Promise((resolve, reject) => {
        if(type=='all'){
          db.query('select * from '+tablename+' order by support_count desc', (err, rows) => {
            if(err) {
              reject(err);
            }
            resolve(rows);
          })
        }
        else if(type='currentplay'){
          db.query('select * from '+tablename+' order by cplaytime desc', (err, rows) => {
            if(err) {
              reject(err);
            }
            resolve(rows);
          })
        }
        else reject('查询失败！')
      })
    }

  exports.login=login;
  exports.show=show;
  exports.select=select;
  exports.update=update;
  exports.insert=insert;
  exports.find=find;