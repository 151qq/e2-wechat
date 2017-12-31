<template>
    <section class="article-list-box page__bd">
        <div class="weui-cells no-margin" v-scroll-load="{showMore:showMore, isLoad: isLoad}">
            <!-- site.socialmarketingcloud.com  localhost:8890-->
            <div  class="weui-media-box weui-media-box_appmsg"
                @click="addAttachment(item)"
                v-for="(item, index) in listData">
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb" :src="item.eventPlanCover">
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{item.eventPlanTitle}}</h4>
                    <p class="weui-media-box__desc">{{item.eventPlanDesc}}</p>
                </div>
                <div class="weui-cell__ft">
                    <span :class="attachmentData.indexOf(item) > -1 ? 'weui-icon-success' : 'weui-icon-circle'"></span>
                </div>
            </div>
        </div>

        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="saveAttachment">确定</a>
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import { mapActions } from 'vuex'

export default {
    data () {
        return {
            listData: [
                {
                    eventPlanCover: '/static/images/detail1.png',
                    eventPlanTitle: '第一测试',
                    eventPlanDesc: '我是第一测试描述'
                },
                {
                    eventPlanCover: '/static/images/detail1.png',
                    eventPlanTitle: '第二测试',
                    eventPlanDesc: '我是第二测试描述'
                },
                {
                    eventPlanCover: '/static/images/detail1.png',
                    eventPlanTitle: '第一测试',
                    eventPlanDesc: '我是第一测试描述'
                },
                {
                    eventPlanCover: '/static/images/detail1.png',
                    eventPlanTitle: '第二测试',
                    eventPlanDesc: '我是第二测试描述'
                },
                {
                    eventPlanCover: '/static/images/detail1.png',
                    eventPlanTitle: '第一测试',
                    eventPlanDesc: '我是第一测试描述'
                },
                {
                    eventPlanCover: '/static/images/detail1.png',
                    eventPlanTitle: '第二测试',
                    eventPlanDesc: '我是第二测试描述'
                },
                {
                    eventPlanCover: '/static/images/detail1.png',
                    eventPlanTitle: '第一测试',
                    eventPlanDesc: '我是第一测试描述'
                },
                {
                    eventPlanCover: '/static/images/detail1.png',
                    eventPlanTitle: '第二测试',
                    eventPlanDesc: '我是第二测试描述'
                },
                {
                    eventPlanCover: '/static/images/detail1.png',
                    eventPlanTitle: '第一测试',
                    eventPlanDesc: '我是第一测试描述'
                },
                {
                    eventPlanCover: '/static/images/detail1.png',
                    eventPlanTitle: '第二测试',
                    eventPlanDesc: '我是第二测试描述'
                },
                {
                    eventPlanCover: '/static/images/detail1.png',
                    eventPlanTitle: '第一测试',
                    eventPlanDesc: '我是第一测试描述'
                },
                {
                    eventPlanCover: '/static/images/detail1.png',
                    eventPlanTitle: '第二测试',
                    eventPlanDesc: '我是第二测试描述'
                }
            ],
            attachmentData: [],
            pageSize: 20,
            pageNumber: 1,
            total: 30,
            userId: ''
        }
    },
    mounted () {
        // this.getList()
    },
    computed: {
        isLoad () {
            return this.total > this.listData.length
        }
    },
    methods: {
        ...mapActions([
          'setAttachment'
        ]),
        saveAttachment () {
            this.setAttachment(this.attachmentData)
            this.$router.go(-2)
        },
        addAttachment (item) {
            var index = this.attachmentData.indexOf(item)

            if (index > -1) {
                this.attachmentData.splice(index, 1)
            } else {
                this.attachmentData.push(item)
            }
        },
        showMore (cb) {
            this.pageNumber++
            this.getList(cb)
        },
        getList (cb) {
            setTimeout(() => {
                this.listData = this.listData.concat([], this.listData)
                cb()
            }, 300)

            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                eventPlanStatus: 'submitted',
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            }

            util.request({
                method: 'get',
                interface: 'eventInfoList',
                data: formData
            }).then(res => {
                if (res.result.success == '0') {
                    this.$message.error(res.result.message)
                    return
                }

                this.total = res.result.total
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