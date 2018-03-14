<template>
    <section class="product-list-box page__bd show-state-box">
        <div class="weui-cells no-margin" v-scroll-load="{showMore:showMore, isLoad: isLoad}">
            <!-- site.socialmarketingcloud.com  localhost:8890-->
            <div  class="weui-media-box weui-media-box_appmsg"
                @click="goToNext(item)"
                v-for="(item, index) in listData">

                <!-- <div v-if="item.reserveStatus == '1'" class="no-read"></div> -->
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb"
                         :src="item.reserveCover">
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{item.reserveTitle}}</h4>
                    <p class="weui-media-box__desc">
                        {{item.reserveBeginTime.split(' ')[0] + ' - ' + item.reserveEndTime.split(' ')[0]}}
                    </p>
                </div>
                <!-- <div class="weui-cell__ft" v-if="item.reserveStatus == '1'"><span class="no-done">未接</span></div>
                <div class="weui-cell__ft" v-if="item.reserveStatus == '2'"><span class="is-waiting">确认</span></div>
                <div class="weui-cell__ft" v-if="item.reserveStatus == '3'"><span class="is-doing">完成</span></div> -->
            </div>
        </div>

        <div class="null-page" v-if="!listData.length && isPage">
            暂无内容！
        </div>

        <div class="wx-bottom-nav">
            <a class="wx-nav-item"
                :class="reserveStatus == '1,2' ? 'nav-now' : ''"
                @click="setStatus('1,2')">
                未接待
            </a>
            <a class="wx-nav-item"
                :class="reserveStatus == '3' ? 'nav-now' : ''"
                @click="setStatus('3')">
                已接待
            </a>
            <router-link class="wx-nav-item nav-blue"
                         :to="{
                            name: 'add-reserve',
                            query: {
                                enterpriseCode: userInfo.enterpriseCode,
                                agentId: $route.query.agentId
                            }
                        }">
                新增预约
            </router-link>
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
            listData: [],
            pageSize: 20,
            pageNumber: 1,
            reserveStatus: '1,2',
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
        goToNext (item) {
            var pathData = {
                name: 'reserve-detail',
                query: {
                    enterpriseCode: this.userInfo.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    reserveCode: item.reserveCode
                }
            }

            this.$router.push(pathData)
        },
        showMore (cb) {
            this.pageNumber++
            this.getList(cb)
        },
        setStatus (type) {
            if (this.reserveStatus == type) {
                return false
            }
            this.reserveStatus = type
            this.getList()
        },
        getList (cb) {
            var formData = {
                enterpriseCode: this.userInfo.enterpriseCode,
                userCode: this.userInfo.userCode,
                reserveStatus: this.reserveStatus,
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
            }

            util.request({
                method: 'get',
                interface: 'selectByReceptionCode',
                data: formData
            }).then(res => {
                if (res.result.success == '0') {
                    this.$message.error(res.result.message)
                    return
                }

                this.total = res.result.total
                this.isPage = true
                if (!cb) {
                    this.listData = res.result.result
                } else {
                    this.listData = this.listData.concat(res.result.result)
                }
            })
        }
    }
}
</script>