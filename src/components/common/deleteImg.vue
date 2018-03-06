<template>
    <section class="img-box-bg" v-show="isShowImg.value" @click="hiddenImg">
        <div class="img-big-box">
            <img :src="imgPath">
        </div>

        <div class="delete-box">
            <span></span>
            <a href="javascript:" class="weui-gallery__del" @click.stop="deleteImg">
                <i class="weui-icon-delete weui-icon_gallery-delete"></i>
            </a>
        </div>
    </section>
</template>
<script>
export default {
    props: ['imgPath', 'index', 'isShowImg'],
    data () {
        return {
        }
    },
    methods: {
        hiddenImg () {
            this.isShowImg.value = false
        },
        deleteImg () {
            this.$emit('deleteImg', this.index)
            this.isShowImg.value = false
        }
    }
}
</script>
<style lang="scss">
.img-box-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    z-index: 1000;

    .img-big-box {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translate(0,-50%);

        img {
            display: block;
            width: 100%;
        }
    }

    .delete-box {
        position: absolute;
        width: 100%;
        bottom: 10px;
        left: 0;
        height: 50px;
        text-align: center;

        span {
            display: inline-block;
            width: 50px;
            height: 50px;
            background: #000000;
            border-radius: 30px;
            opacity: 0.8;
        }

        a {
            position: absolute;
            top: 0;
            left: 50%;
            width: 50px;
            height: 50px;
            margin-left: -25px;
            text-align: center;
            line-height: 50px;
        }
    }
}
</style>