const db = require('./database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



exports.getSingleInfo = (id,dir) => {
    return new Promise((resolve , reject) => {
        if(!id || !dir) return reject(new Error("Please Check your Info"));
        return db.execute(`
          SELECT * FROM EMP WHERE id = ? AND Dir = ?
        `,[id,dir]).then(res => {
            resolve(res[0])
        }).catch(e => {
            reject(e)
        })
    })
}

exports.getNotificatios = (uid) => {
    return new Promise((resolve , reject) => {
        if(!uid) return reject(new Error("Please Check your Info"));
        return db.execute(`
        select * from (select title , content , date from local_notifaction union select title , content , date from private_notifaction where user_id = 79373 ) as notifications order by date
        `,[uid]).then(res => {
            resolve(res[0])
        }).catch(e => {
            reject(e)
        })
    })
}


exports.checkEmployerAuth = (user,password) => {
    return new Promise((resolve , reject) => {
        if(!user || !password) return reject(new Error("Please Check your Info"));
        return db.execute(`
          SELECT * FROM USERS WHERE eid = ? 
        `,[user]).then(res => {
            if(res[0].length > 0){
                
                if(res[0][0].passwords){
                    
                    if(res[0][0].passwords === password){
                        const token = jwt.sign({uname : res[0][0].uname , eid : res[0][0].eid , dir : res[0][0].dir , uid : res[0][0].uid},"k4m4lS4m1rEl3w1")

                        resolve({"error" : null , "messages" : null , data : {...res[0][0],token : token }})
                    }else{
                        resolve({"error" : null , "messages" : "Password not match !" , data : null})
                    }
                }else{
                    resolve({"error" : null , "messages" : "Couldn't Check Password !" , data : null})
                }
            }else{
                resolve({"error" : null , "messages" : "Employer id not found !" , data : null})
            }
            // resolve(res[0])
        }).catch(e => {
            console.log(e)
            resolve({"error" : "Some error was happen" , "messages" : null , data : null})
        })
    })
}


exports.getAllInfo = () => {
    return new Promise((resolve , reject) => {
        if(!id || !dir) return reject(new Error("Please Check your Info"));
        return db.execute(`
          SELECT * FROM EMP
        `).then(res => {
            resolve(res[0])
        }).catch(e => {
            reject(e)
        })
    })
}

exports.getAllUser = () => {
    return new Promise((resolve , reject) => {
        
        return db.execute(`
          SELECT * FROM users
        `).then(res => {
            resolve(res[0])
        }).catch(e => {
            reject(e)
        })
    })
}


exports.getSingleUser = (eid,dir,newd,inaddress , permession , currentPage) => {
    
    const PAGE_SIZE = 10;
    const fpage = (currentPage - 1) * PAGE_SIZE;
    const spage = (currentPage - 1) * PAGE_SIZE + PAGE_SIZE
    
    
    return new Promise((resolve , reject) => {
        if(!eid) eid = "";

        if(inaddress === false || !inaddress || permession === 4){

        if(dir && dir.length > 0){

            return db.query(`
            SELECT * , (select count(*) from moe.users) as count FROM users WHERE (uname like ? || eid like ?) And dir like ? and dir in (?) limit ? offset ?
       `,["%" + eid + "%" , "%" + eid + "%" , "%" + dir + "%" , newd  , PAGE_SIZE , fpage ]).then(res => {
           
           
           resolve(res[0])

       }).catch(e => {
           reject(e.message)
       })   

        }else{
            
           
            return db.query(`
            SELECT * , (select count(*) from moe.users) as count FROM users WHERE (uname like ? || eid like ?) and dir in (?) limit ? offset ?
            `,["%" + eid + "%" , "%" + eid + "%",newd , PAGE_SIZE , fpage ]).then(res => {
                
                resolve(res[0])
            }).catch(e => {
                console.log(e.message)
                reject(e.message)
            })

        }
    }else{


        if(dir && dir.length > 0){

            return db.query(`
            SELECT * , (select count(*) from moe.users) as count FROM users WHERE (uname like ? || eid like ?) And dir like ? and dir in (?) and Addres in (?) limit ? offset ?
       `,["%" + eid + "%" , "%" + eid + "%" , "%" + dir + "%" , newd , inaddress , PAGE_SIZE , fpage]).then(res => {
           
           
           resolve(res[0])

       }).catch(e => {
           reject(e.message)
       })   

        }else{
            
           
            return db.query(`
            SELECT * , (select count(*) from moe.users) as count FROM users WHERE (uname like ? || eid like ?) and dir in (?) and Addres in (?) limit ? offset ?
            `,["%" + eid + "%" , "%" + eid + "%",newd , inaddress , PAGE_SIZE , fpage ]).then(res => {
                
                resolve(res[0])
            }).catch(e => {
                console.log(e.message)
                reject(e.message)
            })

        }


    }
    })
}


exports.updateUser = (names,eid,password , dir , uid) => {
    return new Promise((resolve , reject) => {
        if(!names || !eid || !password || !dir || !uid) return reject(new Error("check your info"));
        return db.execute(`
         update users
         set
           eid = ?,
           uname = ?,
           passwords = ?,
           dir = ?
        where uid = ?
        `,[eid,names,password,dir,uid]).then(res => {
           
            resolve(res[0])
        }).catch(e => {
            reject(e)
        })
    })
}


exports.changePassword = (eid,dir,password) => {
    
    return new Promise((resolve , reject) => {
        if(!eid) return reject(new Error("Please insert your eid"));
        return db.execute(`
          update users
          set passwords = ?
          where eid = ? And dir = ?
        `,[password , eid , dir]).then(res => {
            resolve(res[0])
        }).catch(e => {
            reject(e)
        })
    })
}


exports.GetUsersCount = () => {
    
    return new Promise((resolve , reject) => {
        if(!eid) return reject(new Error("Please insert your eid"));
        return db.execute(`
            Select count(*) from users
        `,[]).then(res => {
            resolve(res[0])
        }).catch(e => {
            reject(e)
        })
    })
}



exports.insertInfo = (id,NamEmp,Addres,Sector,Title,Degree,Step,b_nm,Salaryfact,TOTPAIDSumOfam,
    TOTDISCSumOfam,Net_Paid,tp_paid,t_disc,Notes,dir,allwa_date,g_id,un_code) => {
  
    return new Promise((resolve , reject) => {
        if(!NamEmp || !id || !dir) return reject(new Error("Please Check your Info"));
        return db.execute(`
          insert into emp(
            id,
            NamEmp,
            Addres,
            Sector,
            Title,
            Degree,
            Step,
            b_nm,
            Salaryfact,
            TOTPAIDSumOfam,
            TOTDISCSumOfam,
            Net_Paid,
            tp_paid,
            t_disc,
            Notes,
            Dir,
            allwa_date,
            date,
            group_id,
            op_type,
            un_code
          ) 
          values (
            ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
          )
        `,[id,NamEmp,Addres,Sector,Title,Degree,Step,b_nm,Salaryfact,TOTPAIDSumOfam,TOTDISCSumOfam,Net_Paid,tp_paid,
        t_disc,Notes,dir,allwa_date,'2022-05-05 18:19:03',g_id,op_type,un_code])
        .then(res => {
            return resolve({error : false})
        }).catch(e => {
            console.log(e.message)
            return reject(e)
        })
    })
}


exports.isAuth = (req,res,next) => {
    const authHeader = req.get('Authorization')
    if(!authHeader) throw new Error("No Auth Found")
    const token = req.get('Authorization').split(' ')[1]
    let decodedtoken;
    try {
        decodedtoken = jwt.verify(token , "k4m4lS4m1rEl3w1")
    } catch (error) {
        throw error
        
    }
    if(!decodedtoken) throw new Error("No Authontication");
        
        req.userId = decodedtoken.user_id
        req.permession = decodedtoken.permission,
        req.isLogin = decodedtoken.isLogin
        next()
}

exports.addToken = (id,uname,dir,token) => {
    return new Promise((resolve , reject) => {
        if (!id || !uname || !dir || !token) return reject(new Error("can't update token"));
        return db.query(`
             update users
               set token = ? 
            where eid = ? and uname = ? and dir = ?
        `,[token,id,uname,dir])
        .then(res => {
           resolve(res[0])
           
        }).catch(e => {
            console.log(e.message)
           reject(e.message)
        })
      })
}



exports.loginUser = (username , password) => {
    
    let user ;
    return new Promise((resolve , reject) => {
        if (!username || !password) return reject(new Error("can't login with this user please check your info"));
        return db.execute(`
                SELECT a.id , a.username , a.passwords , a.webtoken , a.name , a.mobile , a.permission_id , p.permission_title 
                FROM admins a left join permissions p on a.permission_id = p.id where a.username = ?;
        `,[username])
        .then(res => {
            if(res[0].length > 0){
                user = res[0][0]
              
                return bcrypt.compare(password,res[0][0].passwords)
            }else{
                throw new Error("User Not Found")
            }
        }).then(isEqual => {
            if(isEqual){
                 db.execute(`SELECT waddress from user_dir left join workdir on workdir.id = user_dir.workdir_id where user_dir.user_id = ?`,[user.id])
                .then(resDir => {
                    db.execute(`SELECT waddress from user_sdir usd left join workaddress wa on wa.id = usd.waddres_id where usd.user_id = ?`,[user.id])
                    .then(resAddress => {
                        
                        const token = jwt.sign({
                            username : user.fname ,
                             webtoken : user.webtoken ,
                              permission : user.permission_id ,
                               user_id : user.id ,
                                username : user.name ,
                                 isLogin : true ,
                                  approvedDir : resDir[0],
                                   approvedAddress : resAddress[0]
                                },"k4m4lS4m1rEl3w1")
                        return resolve(token)
    
                    })
                    .catch(error => {
                        throw new Error("can't get dir")
                    })
                    

                })
                .catch(error => {
                    throw new Error(error.message)
                })
                
                
            }else {
                throw new Error("Password not match")
            }
        }).catch(e => {
            
            reject(e.message)
        })
      })
}


exports.getDir = (indir) => {
    
    return new Promise((resolve , reject) => {
        return db.query(`
             SELECT dir FROM users where dir in (?) group by dir 
        `,[indir])
        .then(res => {
           resolve(res[0])
           
        }).catch(e => {
            console.log(e.message)
           reject(e.message)
        })
      })
}


exports.getInfoRow = (name , id , dir , newd) => {
    
    return new Promise((resolve , reject) => {
        if(!name || !id) return reject(new Error("Please Check your Info"));
        if(dir){
            return db.query(`
            select * , MONTH(emp.date) as month , year(emp.date) as year from emp where NamEmp = ? and id = ? and Dir = ? and dir in (?)
          `,[name,id,dir,newd])
          .then(res => {
             
             resolve(res[0])
          }).catch(e => {
             reject(e.message)
          })
        }else {
            return db.query(`
            select * , MONTH(emp.date) as month , year(emp.date) as year from emp where NamEmp = ? and id = ? and dir in (?)
          `,[name,id,newd])
          .then(res => {
            
             resolve(res[0])
          }).catch(e => {
             reject(e.message)
          })
        }
      })
}

exports.getInfoRowEmp = (name , id , dir , newd) => {
    
    return new Promise((resolve , reject) => {
        if(!name || !id) return reject(new Error("Please Check your Info"));
        if(dir){
            return db.query(`
            select * , MONTH(emp.date) as month , year(emp.date) as year from emp where NamEmp = ? and id = ? and Dir = ? 
          `,[name,id,dir])
          .then(res => {
             
             resolve(res[0])
          }).catch(e => {
             reject(e.message)
          })
        }else {
            return db.query(`
            select * , MONTH(emp.date) as month , year(emp.date) as year from emp where NamEmp = ? and id = ? 
          `,[name,id])
          .then(res => {
           
             resolve(res[0])
          }).catch(e => {
             reject(e.message)
          })
        }
      })
}

//SELECT dir FROM users group by dir;