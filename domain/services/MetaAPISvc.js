//const fs = require('fs');
const AdsDetailsEntity = require('../../domain/entity/AdsDetailsEntity')
const adsDetails = require('../../domain/models/AdsDetailsModel')
const fanPagesModel = require('../../domain/models/FanPagesModel')
const fanPagesEntity =  require('../../domain/entity/FanPagesEntity')
const anunciosGuardadosModel = require('../../domain/models/AnunciosGuardadosModel');
const { AnunciosGuardados } = require('../../model');
const axios = require('axios');

const errorStruct = require('../../domain/entity/ErrorStructure')

var MetaApiSvc = {}

MetaApiSvc.saveAdDetails = async function(AdsID){
  let url = "https://www.facebook.com/ads/archive/render_ad/?id="
  let access_token = "EAAZAgc6ROP6cBO5r0TxofXmOnZAamJvh89oZAIRIpgHBOQ7eLW3aH0kHLp16NZAmQs7x27NrUtUHALNHLUZAcPvumRQRm1XIyBTKM1Guz0Y9dnzgqDKkfMZBZB6NTtHIg0FGL42ANzcJUuFMbvg9CZCbJXFpJrjpbGZBZBnfRnUMfABLekAxfM7dMfyPpF3gA05mXWctBs3X9OHloiyXDA"  
  let error = new errorStruct
  let response = {}
  response.error = false

axios.get(`${url}${AdsID}&access_token=${access_token}`)
  .then(response => {

    let body = response.data
    //fs.writeFileSync('response.html', body);
    
    
    try {
      //const data = fs.readFileSync('response.html', 'utf8');
      //console.log('File content:', data);

      // se extra el json que empieza por s.handle del body de la respuesta
        var myHugeJSON = extractJsonData(body)
        //console.log("myHugeJSON is " + myHugeJSON)
        //fs.writeFileSync('hugeJsonValid.json', myHugeJSON)

        if(myHugeJSON === 'error'){
          throw new Error(`No se encontró inicio de cadena s.handle`);
        }
        
        //intentar parsear el json
        try {
          const jsonObject = JSON.parse(myHugeJSON);
          // get the adDetails keys
          var AdsDetailsKeys = {}
          //initizalizing  AdsDetailsKeys keys
            AdsDetailsKeys.originalHTML = ""
            AdsDetailsKeys.hugeJson = ""
            AdsDetailsKeys.startDate = ""
            AdsDetailsKeys.endDate= ""
            AdsDetailsKeys.impressionsText= ""
            AdsDetailsKeys.reachEstimate= ""
            AdsDetailsKeys.spend= ""
            AdsDetailsKeys.currency= ""
            AdsDetailsKeys.caption= ""
            AdsDetailsKeys.title= ""
            AdsDetailsKeys.__html= ""
            AdsDetailsKeys.publisherPlatform= ""
            AdsDetailsKeys.cta_text= ""
            AdsDetailsKeys.cta_type= ""
            AdsDetailsKeys.extra_images= ""
            AdsDetailsKeys.extra_links= ""
            AdsDetailsKeys.link_description= ""
            AdsDetailsKeys.extra_videos= ""
            AdsDetailsKeys.display_format= ""
            AdsDetailsKeys.link_url= ""
            AdsDetailsKeys.video_hd_url= ""
            AdsDetailsKeys.video_sd_url= ""
            creation_time= ""

           //initizalizing fanpages empty object
          var FanPagesKeys = {}

            FanPagesKeys.pageID = ""
            FanPagesKeys.pageName= ""
            FanPagesKeys.page_profile_picture_url= ""
            FanPagesKeys.page_categories= ""
            FanPagesKeys.current_page_name= ""
            FanPagesKeys.page_profile_uri= ""
            


            


            // fill the object AdsDetailsKeys
            for (var key in AdsDetailsKeys) {
              if (AdsDetailsKeys.hasOwnProperty(key)) {
               AdsDetailsKeys[key] =findKeyInNestedJson(jsonObject, key)
               
              }
            }

            //create an instance of AdsDetailsEntity
            var newAdsDetailsObj = new AdsDetailsEntity

            // store all the values in the new object
            for (var key in AdsDetailsKeys) {
              if (AdsDetailsKeys.hasOwnProperty(key)) {

                //detect if the value is an array
                if (Array.isArray(AdsDetailsKeys[key])) {
                  //convert it into CSV value string
                  AdsDetailsKeys[key] = AdsDetailsKeys[key].map(item => `"${item}"`).join(', ');
                }                

               newAdsDetailsObj[key] = AdsDetailsKeys[key]
               console.log(newAdsDetailsObj[key])
              }
            }
            
            newAdsDetailsObj.originalHTML = body
            newAdsDetailsObj.hugeJson = myHugeJSON
             
            //save the data
            saveAdDetails(newAdsDetailsObj)
            .then(result => 
              
              //actualiza el registro en la tabla Anuncios Guardardos  
              anunciosGuardadosModel.updateAdDetails(AdsID, result.ID_AdDetails)

              )
            .catch(error => console.log(error))            
          
            //adding the new record in FanPages table
            
            // fill the object FanPagesKeys
            for (var key in FanPagesKeys) {
              if (FanPagesKeys.hasOwnProperty(key)) {
                if(key === 'page_categories'){
                  //since page_categories is a json we converted into a string before saving in db
                  FanPagesKeys[key]=JSON.stringify(findKeyInNestedJson(jsonObject, key))  
                } else{
                  FanPagesKeys[key] =findKeyInNestedJson(jsonObject, key)
                }
                
                console.log(`FanPagesKeys[key] ${key} is `, FanPagesKeys[key])
              }
            }           

            //create an instance of fanPagesEntity
            var newFanPagesObj = new fanPagesEntity

            // store all the values in the new object
            for (var key in FanPagesKeys) {
              if (FanPagesKeys.hasOwnProperty(key)) {

                newFanPagesObj[key] = FanPagesKeys[key]
                console.log("newFanPagesObj[key] is ", newFanPagesObj[key])
              }
            }


            // traer el anuncio que corresponde a esta fan page  
            getAd(AdsID)
            .then(response => {
              
              newFanPagesObj.FK_ID_SavedAd = response.ID_SavedAd

              //save data in FanPages Table
              saveFanPages(newFanPagesObj)
              .then(result => 
                
                console.log("result fanpage is ", result)
  
                )
              .catch(error => {
                response.error = true
                response.message = 'Error Saving Fan Page ' + error
                return response  
                  
              })                
  
            })
            .catch(error => {
              // Handle errors
              console.error('Error fetching Anuncios Guardados data:', error);
              response.error = true
              response.message = 'Error fetching Anuncios Guardados data:' + error
              return response  
            });
            
            
            

            

          
          //var targetKey = "publisherPlatform"
          //findKeyInNestedJson(jsonObject, targetKey)
          
        } catch (error) {
          console.error('Error parsing JSON:', error);
          response.error = true
          response.message = 'Error parsing JSON:' + error
          return response          
        }        

        //end getting html body
      } catch (err) {
        console.error('Error reading the html body:', err);
        response.error = true
        response.message = 'Error reading the html body:' + err
        return response
      }

      
  })
  .catch(error => {
    console.error('Fetch error:', error);
    response.error = true
    response.message = 'Fetch error:' + error
    
    
  });

  return response

}
// end saveAdDetails

