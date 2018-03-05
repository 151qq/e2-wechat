<template>
    <section class="article-log-box">
        <div class="height-1"></div>
        <section class="comment-b"
                    v-if="commentList.length"
                    v-for="(item, index) in commentList">
            <div class="avatar-box">
                {{item.pageLogDate.split(' ')[0]}}
            </div>
            <div class="content-box">
                <div class="title-box">
                    <span class="title">{{item.pageLogTitle}}</span>
                    <div class="date-box">
                        {{item.pageLogDate | getDateDiff}}
                    </div>
                </div>
                <div class="des-box" v-if="item.pageLogDesc">
                    {{item.pageLogDesc}}
                </div>

                <div class="imgs-box" 
                     v-if="item.imgDatas && item.imgDatas.length">
                    <img-list :img-list="item.imgDatas"></img-list>
                </div>
                <div class="article-box" v-if="item.pageData.pageData && item.pageData.pageData.length">
                    <attachment-show :attachment-data="item.pageData" :is-comment="true"></attachment-show>
                </div>
            </div>
        </section>
        <div class="null-box" v-if="!commentList.length && isPage">
            暂无内容！
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import imgList from '../common/imgList.vue'
import attachmentShow from '../common/attachmentShow.vue'
import { getDateDiff } from '../../assets/common/utils.js'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            isPage: false,
            commentList: []
        }
    },
    mounted () {
        this.getComments()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    methods: {
        getComments () {
            util.request({
                method: 'get',
                interface: 'pageLogList',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    pageCode: this.$route.query.pageCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.commentList = res.result.result
                    this.isPage = true
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    },
    filters: {
        getDateDiff
    },
    components: {
        imgList,
        attachmentShow
    }
}
</script>
<style lang="scss">
.article-log-box {
    .comment-b {
        background: #ffffff;
        padding: 10px 15px;
        display: flex;

        .avatar-box {
            width: 100px;
            font-size: 16px;
            color: #888888;
        }

        .content-box {
            flex: 1;
            overflow: hidden;

            .title-box {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .title {
                    flex: 1;
                    font-weight: 400;
                    font-size: 16px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    word-wrap: normal;
                    word-wrap: break-word;
                    word-break: break-all;
                }

                .date-box {
                    font-size: 14px;
                    color: #888888;
                }

            }

            .des-box {
                font-size: 14px;
                line-height: 1.4;
                margin-top: 5px;
            }

            .imgs-box {
                margin-top: 10px;
            }
        }

        .article-box {
            margin-top: 10px;

            .weui-media-box {
                padding: 10px 0;
            }

            .weui-media-box_appmsg .weui-media-box__hd {
                height: 40px;
                line-height: 40px;
            }
        }
    }
}
</style>