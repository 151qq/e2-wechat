<template>
    <section class="party-list-box page__bd"
             v-scroll-load="{showMore:showMore, isLoad: isLoad}">
        
        <div class="height-1"></div>
        <div class="weui-cells__title">总统计信息</div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">文章数量</div>
                <div class="weui-cell__ft">{{base.countPageCode}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">文章阅读总数</div>
                <div class="weui-cell__ft">{{base.sumPageReadSum}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">每篇文章阅读中位数</div>
                <div class="weui-cell__ft">{{base.middlePageReadSum}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">每篇文章分享中位数</div>
                <div class="weui-cell__ft">{{base.middleShareSum}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">文章评论总数</div>
                <div class="weui-cell__ft">{{base.sumPageCommentSum}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">每篇文章评论中位数</div>
                <div class="weui-cell__ft">{{base.middlePageCommentSum}}</div>
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
                            <label class="wx-left-cell">文章阅读总数</label>
                            <span class="wx-right-cell">{{item.onePageReadSum}}</span>
                        </div>
                        <div class="wx-cell-box">
                            <label class="wx-left-cell">文章分享到朋友圈总数</label>
                            <span class="wx-right-cell">{{item.pageSharetowechatfriendSum}}</span>
                        </div>
                        <div class="wx-cell-box">
                            <label class="wx-left-cell">文章分享到朋友总数</label>
                            <span class="wx-right-cell">{{item.shareSum}}</span>
                        </div>
                        <div class="wx-cell-box">
                            <label class="wx-left-cell">文章评论总数</label>
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
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            base: {
                middlePageCommentSum: '',
                middlePageReadSum: '',
                middleShareSum: '',
                sumPageCommentSum: '',
                sumPageReadSum: ''
            },
            listData: [],
            pageSize: 20,
            pageNumber: 1,
            total: 0
        }
    },
    mounted () {
        this.getList()
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
        getList (cb) {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
            }

            util.request({
                method: 'get',
                interface: 'articleAnalyse',
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