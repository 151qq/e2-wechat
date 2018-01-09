<template>
    <section class="case-target">
        <div class="weui-cells__title">基本信息</div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">券标题</div>
                <div class="weui-cell__ft">{{base.couponTitle}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">券类型</div>
                <div class="weui-cell__ft">{{base.couponTypeName}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">使用场景</div>
                <div class="weui-cell__ft">{{base.couponScenarioName}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">有效期</div>
                <div class="weui-cell__ft">{{couponTimes}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">发行数量</div>
                <div class="weui-cell__ft">{{base.couponQuantity}}</div>
            </div>
            <template v-if="base.couponType == 'CASH'">
                <div class="weui-cell weui-cell_access show-message-box">
                    <div class="weui-cell__bd">消费要求</div>
                    <div class="weui-cell__ft">{{base.couponLeastCost}}</div>
                </div>
                <div class="weui-cell weui-cell_access show-message-box">
                    <div class="weui-cell__bd">抵扣</div>
                    <div class="weui-cell__ft">{{base.couponReduceCost}}</div>
                </div>
            </template>
        </div>
        <div class="weui-cells__title">使用说明</div>
        <div class="wx-area-text">
            {{base.couponDescription}}
        </div>
        <div class="weui-cells__title">相关产品</div>
        <div class="weui-cells">
            <router-link class="weui-media-box weui-media-box_appmsg"
                    v-for="(item, index) in productList"
                    :to="{name: 'product-article', query: {
                        enterpriseCode: item.enterpriseCode,
                        catalogCode: item.productCode
                    }}">
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb" :src="item.productCover">
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{item.productCname}}</h4>
                    <p class="weui-media-box__desc">{{item.productDesc}}</p>
                </div>
            </router-link>
        </div>
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
            productList: []
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

                    this.getProductList(res.result.result.couponProductArray)
                    this.couponTimes = this.formDataDate(result.couponBeginTimestamp, result.couponEndTimestamp)
                    this.base = result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getProductList (codes) {
            var formData = {
                productCodes: codes.join(',')
            }

            util.request({
                method: 'get',
                interface: 'eventProductList',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.productList = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        formDataDate (begin, end) {
            var beginTime = util.formDataDate(begin)
            var endTime = util.formDataDate(end)

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