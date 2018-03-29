<template>
    <section class="case-target">
        <div class="height-1"></div>
        <div class="weui-cells no-margin">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">券标题</label></div>
                <div class="weui-cell__bd">{{base.couponTitle}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">券类型</label></div>
                <div class="weui-cell__bd">{{base.couponTypeName}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">使用场景</label></div>
                <div class="weui-cell__bd">{{base.couponGroupScenarioName}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">有效期</label></div>
                <div class="weui-cell__bd">{{couponTimes}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">发行数量</label></div>
                <div class="weui-cell__bd">{{base.couponQuantity}}</div>
            </div>
            <template v-if="base.couponType == 'cashCoupon'">
                <div class="weui-cell weui-cell_access show-message-box">
                    <div class="weui-cell__hd"><label class="weui-label">消费要求</label></div>
                    <div class="weui-cell__bd">{{base.couponLeastCost}}</div>
                </div>
                <div class="weui-cell weui-cell_access show-message-box">
                    <div class="weui-cell__hd"><label class="weui-label">抵扣</label></div>
                    <div class="weui-cell__bd">{{base.couponReduceCost}}</div>
                </div>
            </template>
        </div>

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line">
            <div class="weui-cell weui-cell_access no-center">
                <div class="weui-cell__hd"><label class="weui-label">优惠说明</label></div>
                <div class="weui-cell__bd">
                   {{base.couponDescription}}
                </div>
            </div>       
        </div>
        
        <template v-if="couponData.viewCnt !== ''">
            <div class="wx-area-line"></div>
            <div class="weui-cells no-margin">
                <div class="weui-cell weui-cell_access show-message-box">
                    <div class="weui-cell__hd"><label class="weui-label">浏览次数</label></div>
                    <div class="weui-cell__bd">{{couponData.viewCnt}}</div>
                </div>
                <div class="weui-cell weui-cell_access show-message-box">
                    <div class="weui-cell__hd"><label class="weui-label">浏览人数</label></div>
                    <div class="weui-cell__bd">{{couponData.viewUser}}</div>
                </div>
                <div class="weui-cell weui-cell_access show-message-box">
                    <div class="weui-cell__hd"><label class="weui-label">领取次数</label></div>
                    <div class="weui-cell__bd">{{couponData.receiveCnt}}</div>
                </div>
                <div class="weui-cell weui-cell_access show-message-box">
                    <div class="weui-cell__hd"><label class="weui-label">领取人数</label></div>
                    <div class="weui-cell__bd">{{couponData.receiveUser}}</div>
                </div>
                <div class="weui-cell weui-cell_access show-message-box">
                    <div class="weui-cell__hd"><label class="weui-label">使用次数</label></div>
                    <div class="weui-cell__bd">{{couponData.verifyCnt}}</div>
                </div>
                <div class="weui-cell weui-cell_access show-message-box">
                    <div class="weui-cell__hd"><label class="weui-label">使用人数</label></div>
                    <div class="weui-cell__bd">{{couponData.verifyUser}}</div>
                </div>
                <div class="weui-cell weui-cell_access show-message-box">
                    <div class="weui-cell__hd"><label class="weui-label">转赠次数</label></div>
                    <div class="weui-cell__bd">{{couponData.givenCnt}}</div>
                </div>
                <div class="weui-cell weui-cell_access show-message-box">
                    <div class="weui-cell__hd"><label class="weui-label">转赠人数</label></div>
                    <div class="weui-cell__bd">{{couponData.givenUser}}</div>
                </div>
                <div class="weui-cell weui-cell_access show-message-box">
                    <div class="weui-cell__hd"><label class="weui-label">过期次数</label></div>
                    <div class="weui-cell__bd">{{couponData.expireCnt}}</div>
                </div>
                <div class="weui-cell weui-cell_access show-message-box">
                    <div class="weui-cell__hd"><label class="weui-label">过期人数</label></div>
                    <div class="weui-cell__bd">{{couponData.expireUser}}</div>
                </div>
            </div>
        </template>
    </section>
</template>
<script>
import imgList from '../common/imgList.vue'
import util from '../../utils/tools'

export default {
    data () {
        return {
            couponTimes: '',
            base: {
                couponTypeName: '',
                couponScenarioName: '',
                couponCode: '',
                couponColor: '',
                couponBeginTimestamp: '',
                couponEndTimestamp: '',
                couponType: '',
                couponNotice: '',
                couponDescription: '',
                couponStatus: '',
                couponIconUrl: '',
                couponTitle: '',
                couponAbstract: '',
                couponExchangeTxt: '',
                couponQuantity: '',
                couponRealInventory: '',
                eventCode: '',
                enterpriseCode: '',
                couponScenario: '',
                couponBtnTitle: '',
                couponBtnSubTitle: '',
                couponBtnUrl: '',
                couponEcommerceUrlName: '',
                couponEcommerceUrlSubTitle: '',
                couponTransferOpt: '',
                couponGetLimit: '',
                couponUseLimit: '',
                couponDetailImg: '',
                couponDetailTxt: '',
                couponGiftCode: '',
                couponDiscount: '',
                couponLeastCost: '',
                couponReduceCost: ''
            },
            couponData: {
                viewCnt: '',
                viewUser: '', 
                receiveCnt: '', 
                receiveUser: '', 
                verifyCnt: '', 
                verifyUser: '', 
                givenCnt: '', 
                givenUser: '', 
                expireCnt: '', 
                expireUser: ''
            }
        }
    },
    mounted () {
        this.getBase()
    },
    methods: {
        getBase () {
            var formData = {
                couponCode: this.$route.query.couponCode
            }

            util.request({
                method: 'get',
                interface: 'couponInfoGet',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    var result = res.result.result.couponInfo

                    this.couponTimes = this.formDataDate(result.couponGroupBeginTimestamp, result.couponGroupEndTimestamp)
                    
                    this.base = result

                    if (result.couponStatus == '4' || result.couponStatus == '5') {
                        this.getDatas()
                    }
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getDatas () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                couponCode: this.$route.query.couponCode
            }

            util.request({
                method: 'get',
                interface: 'getWechatCardInfomation',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.couponData = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        formDataDate (begin, end) {
            var beginTime = util.formDataDate(begin * 1000)
            var endTime = util.formDataDate(end * 1000)

            return beginTime + ' - ' + endTime
        }
    },
    components: {
        imgList
    }
}
</script>
<style lang="scss">
</style>