const { getSingleInfo, getSingleUser, checkEmployerAuth, getInfoRowEmp , addToken, getNotificatios} = require("../module/users");
var request = require('request');
const axios = require('axios').default;

exports.getSingleInfoController = (req,res,next) => {
   const id = req.body.id;
   const dir = req.body.dir;

   getSingleInfo(id,dir)
   .then(resp => {
      return res.json(resp)
   })
   .catch(e => {
      console.log(e.message)
      return res.status(501).json({state : false})
   })
}



exports.getSingleUserController = (req,res,next) => {

  const text = req.query.search;
  getSingleUser(text)
  .then(resp => {
    
     return res.json({...resp , count : resp[0] ? resp[0]['count'] : 0})
  })
  .catch(e => {
     console.log(e.message)
     return res.status(501).json({state : false})
  })
}

exports.AddTokenController = (req,res,next)=> {
   const id = req.eid;
   const name = req.uname;
   const dir = req.dir;
   const token = req.body.mobiletoken
   
   addToken(id,name,dir,token).then(resp => {
      
      axios.post("https://fcm.googleapis.com/fcm/send",{
         "to" : token,
         "data" : {
              "title" : "قسم المعلوماتية المركزي"
           , "body" : "تم تسجيل بياناتك بنجاح"
         },
         "notification" : {
              "title" : "قسم المعلوماتية المركزي"
           , "body" : "تم تسجيل بياناتك بنجاح"
         },
         "priority" : "high"
      } ,{
         headers : {
         "Content-Type" : "application/json",
         "Authorization" : "key=AAAA2AHAE_k:APA91bHAO_GC3Jx9Ls5q3aLMDVcvMfzalW9bhHdTNoEIgkp1ai39mToGQWdUCh0t-iGyD7VBV8YcSIssnLCEZ-TnHdEKrNi0m0nnSaqHX8iPW38VjPMkmESvLCglsRBdG-OeorwdKyXK"
      },
      
   }).then(re => {
      
   }).catch(err => {
      console.log(err)
   })

      // request.post(
      //    "https://fcm.googleapis.com/fcm/send",
      //    { 
            
      //       headers : {
      //          "Content-Type" : "application/json",
      //          "Authorization" : "key=AAAA2AHAE_k:APA91bHAO_GC3Jx9Ls5q3aLMDVcvMfzalW9bhHdTNoEIgkp1ai39mToGQWdUCh0t-iGyD7VBV8YcSIssnLCEZ-TnHdEKrNi0m0nnSaqHX8iPW38VjPMkmESvLCglsRBdG-OeorwdKyXK"
      //       },
      //       body : {
      //          "to" : token,
      //          "data" : {
      //               "title" : "قسم المعلوماتية المركزي"
      //            , "body" : "تم تسجيل بياناتك بنجاح"
      //          },
      //          "notification" : {
      //               "title" : "قسم المعلوماتية المركزي"
      //            , "body" : "تم تسجيل بياناتك بنجاح"
      //          },
      //          "priority" : "high"
      //       }
      //    },
      //    function (error, response, body) {
      //       if (!error && response.statusCode == 200) {
      //             console.log(body);
      //       }
      //    }
      // );

      res.json({error : null , state : true})
      

        
   }).catch(err => {
      res.json({error : err , state : false})
   })
}

exports.checkUserAuh = (req,res , next) => {
   const username = req.body.username;
   const password = req.body.password;
   checkEmployerAuth(username,password).then(resp => {
      res.json(resp)
   }).catch(err => {
      res.json({'error' : e.message , 'message' : null , data : null})
   })
   

   
}


exports.getInfoRowController = (req,res,next) => {
   const id = req.eid;
   const name = req.uname;
   const dir = req.dir
 
   getInfoRowEmp(name,id,dir)
   .then(resp => {
     res.json({error : null , users : resp})
   })
   .catch(err => {
     console.log(err)
     res.json({error : err , users : []})
   })
 
 
 }


 exports.getAllNotifications = (req,res,next) => {
   const uid = req.dir
 
   getNotificatios(uid)
   .then(resp => {
     res.json({error : null , notifications : resp})
   })
   .catch(err => {
     console.log(err)
     res.json({error : err , notifications : []})
   })
 
 
 }



