const csvtojson = require("csvtojson");
const { insertInfo, loginUser, getDir, getSingleUser, updateUser, getInfoRow } = require("../module/users");


async function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

exports.addToInfo = (req, res, next) => {
  csvtojson()
    .fromFile("csv/dr3.csv")
    .then(async (source) => {
      const g_id = makeid(8);
      for (var i = 0; i < source.length; i++) {

     
        

        var id = source[i]["Id"] === undefined ? 0 : source[i]["Id"],
          NamEmp = source[i]["NamEmp"] === undefined ? "" : source[i]["NamEmp"],
          Addres = source[i]["Addres"] === undefined ? "" : source[i]["Addres"],
          Sector = source[i]["Sector"] === undefined ? "" : source[i]["Sector"],
          Title = source[i]["Title"] === undefined ? "" : source[i]["Title"],
          Degree = source[i]["Degree"] === undefined ? "" : source[i]["Degree"],
          Step = source[i]["Step"] === undefined ? 0 : source[i]["Step"],
          b_nm = source[i]["b_nm"] === undefined ? "" : source[i]["b_nm"],
          Salaryfact = source[i]["Salaryfact"] === undefined ? 0 : source[i]["Salaryfact"],
          TOTPAIDSumOfam = source[i]["TOTPAIDSumOfam"] === undefined ? 0 : source[i]["TOTPAIDSumOfam"],
          TOTDISCSumOfam = source[i]["TOTDISCSumOfam"] === undefined ? 0 : source[i]["TOTDISCSumOfam"],
          Net_Paid = source[i]["Net_Paid"] === undefined ? 0 : source[i]["Net_Paid"],
          tp_paid = source[i]["tp_paid"] === undefined ? "" : source[i]["tp_paid"],
          t_disc = source[i]["t_disc"] === undefined ? "" : source[i]["t_disc"],
          Notes = source[i]["Notes"] === undefined ? "" : source[i]["Notes"],
          Dir = source[i]["Dir"] === undefined ? "" : source[i]["Dir"],
          allwa_date = source[i]["allwa_date"] === undefined || source[i]["allwa_date"] === null ? null : source[i]["allwa_date"].split('/'),
          op_type = source[i]["op_type"] === undefined ? "" : source[i]["op_type"],
          un_code = source[i]["un_code"] === undefined ? "" : source[i]["un_code"]


         
        var finalData = null;
        
        if(source[i]["allwa_date"] !== undefined || source[i]["allwa_date"] !== null){
         if(allwa_date.length > 2){
          var year = allwa_date[2];
          var month = allwa_date[1];
          var day = allwa_date[0];
          if(year !== undefined || month !== undefined || day !== undefined){
            finalData = year + "-" + month + "-" + day
          }
         }
          
        }


         await insertInfo(
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
          finalData,
          g_id,
          op_type,
          un_code
        ).then(async e => {
          
           if(e.error === false){
             if(i === undefined){
               
             }else{
             
             }
           } else {
           
           }

        }).catch(async err => {
          await sleep(2000)
       
          await sleep(2000)
        });
      
      }
      return res.json({state : true})

    }).catch(e => {
      
      return res.status(501).json({state : false})
    })
};



exports.adminLogin = (req , res , next) => {

  console.log("saved")

  const user = req.body.username;
  const password = req.body.password;
  
  if(!user || !password) return res.status(500).json({error : "check your input" , token : null})

  loginUser(user,password).then(resp => {
      res.json({error : null , token : resp})
  }).catch(err => {
    res.json({error : err , token : null})
  })
}


exports.getDirController = (req , res , next) => {
  const inDir = req.approvedDir
  var newDir;
  if(inDir){
    newDir = inDir.map(item => item.waddress)
  }
 
  getDir(newDir).then(resp => {
      res.json({error : null , dir : resp})
  }).catch(err => {
    console.log(err)
    res.json({error : err , dir : null})
  })
}


exports.getSingleUserAdmin = (req , res , next) => {
  const search = req.body.search ? req.body.search : "";
  const dir = req.body.dir ? req.body.dir : ""
  const currentPage = req.body.currentPage ? req.body.currentPage : 0
  const inDir = req.approvedDir
  var inAddress = req.approvedAddress ? req.approvedAddress.length <= 0 ? false : req.approvedAddress : false
  const permission = req.permission;
  console.log(inDir)

  var newDir;
  var newAddress
  if(inDir){
    newDir = inDir.map(item => item.waddress)
  }
  if(inAddress){
    newAddress= inAddress.map(item => item.waddress)
  }
  
 

  getSingleUser(search,dir,newDir,newAddress,permission,currentPage ).then(resp => {
      res.json({error : null , users : resp , count : resp[0] ? resp[0]['count'] : 0})
  }).catch(err => {
    console.log(err)
    res.json({error : err , users : null})
  })
}


exports.startUpdateUser = (req , res , next) => {
  const eid = req.body.eid
  const name = req.body.name
  const uid = req.body.uid
  const password = req.body.password
  const dir = req.body.dir
  
  updateUser(name,eid,password,dir,uid).then(resp => {
      res.json({error : null , state : true})
  }).catch(err => {
    console.log(err)
    res.json({error : err , state : false})
  })
}


exports.getInfoRowController = (req,res,next) => {
  const id = req.body.id;
  const name = req.body.name;
  const dir = req.body.dir ? req.body.dir : null ;

  const inDir = req.approvedDir
  var newDir;
  if(inDir){
    newDir = inDir.map(item => item.waddress)
  }



  getInfoRow(name,id,dir,newDir)
  .then(resp => {
    res.json({error : null , users : resp})
  })
  .catch(err => {
    console.log(err)
    res.json({error : err , users : []})
  })


}
