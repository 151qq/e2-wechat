<template>
    <section class="point-box page__hd">
        <div class="weui-cells__title">基本信息</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">开始时间</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="datetime-local" value="" placeholder="">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">结束时间</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="datetime-local" value="" placeholder="">
                </div>
            </div>
        </div>
        
        <detail-show :detail-data="detailData" :is-edit="true"></detail-show>

        <div class="wx-bottom-nav">
            <a class="wx-nav-item" @click="saveDetail">
                提交
            </a>
        </div>
    </section>
</template>
<script>
import tools from '../../utils/tools'
import detailShow from '../common/detailShow.vue'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
        }
    },
    mounted () {
        console.log(this.$store)
    },
    computed: {
        ...mapGetters({
            detailData: 'getDetail'
        })
    },
    methods: {
        saveDetail () {
            this.$router.push({name: 'activity-detail'})
        }
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