<template>
    <section class="party-list-box page__bd"
             v-scroll-load="{showMore:showMore, isLoad: isLoad}">
        
        <div class="height-1"></div>
        <div class="weui-cells__title">总统计信息</div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">外呼次数</div>
                <div class="weui-cell__ft">{{base.countOutBandWork}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">预约总数</div>
                <div class="weui-cell__ft">{{base.countReserveCode}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">真实体验总数</div>
                <div class="weui-cell__ft">{{base.countReallReserveCode}}</div>
            </div>
        </div>

        <div class="weui-cells__title" v-if="listData.length">统计列表</div>
        
        <template v-for="(item, index) in listData">
            <div class="wx-area-line" v-if="index"></div>
            <div class="weui-cells no-margin">
                <div class="weui-cell">
                    <div class="weui-cell__hd"></div>
                    <div class="vux-cell-bd vux-cell-primary">
                        <p><label class="vux-label">{{item.userLoginName}}</label></p>
                    </div>
                </div>
                <div class="weui-cell">
                    <section class="wx-cells-box">
                        <div class="wx-cell-box">
                            <label class="wx-left-cell">外呼次数</label>
                            <span class="wx-right-cell">{{item.oneCountOutBandWork}}</span>
                        </div>
                        <div class="wx-cell-box">
                            <label class="wx-left-cell">预约总数</label>
                            <span class="wx-right-cell">{{item.oneCountReserveCode}}</span>
                        </div>
                        <div class="wx-cell-box">
                            <label class="wx-left-cell">真实体验总数</label>
                            <span class="wx-right-cell">{{item.oneCountReallReserveCode}}</span>
                        </div>
                        <!-- <div class="wx-cell-box">
                            <label class="wx-left-cell">外呼绩效</label>
                            <span class="wx-right-cell">{{item.onepageCommentSum}}</span>
                        </div> -->
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
                countOutBandWork: '',
                countReserveCode: '',
                countReallReserveCode: ''
            },
            listData: [],
            pageSize: 20,
            pageNumber: 1,
            total: 0
        }
    },
    mounted () {
        jsSdk.init()
        this.getList()
    },
    watch: {
        $route () {
            jsSdk.init()
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
                interface: 'outBandAnalyse',
                data: formData
            }).then(res => {
                if (res.result.success == '0') {
                    this.$message.error(res.result.message)
                    return
                }

                this.base = res.result.result
                this.total = res.result.result.countOutBandWork
                if (!cb) {
                    this.listData = res.result.result.list
                } else {
                    this.listData = this.listData.concat(res.result.result.list)
                }
            })
        }
    }
}
</script>