<template>
    <section class="member-detail-box">
        <div class="height-1"></div>
        <div class="weui-cells no-margin">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">外呼结果</label></div>
                <div class="weui-cell__bd">{{base.outbandResult}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">外呼方式</label></div>
                <div class="weui-cell__bd">{{base.outbandRealType}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">外呼时间</label></div>
                <div class="weui-cell__bd">{{base.outbandRealTime.split(' ')[0]}}</div>
            </div>
        </div>

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line">
            <div class="weui-cell weui-cell_access no-center">
                <div class="weui-cell__hd"><label class="weui-label">外呼备忘</label></div>
                <div class="weui-cell__bd">
                   {{base.outbandMemo}}
                </div>
            </div>       
        </div>

        <template v-if="base.imgData.length">
            <div class="wx-area-line"></div>
            <div class="weui-cells no-margin no-line">
                <div class="weui-cell weui-cell_access">
                    <div class="weui-cell__hd"><label class="weui-label">附加图片</label></div>
                    <div class="weui-cell__bd wx-placeholder">
                       选择{{base.imgData.length}}张图片
                    </div>
                    <div class="weui-cell__ft"></div>
                </div>
            </div>

            <div class="weui-cells no-margin left-padding">
                <img-list :img-list="base.imgData"></img-list>
            </div>
        </template>
    </section>
</template>
<script>
import util from '../../utils/tools'
import imgList from '../common/imgList.vue'

export default {
    data () {
        return {
            base: {
                outbandResult: '',
                outbandRealType: '',
                outbandRealTime: '',
                outbandMemo: '',
                imgData: []
            }
        }
    },
    mounted () {
        this.getData()
    },
    methods: {
        getData () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                outbandWorkCode: this.$route.query.outbandWorkCode
            }

            util.request({
                method: 'get',
                interface: 'selectOutBandWork',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.base = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    },
    components: {
        imgList
    }
}
</script>