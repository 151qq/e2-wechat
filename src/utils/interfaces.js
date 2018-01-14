const platform = "/e2-mobile-api/";

export default{

  interfaces: {
    saveUserInfo: platform + 'mobile/user/saveUserInfo.json',
    userInfoGet: platform + 'mobile/user/getEnterpriseUserInfo.json',
    corpWechatRedirectUrl: platform + 'corpWechatRedirectUrl.json',
    getCorpWechatUserInfo: platform + 'mobile/user/checkUser.json',
    sentSms: platform + 'customer/sentSms.json',
    getSignature: platform + 'getSignature.json',
    selectUserInfoOfPage: platform + 'mobile/user/selectUserInfoOfPage.json',
    allRole: platform + 'mobile/authorize/allRole.json',
    authorizeUserRole: platform + 'mobile/authorize/authorizeUserRole.json',
    delectUserRole: platform + 'mobile/authorize/delectUserRole.json',
    sendUserRoleMsg: platform + 'mobile/authorize/sendUserRoleMsg.json',
    
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
    selectLog: platform + 'log/selectLog.json',
    selectOutBandWork1: platform + 'outBandWork/selectOutBandWork1.json',

    selectAllTagDef: platform + 'tagDef/selectAllTagDef.json',

    /**
    * 预约 get
    */
    selectByReceptionCode: platform + 'reserveInfo/selectByReceptionCode.json',
    insertReserveInfo: platform + 'reserveInfo/insertReserveInfo.json',
    selectAll: platform + 'reserveInfo/selectAll.json',
    listResponseReserveInfo: platform + 'reserveInfo/listResponseReserveInfo.json',

    /**
    * 任务 get
    */
    getPendingTasks: platform + 'mobile/task/getPendingTasks.json',
    getSendedTasks: platform + 'mobile/task/getSendedTasks.json',
    getTask: platform + 'mobile/task/getTask.json',
    saveTask: platform + 'mobile/task/saveTask.json',
    sendTask: platform + 'mobile/task/sendTask.json',
    getTaskReports: platform + 'mobile/task/getTaskReports.json',
    saveTaskReport: platform + 'mobile/task/saveTaskReport.json',
    deleteTaskReport: platform + 'mobile/task/deleteTaskReport.json',
    getTaskPageEdit: platform + 'mobile/task/getTaskPageEdit.json',
    saveTaskPageEdit: platform + 'mobile/task/saveTaskPageEdit.json',
    delPageEdit: platform + 'mobile/task/delPageEdit.json',
    getPageScenario: platform + 'mobile/task/getPageScenario.json',

    saveTaskReportComment: platform + 'mobile/task/saveTaskReportComment.json',

    /**
    * 附件 get
    */
    getAttachments: platform + 'mobile/attachment/attachmentList.json'
  }
}
