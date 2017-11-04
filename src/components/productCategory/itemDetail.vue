<template>
    <section class="weui-article">
        <div class="wx-area-title">
            {{base.title}}
            <div class="wx-area-des">编码：{{base.codeNum}}</div>
        </div>
        <div class="wx-area-img">
            <img :src="base.coverImg">
        </div>

        <div class="wx-area-title wx-area-mid">产品介绍</div>
        <iframe class="wx-area-con" src=""></iframe>

        <div class="wx-area-title wx-area-mid">产品规格</div>
        <table class="wx-area-table" border="0" cellspacing='0'>
            <tr class="wx-table-title">
                <td width="40%">规格名称</td>
                <td>规格说明</td>
            </tr>
            <tr v-for="(item, index) in specs">
                <td>{{item.name}}</td>
                <td>{{item.des}}</td>
            </tr>
        </table>

        <div class="wx-area-title wx-area-mid">产品外观照片</div>
        <img-list :img-list="appearance" :more-path="appearancePath"></img-list>

        <div class="wx-area-title wx-area-mid">产品宣传照片</div>
        <img-list :img-list="productSpreed" :more-path="aproductSpreedPath"></img-list>
    </section>
</template>
<script>
import imgList from '../common/imgList.vue'

export default {
    data () {
        return {
            base: {
                title: '我是大三元产品',
                codeNum: '229938',
                coverImg: '/static/images/bench1.png'
            },
            specs: [
                {
                    "id": 0,
                    "name": "2017-18-21",
                    "des": "规格一说明"
                },
                {
                    "id": 1,
                    "name": "2017-18-21",
                    "des": "规格二说明"
                }
            ],
            appearance: [
                '/static/images/bench1.png',
                '/static/images/bench1.png',
                '/static/images/bench1.png',
                '/static/images/bench1.png',
                '/static/images/bench1.png',
                '/static/images/bench1.png',
                '/static/images/bench1.png',
                '/static/images/bench1.png',
                '/static/images/bench1.png'
            ],
            appearancePath: {
                name: 'product-img',
                query: {
                    type: 'appearance'
                }
            },
            productSpreed: [
                '/static/images/img1.png',
                '/static/images/img1.png',
                '/static/images/img1.png',
                '/static/images/img1.png',
                '/static/images/img1.png',
                '/static/images/img1.png',
                '/static/images/img1.png',
                '/static/images/img1.png',
                '/static/images/img1.png'
            ],
            aproductSpreedPath: {
                name: 'product-img',
                query: {
                    type: 'productSpreed'
                }
            }
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
</style>