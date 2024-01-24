const model = require('./../../model');
async function updateURLs(anuncioToUpdate, URLsUpdated){
    
    if (URLsUpdated.hasOwnProperty('AdCreative')) {  
      var updateAnunciosGuard =  await model.AnunciosGuardados.update({AdCreative: URLsUpdated.AdCreative}, {
            where: {LibraryID: anuncioToUpdate.LibraryID, FK_UserID : anuncioToUpdate.FK_UserID}
        })
    } else {

        var updateAdDetails   =  await model.AdsDetails.update({video_hd_url: URLsUpdated.video_hd_url }, {
            where: {ID_AdDetails: anuncioToUpdate.FK_ID_AdDetails}
           }) 
    }
      
   var updateFanPage = await model.FanPages.update({page_profile_picture_url: URLsUpdated.page_profile_picture_url}, {
        where: {FK_ID_SavedAd: anuncioToUpdate.ID_SavedAd}
   }) 

}

async function testUpdates(){
    var URLsUpdated = {}
    var anuncioToUpdate   =  await model.AnunciosGuardados.findOne({
        where: {LibraryID: "1544292046318390", FK_UserID: 1}
    });
    console.log("anuncioToUpdate.FK_ID_AdDetails", anuncioToUpdate.FK_ID_AdDetails)
    console.log("anuncioToUpdate.ID_SavedAd", anuncioToUpdate.ID_SavedAd)
    console.log("anuncioToUpdate.AdCreative", anuncioToUpdate.AdCreative)

    //URLsUpdated.AdCreative = "https://fb.com/image.jpg"
    URLsUpdated.video_hd_url = "https://fb.com/video.mp4"
    URLsUpdated.page_profile_picture_url = "https://fb.com/profile/image.jpg"

    updateURLs(anuncioToUpdate, URLsUpdated)
}

testUpdates()
