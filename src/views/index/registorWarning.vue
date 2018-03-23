<template>
    <section class="register-warning-box member-detail-box">
        <div class="wx-area-img">
            <img :src="coverImg">
        </div>
        <div class="message-box">
            <div class="message-content">
                您还没有被该企业的管理员授权使用“营销精英”，请联系您的企业管理员，获得相应的授权！
            </div>
            <div class="message-medile">
                营销精英，业界领先的社交营销云服务提供商
            </div>
            <div class="message-footer">
                上海竣钧信息科技有限公司
            </div>
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'

export default {
    data () {
        return {
            coverImg: ''
        }
    },
    mounted () {
        this.coverImg = '/static/images/B' + Math.ceil(Math.random() * 13) + '.jpg'
    }
}
</script>
<style lang="scss">
.register-warning-box {
    .message-box {
        padding: 15px;
        background: #ffffff;

        .message-footer {
            width: 100%;
            position: fixed;
            bottom: 20px;
            left: 0;
            font-size: 14px;
            color: #999999;
            line-height: 30px;
            text-align: center;
        }

        .message-medile {
            width: 100%;
            position: fixed;
            bottom: 50px;
            left: 0;
            font-size: 14px;
            color: #999999;
            line-height: 30px;
            text-align: center;
        }

        .message-content {
            margin-top: 10px;
            padding: 0 10px;
            font-size: 16px;
            color: #000000;
            line-height: 30px;
            text-align: center;
        }
    }
}
</style>