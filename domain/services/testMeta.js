const meta = require('./MetaAPISvc')

let adsID = "1452505672001137"
meta.updateAdDetails(adsID, "video")
.then(result => {
        console.log("the error is ", result.error)
        
        if(!result.error){
            console.log("the profile pict " + result.profilePict)
            console.log("the creative URL is " + result.URLCreative)
            
        } else {
            console.log(result.message)
        }
    
})
.catch(error => console.log(error))


