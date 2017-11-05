<template>
    <section class="submit-box" v-if="isShowModal.value" @click.self='hiddenModal'>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <textarea class="weui-textarea"
                                placeholder="这一刻的想法..."
                                rows="3"
                                v-model="submitCotent"></textarea>
                    <!-- <div class="weui-textarea-counter"><span>{{fontNum}}</span>/{{totalFont}}</div> -->
                </div>
            </div>
        </div>
        <div class="weui-cell">
            <div class="weui-uploader">
                <div class="weui-uploader__bd">
                     <ul class="weui-uploader__files" id="uploaderFiles">
                        <li class="weui-uploader__file"
                            v-for="(item, index) in imgList"
                            @click="showBigImg(index)">
                                <img :src="item">
                        </li>
                        <li class="weui-uploader__input-box">
                            <input id="uploaderInput"
                                    class="weui-uploader__input"
                                    type="file"
                                    accept="image/*"
                                    multiple=""
                                    @change="uploadImg">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" href="javascript:">发布</a>
        </div>
        <delete-img :index="nowIndex"
                    :img-path="nowPath"
                    :is-show-img="isShowImg"
                    @deleteImg="deleteImg"></delete-img>
    </section>
</template>
<script>
import tools from '../../utils/tools'
import deleteImg from './deleteImg.vue'

export default {
    props: ['isShowModal'],
    data () {
        return {
            fontNum: 0,
            submitCotent: '',
            imgList: [
                '/static/images/bench1.png',
                '/static/images/bench1.png',
                '/static/images/bench1.png'
            ],
            totalFont: 140,
            nowIndex: '',
            nowPath: '',
            isShowImg: {
                value: false
            }
        }
    },
    mounted () {
        console.log(this.imgList, 'imgList')
    },
    watch: {
        submitCotent () {
            this.fontNum = this.submitCotent.length
        }
    },
    methods: {
        uploadImg (e) {
            console.log(e)
            tools.upFile(e).then((res) => {
                if (res.result.success == '1') {
                    let imgUrl = res.result.result[0]
                    this.imgList.push(imgUrl)
                } else {

                }
            })
        },
        hiddenModal () {
            this.isShowModal.value = false
        },
        showBigImg (index) {
            this.nowIndex = index
            this.nowPath = this.imgList[index]
            this.isShowImg.value = true
        },
        deleteImg (index) {
            this.imgList.splice(index, 1)
        }
    },
    components: {
        deleteImg
    }
}
</script>
<style lang="scss">
.submit-box {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #ffffff;

    .weui-btn-area {
        position: absolute;
        width: 100%;
        bottom: 15px;
        left: 0;
        margin: 0;
        box-sizing: border-box;
        padding: 1.17647059em 15px .3em;
    }

    .weui-cells {
        margin-top: 0;

        &:after, &:before {
            height: 0;
            border: none;
        }
    }

    .weui-cell {
        &:before {
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