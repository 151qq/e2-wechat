<template>
    <section class="appoint-detail-box page__bd">
        <div class="wx-area-img">
            <img :src="memberInfo.coverImg">
        </div>
        <div class="avatar-box">
            <div class="img-box">
                <img :src="memberInfo.avatar">
            </div>
            <div class="name-box">{{memberInfo.name}}</div>
        </div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">预约时间</div>
                <div class="weui-cell__ft">2017-10-12 12:00 ~ 12:30</div>
            </div>
            <router-link class="weui-cell weui-cell_access"
                            :to="{}">
                <div class="weui-cell__bd">预约地址</div>
                <div class="weui-cell__ft">北京是西胡同</div>
            </router-link>
        </div>
        <div class="weui-cells__title">预约详情</div>
        <div class="weui-cells">
            <div class="wx-area-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.
            </div>
        </div>
        <div class="wx-area-line"></div>

        <div class="imgs-box" v-if="appImgs.length">
            <img-list :img-list="appImgs"></img-list>
        </div>

        <div class="wx-area-line"></div>

        <div class="weui-cells no-margin">
            <div class="weui-cell weui-cell_access show-message-box"
                    v-for="(item, index) in fileList">
                <div class="weui-cell__bd">{{item.name}}</div>
                <div class="weui-cell__ft">{{item.size}}</div>
            </div>
        </div>

        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" href="/onlineBooking/pageConfirm">预约确认</a>
        </div>
    </section>
</template>
<script>
import imgList from '../common/imgList.vue'

export default {
    data () {
        return {
            memberInfo: {
                name: '爱咋咋地',
                tel: '1387762887',
                avatar: '/static/images/head-icon.png',
                coverImg: '/static/images/bench1.png'
            },
            fileList: [
                {
                    name: '第一个文件.doc',
                    size: '234k'
                },
                {
                    name: '第二个文件.doc',
                    size: '234k'
                }
            ],
            appImgs: [
                '/static/images/bench1.png',
                '/static/images/bench1.png',
                '/static/images/bench1.png',
                '/static/images/bench1.png',
                '/static/images/bench1.png'
            ]
        }
    },
    mounted () {
        // this.getData()
    },
    methods: {
        getData () {
        }
    },
    components: {
        imgList
    }
}
</script>
<style lang="scss">
.appoint-detail-box {
    .no-margin {
        margin-top: 0;
    }

    .avatar-box {
        position: relative;
        z-index: 10;
        height: 60px;
        overflow: hidden;
        margin-top: -40px;

        div {
            float: right;

            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }

        .img-box {
            width: 60px;
            height: 60px;
            border: 1px solid #E5E5E5;
            background: #ffffff;
            margin-right: 15px;
            box-sizing: border-box;
        }

        .name-box {
            font-size: 16px;
            line-height: 40px;
            margin-right: 20px;
            color: #ffffff;
        }
    }
}
</style>