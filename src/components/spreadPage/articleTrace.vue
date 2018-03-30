<template>
    <section class="user-trace-list">
        <template v-for="(item, index) in dataList">
            <div class="item-box" :class="index % 2 == 1 ? 'reverse' : ''">
                <div class="avatar-box">
                    <img class="weui-media-box__thumb"
                        v-if="item.memberWechatImg"
                        :src="item.memberWechatImg">
                </div>
                <div class="font-box">
                    <div class="name-box">
                        {{item.memberName ? item.memberName : item.customerCode}}
                    </div>
                    <div class="date-box">
                        {{item.spreadCreateTime}}
                    </div>
                </div>
            </div>
            <div :class="index % 2 == 1 ? 'line-box-right' : 'line-box-left'"
                 v-if="index < dataList.length - 1">
                {{item.sharaDesc}}
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
            dataList: []
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
                    var data = res.result.result

                    data.chilrenspread.forEach((item) => {
                        item.spreadCreateTime = item.spreadCreateTime.split(' ')[0]
                    })

                    var partentData = data.parentspread

                    if (partentData.channelName) {
                        var traceData = {
                            memberWechatImg: partentData.channelImage,
                            memberName: partentData.channelName,
                            spreadCreateTime: '推广会员',
                            sharaDesc: partentData.sharaDesc
                        }

                        data.chilrenspread.unshift(traceData)
                    }

                    if (partentData.userName) {
                        var traceData = {
                            memberWechatImg: partentData.userImage,
                            memberName: partentData.userName,
                            spreadCreateTime: '企业员工',
                            sharaDesc: '企业微信分享'
                        }

                        data.chilrenspread.unshift(traceData)
                    }

                    this.dataList = data.chilrenspread
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    }
}
</script>
<style lang="scss">
.user-trace-list {
    position: fixed;
    left: 0;
    top: 0;
    background: #f8f8f8;
    height: 100%;
    width: 100%;
    padding: 15px 15px 0;
    box-sizing: border-box;
    overflow: auto;

    .item-box {
        display: flex;
        margin: 0 10px;

        .avatar-box {
            height: 50px;
            width: 50px;
            overflow: hidden;
            background: url(/static/images/head-icon.png) center center no-repeat;
            background-size: 100% 100%;

            img {
                display: block;
                width: auto !important;
                height: 100%;
                position: relative;
                left: 50%;
                transform: translateX(-50%);
            }
        }

        .font-box {
            display: inline-block;
            min-width: 60%;
            height: 50px;
            padding: 5px 10px;
            background: #ffffff;
            box-sizing: border-box;

            .name-box {
                font-size: 14px;
                line-height: 20px;
                color: #000000;
            }

            .date-box {
                font-size: 14px;
                line-height: 20px;
                color: #999999;
            }
        }
    }

    .reverse {
        flex-direction: row-reverse;

        .font-box {
            text-align: right;
        }
    }

    .line-box-left {
        position: relative;
        left: 50%;
        top: 0;
        height: 80px;
        border-left: 1px solid #e5e5e5;
        line-height: 80px;
        color: #999999;
        font-size: 14px;
        padding-left: 10px;
    }

    .line-box-right {
        position: relative;
        right: 50%;
        top: 0;
        height: 80px;
        border-right: 1px solid #e5e5e5;
        line-height: 80px;
        color: #999999;
        font-size: 14px;
        padding-right: 10px;
        text-align: right;
    }
}   
</style>