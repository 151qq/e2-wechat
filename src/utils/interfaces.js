const platform = "/e2-mobile-api/";

export default{

  interfaces: {
    saveUserInfo: platform + 'mobile/user/saveUserInfo.json',
    userInfoGet: platform + 'mobile/user/userInfoGet.json',
    corpWechatRedirectUrl: platform + 'corpWechatRedirectUrl.json',
    getCorpWechatUserInfo: platform + 'getCorpWechatUserInfo.json',
    
    html5PageList: platform + 'html5PageList.json',
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


    couponInfoList: platform + 'coupon/couponInfoList.json',
    couponInfoGet: platform + 'coupon/couponInfoGet.json',
    couponInfoChangeStatus: platform + 'coupon/couponInfoChangeStatus.json',
    getCouponType: platform + 'coupon/getCouponType.json'
  }
}
