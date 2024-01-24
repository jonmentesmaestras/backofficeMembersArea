const model = require('../../model')
const FanPagesEntity = require('../entity/FanPagesEntity')

let newFanPageObj = new FanPagesEntity;

newFanPageObj.pageID = "894454545"

newFanPageObj.pageName = "M\u00e1s informaci\u00f3n"
newFanPageObj.page_profile_picture_url = "https://bh8906.banahosting.com:2083/cpsess1405238588/3rdparty/phpMyAdmin/index.php?route=/table/structure/save"
newFanPageObj.page_categories = "categoria"
newFanPageObj.current_page_name = "current page name" 
newFanPageObj.page_profile_uri = "page profile uri"
newFanPageObj.FK_ID_SavedAd = 8




async function addFanPage (FanPagesEntity) {
    return await model.FanPages.create({

        ID_Fanpage: null,
        pageID:FanPagesEntity.pageID,
        pageName: FanPagesEntity.pageName,
        page_profile_picture_url: FanPagesEntity.page_profile_picture_url,
        page_categories: FanPagesEntity.page_categories,
        current_page_name: FanPagesEntity.current_page_name,
        page_profile_uri: FanPagesEntity.page_profile_uri,
        FK_ID_SavedAd: FanPagesEntity.FK_ID_SavedAd        
        

    });
}

addFanPage(newFanPageObj)
.then(result => console.log(result))
.catch(error => console.log(error))