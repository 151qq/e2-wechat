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
                <div class="article-box" v-if="item.pageDatas && item.pageDatas.length">
                    <div class="weui-cells no-margin">
                        <router-link class="weui-media-box weui-media-box_appmsg"
                                v-for="(article, index) in item.pageDatas"
                                :to="{
                                    name: 'article-detail',
                                    query: {
                                        enterpriseCode: $route.query.enterpriseCode,
                                        agentId: $route.query.agentId,
                                        pageCode: article.pageCode,
                                        appid: article.appId,
                                        templateCode: article.templateCode,
                                        S: userInfo.userCode,
                                        C: 'e2nochannel',
                                        T: 'e2nospread'
                                    }
                                }">
                            <div class="weui-media-box__hd">
                                <img class="weui-media-box__thumb" :src="article.pageCover">
                            </div>
                            <div class="weui-media-box__bd">
                                <h4 class="weui-media-box__title">{{article.pageTitle}}</h4>
                                <p class="weui-media-box__desc">{{article.pageAbstract}}</p>
                            </div>
                        </router-link>
                    </div>
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
        imgList
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