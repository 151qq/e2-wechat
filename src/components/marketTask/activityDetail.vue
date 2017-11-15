<template>
    <section class="point-box page__hd">
        <div class="weui-cells__title">基本信息</div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">开始时间</div>
                <div class="weui-cell__ft">2017-09-09 19:28:09</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">结束时间</div>
                <div class="weui-cell__ft">2017-09-09 19:28:09</div>
            </div>
        </div>
        
        <detail-show :detail-data="detailData"></detail-show>

        <div class="wx-bottom-nav">
            <router-link class="wx-nav-item"
                            :to="{}">
                任务研讨
            </router-link>
            <router-link class="wx-nav-item"
                            :to="{}">
                任务红包
            </router-link>
            <router-link class="wx-nav-item"
                            :to="{name: 'assignment-task'}">
                分派任务
            </router-link>
        </div>
    </section>
</template>
<script>
import tools from '../../utils/tools'
import detailShow from '../common/detailShow.vue'

export default {
    data () {
        return {
            detailData: {
                content: '我是详情',
                imgList: [
                    '/static/images/bench1.png',
                    '/static/images/bench1.png',
                    '/static/images/bench1.png'
                ],
                fileList: [
                    {
                        id: 0,
                        imgUrl: '/static/images/detail1.png',
                        title: '爱谁谁爱啥啥',
                        des: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
                    },
                    {
                        id: 1,
                        imgUrl: '/static/images/detail1.png',
                        title: '不知道不明了',
                        des: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
                    },
                    {
                        id: 2,
                        imgUrl: '/static/images/detail1.png',
                        title: '你瞅啥，你看啥',
                        des: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
                    },
                    {
                        id: 3,
                        imgUrl: '/static/images/detail1.png',
                        title: '瞅你咋地',
                        des: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
                    }
                ]
            }
        }
    },
    methods: {
    },
    components: {
        detailShow
    }
}
</script>
<style lang="scss">
.point-box {
    .no-margin {
        margin-top: 0;
    }

    .add-file-btn {
        display: block;
        font-size: 16px;
        line-height: 2.5;
        text-align: center;
        margin: 10px 15px;
        border: 1px solid #e5e5e5;
        border-radius: 5px;
    }

    .no-line {
        &:before {
            height: 0;
            border: none;
        }

        &:after {
            height: 0;
            border: none;
        }
    }

    .weui-uploader__file {
        background: #e5e5e5;
        position: relative;
        overflow: hidden;

        img {
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translate(0,-50%);
        }
    }
}
</style>