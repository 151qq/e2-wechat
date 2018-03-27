<template>
    <section class="product-list-box page__bd show-state-box">
        <div class="weui-cells no-margin" v-scroll-load="{showMore:showMore, isLoad: isLoad}">
            <!-- site.socialmarketingcloud.com  localhost:8890-->
            <router-link  class="weui-media-box weui-media-box_appmsg"
                          v-for="(item, index) in listData"
                          :to="{
                            name: 'reserve-detail',
                            query: {
                                enterpriseCode: userInfo.enterpriseCode,
                                agentId: $route.query.agentId,
                                reserveCode: item.reserveCode
                            }
                          }">

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
            </router-link>
        </div>

        <div class="null-page" v-if="!listData.length && isPage">
            暂无内容！
        </div>
        

        <div class="btn-height-box"></div>
        <div class="wx-bottom-nav">
            <router-link class="wx-nav-item"
                         :to="{
                            name: 'noline-list',
                            query: {
                                enterpriseCode: userInfo.enterpriseCode,
                                agentId: $route.query.agentId
                            }
                        }">
                外呼工作
            </router-link>
            <router-link class="wx-nav-item nav-now"
                         :to="{
                            name: 'reserve-list',
                            query: {
                                enterpriseCode: userInfo.enterpriseCode,
                                agentId: $route.query.agentId
                            }
                        }">
                客户预约
            </router-link>
            <router-link class="wx-nav-item"
                         :to="{
                            name: 'chance-list',
                            query: {
                                enterpriseCode: userInfo.enterpriseCode,
                                agentId: $route.query.agentId
                            }
                        }">
                商机追踪
            </router-link>
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
            total: 0
        }
    },
    mounted () {
        this.getList()
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
                enterpriseCode: this.userInfo.enterpriseCode,
                userCode: this.userInfo.userCode,
                reserveStatus: '1,2',
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
            }

            util.request({
                method: 'post',
                interface: 'selectByReceptionCode',
                data: formData
            }).then(res => {
                if (res.result.success == '0') {
                    this.$message.error(res.result.message)
                    return
                }

                this.total = Number(res.result.total)
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