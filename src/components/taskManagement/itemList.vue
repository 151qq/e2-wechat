<template>
    <section class="product-list-box page__bd show-state-box">
        <div class="weui-cells no-margin" v-scroll-load="{showMore:showMore, isLoad: isLoad}">
            <div  class="weui-media-box weui-media-box_appmsg"
                @click="goToNext(item)"
                v-for="(item, index) in listData">
                <div v-if="(item.taskStatus == '1' && interface == 'getPendingTasks') || (item.taskReplayStatus == '1' && interface == 'getSendedTasks')" class="no-read"></div>
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb"
                         v-if="item.bgTaskImg"
                         :src="item.bgTaskImg">
                    <img class="weui-media-box__thumb"
                         v-if="!item.bgTaskImg"
                         src="/static/images/head-icon.png">
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{item.taskTitle}}</h4>
                    <p class="weui-media-box__desc">
                        {{item.taskBeginTime.split(' ')[0] + ' - ' + item.taskEndTime.split(' ')[0]}}
                    </p>
                </div>
            </div>
        </div>

        <div class="null-page" v-if="!listData.length && isPage">
            暂无内容！
        </div>

        <div class="btn-height-box"></div>
        <div class="wx-bottom-nav">
            <a class="wx-nav-item"
                :class="interface == 'getPendingTasks' ? 'nav-now' : ''"
                @click="setStatus('getPendingTasks')">
                我的待办任务
            </a>
            <a class="wx-nav-item nav-blue" @click="showSheet">
                新建任务
            </a>
            <a class="wx-nav-item"
                :class="interface == 'getSendedTasks' ? 'nav-now' : ''"
                @click="setStatus('getSendedTasks')">
                我发布的任务
            </a>
        </div>

        <sheet :is-show-sheet="isShowSheet" :item-list="sheetList" :cb="creatTask"></sheet>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'
import sheet from '../common/sheet.vue'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            isPage: false,
            listData: [],
            isShowSheet: {
                value: false
            },
            pageSize: 20,
            pageNumber: 1,
            interface: 'getPendingTasks',
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
        },
        sheetList () {
            var roleCodes = []
            this.userInfo.securityRole.forEach((item) => {
                roleCodes.push(item.roleCode)
            })

            var arrs = []
            if (roleCodes.indexOf('page_manager') > -1) {
                arrs = [
                    {
                        label: '通用任务',
                        pathName: 'activity-task'
                    },
                    {
                        label: '编辑任务',
                        pathName: 'edit-task'
                    }
                ]
            } else {
                arrs = [
                    {
                        label: '通用任务',
                        pathName: 'activity-task'
                    }
                ]
            }

            return arrs
        }
    },
    methods: {
        goToNext (item) {
            var pathName = 'activity-detail'
            if (item.taskType == 1) {
                pathName = 'edit-detail'
            }

            var pathData = {
                name: pathName,
                query: {
                    enterpriseCode: this.userInfo.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    taskCode: item.taskCode
                }
            }

            this.$router.push(pathData)
        },
        showMore (cb) {
            this.pageNumber++
            this.getList(cb)
        },
        setStatus (type) {
            if (this.interface == type) {
                return false
            }

            this.interface = type
            this.getList()
        },
        getList (cb) {
            var formData = {
                enterpriseCode: this.userInfo.enterpriseCode,
                userCode: this.userInfo.userCode,
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
            }

            util.request({
                method: 'get',
                interface: this.interface,
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
        },
        showSheet () {
            this.isShowSheet.value = true
        },
        creatTask (item) {
            this.$router.push({
                name: item.pathName,
                query: {
                    enterpriseCode: this.userInfo.enterpriseCode,
                    agentId: this.$route.query.agentId
                }
            })
        }
    },
    components: {
        sheet
    }
}
</script>