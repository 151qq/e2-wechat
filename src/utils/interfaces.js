const platform = "/e2-mobile-api/";

export default{

  interfaces: {
    saveUserInfo: platform + 'mobile/user/saveUserInfo.json',
    userInfoGet: platform + 'mobile/user/getEnterpriseUserInfo.json',
    corpWechatRedirectUrl: platform + 'corpWechatRedirectUrl.json',
    getCorpWechatUserInfo: platform + 'mobile/user/checkUser.json',
    sentSms: platform + 'customer/sentSms.json',
    getSignature: platform + 'getSignature.json',
    
    html5PageList: platform + 'html5PageList.json',
    html5PageGet: platform + 'html5PageGet.json',
    listPageArea: platform + 'listPageArea.json',
    getTemplates: platform +'htmlPageTemplate/templateListPage.json',
    pageAndHtml5: platform + 'productPage/selectHtml5PageAndHtml5PageTemplateCode.json',
    /**
    * 我的素材库 get
    */
    listPage: platform + 'material/listPage.json',
    /**
    * 产品树 get
    */
    pruductCatalogList: platform + 'product/productCatalogList.json',
    productInfoGet: platform + 'product/productInfoGet.json',
    productScenarioList: platform + 'product/productScenarioList.json',
    getProductScenario: platform + 'product/getProductScenario.json',
    productParameterList: platform + 'product/productParameterList.json',
    productAlbumList: platform + 'product/productAlbums.json',
    getProductType: platform + 'product/getProductType.json',
    productInfoList: platform + 'product/productInfoList.json',

    /**
    * 营销树 get
    */
    eventInfoList: platform + 'event/eventInfoList.json',
    eventInfoGet: platform + 'event/eventInfoGet.json',
    eventInfoChangeStatus: platform + 'event/eventInfoChangeStatus.json',
    eventProductList: platform + 'event/eventProductList.json',
    publistEvent: platform + 'event/eventInfoChangeStatusAndCreateCoupon.json',
    stopEvent: platform + 'event/stopEvent.json',


    couponInfoList: platform + 'coupon/couponInfoList.json',
    couponInfoGet: platform + 'coupon/couponInfoGet.json',
    couponInfoChangeStatus: platform + 'coupon/couponInfoChangeStatus.json',
    getCouponType: platform + 'coupon/getCouponType.json',

    /**
    * 外呼 get
    */
    outBandWorkList: platform + 'outBandWork/list.json',
    selectOutBandWork: platform + 'outBandWork/selectOutBandWork.json',
    outBandWorkMange: platform + 'outBandWork/mange.json',
    selectOutBandWorkDetails: platform + 'outBandWork/selectOutBandWorkDetails.json',
    selectOutBandWork: platform + 'outBandWork/selectOutBandWork.json',
    mangeReady: platform + 'outBandWork/mangeReady.json',
    selectLog: platform + 'log/selectLog.json'
  }
}
