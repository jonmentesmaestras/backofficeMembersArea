const model = require('./../../model');

var execute = {};

/**
 * Crear un nuevo registro de Issues and Suggestion
 * @param AdsDetailsEntity
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
execute.store = async function (AdsDetailsEntity) {
    return await model.AdsDetails.create({

        ID_AdDetails: null,
          originalHTML: AdsDetailsEntity.originalHTML,
            hugeJson: AdsDetailsEntity.hugeJson,
            startDate: AdsDetailsEntity.startDate,
            endDate: AdsDetailsEntity.endDate,
            impressionsText: AdsDetailsEntity.impressionsText,
            reachEstimate: AdsDetailsEntity.reachEstimate,
            spend: AdsDetailsEntity.spend,
            currency: AdsDetailsEntity.currency,
            caption: AdsDetailsEntity.caption,
            title: AdsDetailsEntity.title,
            __html: AdsDetailsEntity.__html,
            publisherPlatform: AdsDetailsEntity.publisherPlatform,
            cta_text: AdsDetailsEntity.cta_text,
            cta_type: AdsDetailsEntity.cta_type,
            extra_images: AdsDetailsEntity.extra_images,
            extra_links: AdsDetailsEntity.extra_links,
            link_description: AdsDetailsEntity.link_description,
            extra_videos: AdsDetailsEntity.extra_videos,
            display_format: AdsDetailsEntity.display_format,
            link_url: AdsDetailsEntity.link_url,
            video_hd_url: AdsDetailsEntity.video_hd_url,
            video_sd_url: AdsDetailsEntity.video_sd_url,
            creation_time: AdsDetailsEntity.creation_time
        

    });
}



module.exports = execute