<template>
    <section class="attachment-img-box page__bd">
        <section class="wx-img-list weui-grids" v-scroll-load="{showMore:showMore, isLoad: isLoad}">
            <template v-for="(item, index) in listData">
                <div class="weui-grid">
                    <img :src="item.eventPlanCover"
                         @click="addAttachment(item)">

                    <div class="check-btn-box">
                        <span :class="attachmentData.indexOf(item) > -1 ? 'weui-icon-success' : 'weui-icon-circle'"></span>
                    </div>
                </div>
                <div class="margin-box" v-if="index % 3 != 2"></div>
            </template>
        </section>

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
                    eventPlanCover: '/static/images/bench1.png',
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
<style lang="scss">
.attachment-img-box {
    .wx-img-list {
        margin-bottom: 0 !important;

        .weui-grid {
            padding: 0;
            padding-top: 33%;
        }
    }

    .weui-cell {
        padding: 10px 15px;

        &:before {
            border: none;
        }
    }

    .weui-grid {
        position: relative;
        width: 33%;
        overflow: hidden;
        margin-bottom: 0.15em;

        img {
            position: absolute;
            width: 100%;
            display: block;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }

        .check-btn-box {
            position: absolute;
            width: 32px;
            height: 23px;
            top: 2px;
            right: 0px;
        }
    }

    .margin-box {
        float: left;
        width: 0.5%;
        height: 1px;
    }
}
</style>