async function getAd(LibraryID){
  let myAd = await anunciosGuardadosModel.getAdsByLibraryID(LibraryID)
  return myAd
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





  function iterateNestedKeysIterative(obj) {
    const stack = [{ obj, parentKey: '' }];
  
    while (stack.length > 0) {
      const { obj, parentKey } = stack.pop();
  
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const currentKey = parentKey ? `${parentKey}.${key}` : key;
  
          if (typeof obj[key] === 'object') {
            stack.push({ obj: obj[key], parentKey: currentKey });
          } else {
            console.log(currentKey, obj[key]);
          }
        }
      }
    }
  }


// save to AdsDetails table
async function saveAdDetails(AdsDetails){
    let response = {}
    response.message =""
    response.error = false
    response.ID_AdDetails = null
  try{

        // save the data to adsdetails
        let resultSave = await adsDetails.store(AdsDetails)
        response.ID_AdDetails = resultSave.dataValues.ID_AdDetails
        console.log("el nuevo id del nuevo regisgro en AdsDetails es ", response.ID_AdDetails ) 
        response.message = "Se ha creado el registro con exito.";
        response.data = resultSave;

  } catch(error){
    response.message = "Error al guardar: " +  error.message
    response.error = true
    console.log("Error saving AdDetails" + error)
  }
  return response
}

// save to Fanpage table
async function saveFanPages(FanpagesData){
    let response = {}
    response.message =""
    response.error = false
    
  try{

        // save the data to adsdetails
        let resultSave = await fanPagesModel.store(FanpagesData)  //adsDetails.store(AdsDetails)
        
        response.message = "Se ha creado el registro FanPages con exito.";
        response.data = resultSave;

  } catch(error){
    response.message = "Error al guardar fanpage: " +  error.message
    response.error = true
    console.log("Error saving FanPages" + error)
  }
  return response
}

/*
 Get the updated URL for creative and page profile picture
*/
MetaApiSvc.updateAdDetails = async function(AdsID, media){
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
  
  response.message = ""
  response.profilePict = URLs.profilePict
  response.URLCreative = URLs.creative    

 } catch(error){
   response.error = true
   response.message = "Error: No se puede renovar la url " 

 }

 return response

}



module.exports = MetaApiSvc