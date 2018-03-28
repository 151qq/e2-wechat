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
    getEnterpriseLogo: platform + 'getEnterpriseLogo.json',
    getUserIds: platform + 'mobile/user/getUserIds.json',
    
    html5PageList: platform + 'html5/html5PageList.json',
    html5PageGet: platform + 'html5/html5PageGet.json',
    mobileHtml5PageGet: platform + 'html5/mobileHtml5PageGet.json',
    listPageArea: platform + 'listPageArea.json',
    getTemplates: platform +'htmlPageTemplate/templateListPage.json',
    pageAndHtml5: platform + 'productPage/selectHtml5PageAndHtml5PageTemplateCode.json',
    html5PageRefuseSubmit: platform + 'html5/html5PageRefuseSubmit.json',
    pageLogList: platform + 'htmlPageLog/pageLogList.json',
    html5PageSubmit: platform + 'html5/html5PageSubmit.json',
    getTraceParentSpread: platform + 'mobile/adChannel/getTraceParentSpread.json',
    commentList: platform + 'comment/commentList.json',
    deleteComment: platform + 'comment/deleteComment.json',
    undercarriagePage: platform + 'html5/undercarriagePage.json',
    manageComment: platform + 'html5/manageComment.json',
    ediltExtendsPage: platform + 'html5/ediltExtendsPage.json',
    getExtendPages: platform + 'html5/getExtendPages.json',
    replyComment: platform + 'comment/replyComment.json',
    listPageAttachment: platform + 'html5/listPageAttachment.json',

    getUserByRoleCodes: platform + 'mobile/user/getUserByRoleCodes.json',
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
    publishEvent: platform + 'event/eventInfoChangeStatusAndCreateCoupon.json',
    stopEvent: platform + 'event/stopEvent.json',

    couponGroupList: platform + 'couponGroup/couponGroupList.json',
    couponInfoList: platform + 'coupon/couponInfoList.json',
    couponInfoGet: platform + 'coupon/couponInfoGet.json',
    couponInfoChangeStatus: platform + 'coupon/couponInfoChangeStatus.json',
    getCouponType: platform + 'coupon/getCouponType.json',
    couponGroupOfPage: platform + 'couponGroup/couponGroupOfPage.json',

    remindUserToPublishEvent: platform + 'event/remindUserToPublishEvent.json',

    /**
    * 外呼 get
    */
    outBandMemberInfo: platform + 'outBandWork/outBandMemberInfo.json',
    outBandMemberList: platform + 'outBandWork/outBandMemberList.json',
    outBandMemberLogs: platform + 'outBandWork/outBandMemberLogs.json',
    outBandWorkList: platform + 'outBandWork/list.json',
    selectOutBandWork: platform + 'outBandWork/selectOutBandWork.json',
    outBandWorkMange: platform + 'outBandWork/reportOutBand.json',
    selectOutBandWorkDetails: platform + 'outBandWork/selectOutBandWorkDetails.json',
    mangeReady: platform + 'outBandWork/mangeReady.json',
    selectLog: platform + 'outBandWork/selectLog.json',
    selectOutBandWork1: platform + 'outBandWork/selectOutBandWork1.json',

    getCountDetails: platform + 'pipelineInfo/thePipelineCountDetails.json',
    selectAllTagDef: platform + 'tagDef/selectAllTagDef.json',
    tuiSelect: platform + 'outBandWork/select.json',
    getDetails: platform + 'outBandWork/details.json',

    /**
    * 预约 get
    */
    selectByReceptionCode: platform + 'reserveInfo/selectByReceptionCode.json',
    insertReserveInfo: platform + 'reserveInfo/insertReserveInfo.json',
    selectAll: platform + 'reserveInfo/selectAll.json',
    listResponseReserveInfo: platform + 'reserveInfo/listResponseReserveInfo.json',
    updateResponseReserveInfo: platform + 'reserveInfo/updateResponseReserveInfo.json',
    getReserveTypes: platform + 'reserveInfo/getReserveTypes.json',
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
    changeTaskStatus: platform + 'mobile/task/changeTaskStatus.json',

    saveTaskReportComment: platform + 'mobile/task/saveTaskReportComment.json',
    getTaskSenderAndReceivers: platform + 'mobile/task/getTaskSenderAndReceivers.json',

    /**
    * 附件 get
    */
    getAttachments: platform + 'mobile/attachment/attachmentList.json',

    /**
    * 推广 get
    */
    getChannels: platform + 'organizePromoterInfo/selectMemberInfoByEnterpriseCode.json',
    getChannelInfo: platform + 'organizePromoterInfo/selectOrganizePromoterInfo.json',
    deleteChannel: platform + 'organizePromoterInfo/deleteOrganizePromoterInfo.json',
    getPromoterAccuntType: platform + 'organizePromoterInfo/getPromoterAccuntType.json',
    updateChannel: platform + 'organizePromoterInfo/manageOrganizePromoterInfo.json',
    updateChannelStatus: platform + 'organizePromoterInfo/updateOrganizePromoterInfoOfAdChannelStatus.json',

    /**
    * 地推 get
    */
    partyInfoList: platform + 'partyInfo/partyInfoList.json',
    savePartyInfo: platform + 'partyInfo/savePartyInfo.json',
    sendParyMessage: platform + 'partyInfo/theSaveStatus.json',
    updatePratyInfo: platform + 'partyInfo/updatePratyInfo.json',
    updateStatus: platform + 'partyInfo/updateStatus.json',
    reviewList: platform + 'partyInfo/reviewList.json',
    reviewInsertImage: platform + 'partyInfo/reviewInsertImage.json',
    partyAttendee: platform + 'partyInfo/partyAttendee.json',
    partyLocal: platform + 'partyInfo/partyLocal.json',
    reviewList: platform + 'partyInfo/reviewList.json',
    partyShowList: platform + 'partyInfo/partyShowList.json',
    savePartyShow: platform + 'partyInfo/savePartyShow.json',
    /**
    * 营销分析 get
    */
    articleAnalyse: platform + 'html5/html5PageMessage.json',
    outBandAnalyse: platform + 'outBandWork/selectOutBandWorkDetails.json',
    surveyAnalyse: platform + 'surveyRecord/selectSurveyRecord.json',
    channelAnalyse: platform + 'mobile/adChannel/selectDetails.json',
    couponAnalyse: platform + 'couponDataAnalyse/getALLCouponData.json'
  }
}
