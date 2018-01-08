<template>
    <div class="img-list-box">
        <section class="wx-img-list weui-grids">
            <template v-for="(item, index) in imgList">
                <div class="weui-grid" @click="showBigImg(index)">
                    <img :src="item">
                </div>
                <div class="margin-box" v-if="index % 3 != 2"></div>
            </template>
        </section>

        <show-big-img :big-imgs="imgList" :is-show-img="isShowImg" :index="index"></show-big-img>
    </div>  
    
</template>
<script>
import showBigImg from './showBigImg.vue'

export default {
    props: ['imgList'],
    data () {
        return {
            index: '',
            isShowImg: {
                value: false
            }
        }
    },
    methods: {
        showBigImg (index) {
            this.isShowImg.value = true
            this.index = index
        }
    },
    components: {
        showBigImg
    }
}
</script>
<style lang="scss">
.img-list-box {
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