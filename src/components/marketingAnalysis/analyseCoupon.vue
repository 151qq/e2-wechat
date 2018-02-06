<template>
    <section class="party-list-box page__bd"
             v-scroll-load="{showMore:showMore, isLoad: isLoad}">
        
        <div class="height-1"></div>
        <div class="weui-cells__title">总统计信息</div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">浏览次数</div>
                <div class="weui-cell__ft">{{base.view_cnt}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">浏览人数</div>
                <div class="weui-cell__ft">{{base.view_user}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">领取次数</div>
                <div class="weui-cell__ft">{{base.receive_cnt}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">领取人数</div>
                <div class="weui-cell__ft">{{base.receive_user}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">使用次数</div>
                <div class="weui-cell__ft">{{base.verify_cnt}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">使用人数</div>
                <div class="weui-cell__ft">{{base.verify_user}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">转赠次数</div>
                <div class="weui-cell__ft">{{base.given_cnt}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">转赠人数</div>
                <div class="weui-cell__ft">{{base.given_user}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">过期次数</div>
                <div class="weui-cell__ft">{{base.expire_cnt}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">过期人数</div>
                <div class="weui-cell__ft">{{base.expire_user}}</div>
            </div>
        </div>

        <div class="weui-cells__title" v-if="listData.length">统计列表</div>
        
        <template v-for="(item, index) in listData">
            <div class="wx-area-line" v-if="index"></div>
            <div class="weui-cells no-margin">
                <div class="weui-cell">
                    <div class="weui-cell__hd"></div>
                    <div class="vux-cell-bd vux-cell-primary">
                        <p><label class="vux-label">{{item.pageTitle}}</label></p>
                    </div>
                </div>
                <div class="weui-cell">
                    <section class="wx-cells-box">
                        <div class="wx-cell-box">
                            <label class="wx-left-cell">发行时间</label>
                            <span class="wx-right-cell">{{item.onePageReadSum}}</span>
                        </div>
                        <div class="wx-cell-box">
                            <label class="wx-left-cell">发行场景</label>
                            <span class="wx-right-cell">{{item.pageSharetowechatfriendSum}}</span>
                        </div>
                        <div class="wx-cell-box">
                            <label class="wx-left-cell">领券总数</label>
                            <span class="wx-right-cell">{{item.shareSum}}</span>
                        </div>
                        <div class="wx-cell-box">
                            <label class="wx-left-cell">兑券总数</label>
                            <span class="wx-right-cell">{{item.onepageCommentSum}}</span>
                        </div>
                    </section>
                </div>
            </div>
        </template>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            base: {
                view_cnt: '',
                view_user: '',
                receive_cnt: '',
                receive_user: '',
                verify_cnt: '',
                verify_user: '',
                given_cnt: '',
                given_user: '',
                expire_cnt: '',
                expire_user: ''
            },
            listData: [],
            pageSize: 20,
            pageNumber: 1,
            total: 0
        }
    },
    mounted () {
        jsSdk.init()
        this.getData()
    },
    watch: {
        $route () {
            this.pageNumber = 1
            this.isPage = false
            this.getList()
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        isLoad () {
            return this.total > this.listData.length
        }
    },
    methods: {
        showMore (cb) {
            this.pageNumber++
            this.getList(cb)
        },
        getData () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode
            }

            util.request({
                method: 'get',
                interface: 'couponAnalyse',
                data: formData
            }).then(res => {
                if (res.result.success == '0') {
                    this.$message.error(res.result.message)
                    return
                }

                this.base = res.result.result
            })
        },
        getList (cb) {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode
            }

            util.request({
                method: 'get',
                interface: 'couponAnalyse',
                data: formData
            }).then(res => {
                if (res.result.success == '0') {
                    this.$message.error(res.result.message)
                    return
                }

                this.base = res.result.result
                this.total = res.result.result.countPageCode
                if (!cb) {
                    this.listData = res.result.result.htmlPageForm2
                } else {
                    this.listData = this.listData.concat(res.result.result.htmlPageForm2)
                }
            })
        }
    }
}
</script>