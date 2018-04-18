<template>
    <section v-scroll-load="{showMore:showMore, isLoad: isLoad}">
        <div class="height-1"></div>
        <div class="weui-cells no-margin show-message-box">
            <div class="weui-cell weui-cell_access"
                v-for="(item, index) in recordList"
                :key="index">
                <div class="weui-cell__hd">
                    <label class="weui-label">
                        {{item.incentiveDate.split(' ')[0]}}
                    </label>
                </div>
                <div class="weui-cell__bd">
                    {{item.incentiveDesc}}
                </div>
                <div class="weui-cell__ft">{{item.incentiveNumber}}</div>
            </div>
        </div>

        <div class="null-box" v-if="!recordList.length && isPage">
             暂无记录！
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            isPage: false,
            recordList: [],
            pageSize: 20,
            pageNumber: 1,
            total: 0
        }
    },
    mounted () {
        this.getLog()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        isLoad () {
            return this.total > this.recordList.length
        }
    },
    methods: {
        showMore (cb) {
            this.pageNumber++
            this.getLog(cb)
        },
        getLog (cb) {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                userCode: this.$route.query.userCode,
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
            }

            util.request({
                method: 'get',
                interface: 'getOrganizeIncentive',
                data: formData
            }).then(res => {
                if (res.result.success == '0') {
                    this.$message.error(res.result.message)
                    return
                }

                this.total = Number(res.result.total)
                this.isPage = true
                if (!cb) {
                    this.recordList = res.result.result
                } else {
                    this.recordList = this.recordList.concat(res.result.result)
                    cb()
                }
            })
        }
    }
}
</script>