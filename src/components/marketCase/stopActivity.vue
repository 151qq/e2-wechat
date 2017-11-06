<template>
    <section class="stop-activity-box page__bd">
        <div class="weui-cells weui-cells_form no-line">
            <div class="weui-cell no-line">
                <div class="weui-cell__bd">
                    <textarea class="weui-textarea"
                                placeholder="请输入..."
                                rows="3"
                                v-model="submitCotent"></textarea>
                    <!-- <div class="weui-textarea-counter"><span>{{fontNum}}</span>/{{totalFont}}</div> -->
                </div>
            </div>
        </div>
        <div class="weui-cell no-line">
            <div class="weui-uploader">
                <div class="weui-uploader__bd">
                     <ul class="weui-uploader__files" id="uploaderFiles">
                        <li class="weui-uploader__file"
                            v-for="(item, index) in imgList"
                            @click="showBigImg(index)">
                                <img :src="item">
                        </li>
                        <li class="weui-uploader__input-box" @click="uploadImg"></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="wx-area-line"></div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box"
                    v-for="(item, index) in fileList">
                <div class="weui-cell__bd">{{item.name}}</div>
                <div class="weui-cell__ft">{{item.size}}</div>
            </div>
        </div>

        <a @click="uploadFile" class="add-file-btn">添加附件</a>

        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" href="javascript:">确认</a>
        </div>
        <delete-img :index="nowIndex"
                    :img-path="nowPath"
                    :is-show-img="isShowImg"
                    @deleteImg="deleteImg"></delete-img>
    </section>
</template>
<script>
import tools from '../../utils/tools'
import deleteImg from '../../components/common/deleteImg.vue'

export default {
    data () {
        return {
            fontNum: 0,
            submitCotent: '',
            isShowImg: {
                value: false
            },
            imgList: [
                '/static/images/bench1.png',
                '/static/images/bench1.png',
                '/static/images/bench1.png'
            ],
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
            totalFont: 140,
            nowIndex: '',
            nowPath: ''
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
        uploadFile () {

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
.stop-activity-box {
    .add-file-btn {
        display: block;
        font-size: 16px;
        line-height: 2.5;
        text-align: center;
        margin: 10px 15px;
        border: 1px solid #e5e5e5;
        border-radius: 5px;
    }

    .weui-cells {
        margin-top: 0;
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