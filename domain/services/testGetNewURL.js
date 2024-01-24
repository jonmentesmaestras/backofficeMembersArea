const axios = require('axios');

//get a new URL for an advertisement
async function getNewURL(AdsID, media){
    let url = "https://www.facebook.com/ads/archive/render_ad/?id="
    let access_token = "EAAZAgc6ROP6cBO5r0TxofXmOnZAamJvh89oZAIRIpgHBOQ7eLW3aH0kHLp16NZAmQs7x27NrUtUHALNHLUZAcPvumRQRm1XIyBTKM1Guz0Y9dnzgqDKkfMZBZB6NTtHIg0FGL42ANzcJUuFMbvg9CZCbJXFpJrjpbGZBZBnfRnUMfABLekAxfM7dMfyPpF3gA05mXWctBs3X9OHloiyXDA"  
    let URLs = {}
    let response = {}
    response.error = false
    
    var keyMedia = ""
  
    if(media == 'img'){
      keyMedia = "original_image_url"
    } else {
      keyMedia = "video_hd_url"
    }
  
   var result = await axios.get(`${url}${AdsID}&access_token=${access_token}`)
   let body = result.data
   
   URLs.profilePict = ""
   URLs.creative = ""

   try{
        var myHugeJSON = extractJsonData(body)
        //console.log("myHugeJSON is " + myHugeJSON)
        //fs.writeFileSync('hugeJsonValid.json', myHugeJSON)

        if(myHugeJSON === 'error'){
        throw new Error(`No se encontró inicio de cadena s.handle`);
        }

        const jsonObject = JSON.parse(myHugeJSON);
                
        //get the new Page Profile Picture   
        URLs.profilePict = findKeyInNestedJson(jsonObject, "page_profile_picture_url")
        console.log("URL for profile picture is = " + URLs.profilePict)
    
        //get the new Creative URL
        if (media == 'img'){

            URLs.creative = findKeyInNestedJson(jsonObject, keyMedia)

        } else {
            URLs.creative = findKeyInNestedJson(jsonObject, keyMedia)
        }

    console.log("URL for adsCreative = " + URLs.creative)

    response.profilePict = URLs.profilePict
    response.URLCreative = URLs.creative    

   } catch(error){
     response.error = true
     response.message = "Error: No se puede renovar la url " 

   }
  
   return response
    
  
  }

  //get the json part of the body
  function extractJsonData(htmlBody){
    //obtener el inicio del json
    var inicio = htmlBody.indexOf("s.handle(")

    try{
      if (inicio < 0)  throw new Error(`no se encontró el inicio correcto "s.handle"`);
      //fin del json
      var fin = htmlBody.indexOf('requireLazy(["Run"],function(Run)')
      
      var hugeJson = htmlBody.substring(inicio, fin-2) 
      hugeJson = hugeJson.replace('s.handle(', '')

      return hugeJson

      } catch (error){

        return "error"
        console.error('Fetch error:', error);
      }

    
    //fs.writeFileSync('hugeJsontest.json', hugeJson);
    /*try {
      const jsonObject = JSON.parse(hugeJson);
      //console.log(jsonObject.markup[0][1].__html);
      
      var targetKey = "publisherPlatform"
      findKeyInNestedJson(jsonObject, targetKey)
      
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }*/

}


function findKeyInNestedJson(obj, targetKey) {
    const stack = [{ obj, parentKey: '' }];
  
    while (stack.length > 0) {
      const { obj, parentKey } = stack.pop();
  
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const currentKey = parentKey ? `${parentKey}.${key}` : key;
  
          if (key === targetKey) {
            // Key found, print or return the value
            //console.log(`Found key: ${currentKey}, Value: ${obj[key]}`);
            // Or you can return the value or perform further actions
            return obj[key];
          }
  
          if (typeof obj[key] === 'object') {
            stack.push({ obj: obj[key], parentKey: currentKey });
          }
        }
      }
    }
  
    // If the key is not found
    //console.log(`Key '${targetKey}' not found.`);
    return null;
  }


  getNewURL("330205319831210", "video")
  .then(result => console.log("the result is", result ) )
  .catch(error => console.log(error))
