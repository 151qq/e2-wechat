<template>
    <section class="user-trace-list">
        <template v-for="(item, index) in dataList">
            <div class="wx-area-line" v-if="index"></div>
            <div class="weui-cells no-margin">
                <a class="weui-media-box weui-media-box_appmsg">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb"
                            v-if="item.memberWechatImg"
                            :src="item.memberWechatImg">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">
                            {{item.memberName ? item.memberName : item.customerCode}}
                        </h4>
                        <p class="color999">{{item.spreadCreateTime.split(' ')[0]}}</p>
                    </div>
                </a>
            </div>
            <div class="weui-cells no-margin">
                <div class="weui-cell weui-cell_access">
                    <div class="weui-cell__bd">{{item.sharaDesc}}</div>
                </div>
            </div>
        </template>
        <template v-if="parentspread.channelName">
            <div class="wx-area-line"></div>
            <div class="weui-cells no-margin">
                <a class="weui-media-box weui-media-box_appmsg">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb"
                            v-if="parentspread.channelImage"
                            :src="parentspread.channelImage">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{parentspread.channelName}}</h4>
                    </div>
                </a>
            </div>
            <div class="weui-cells no-margin">
                <div class="weui-cell weui-cell_access">
                    <div class="weui-cell__bd">{{parentspread.sharaDesc}}</div>
                </div>
            </div>
        </template>

        <template v-if="parentspread.userName">
            <div class="wx-area-line"></div>
            <div class="weui-cells no-margin">
                <a class="weui-media-box weui-media-box_appmsg">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb"
                            v-if="parentspread.userImage"
                            :src="parentspread.userImage">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{parentspread.userName}}</h4>
                    </div>
                </a>
            </div>
            <div class="weui-cells no-margin">
                <div class="weui-cell weui-cell_access">
                    <div class="weui-cell__bd">企业员工分享</div>
                </div>
            </div>
        </template>
        
    </section>
</template>
<script>
import util from '../../utils/tools'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            dataList: [],
            parentspread: {}
        }
    },
    mounted () {
        this.getList()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    methods: {
        getList () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                spreadCode: this.$route.query.spreadCode
            }

            util.request({
                method: 'get',
                interface: 'getTraceParentSpread',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.dataList = res.result.result.chilrenspread
                    this.parentspread = res.result.result.parentspread
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    }
}
</script>