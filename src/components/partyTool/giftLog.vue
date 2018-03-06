<template>
    <section class="article-log-box">
        <div class="height-1"></div>
        <section class="comment-b"
                    v-if="commentList.length"
                    v-for="(item, index) in commentList">
            <div class="avatar-box">
                <img v-if="item.organizeUserInfo.userWechatLogo" :src="item.organizeUserInfo.userWechatLogo">
            </div>
            <div class="content-box">
                <div class="title-box">
                    <span class="title">{{item.organizeUserInfo.userWechatNickname}}</span>
                    <div class="date-box">
                        {{item.partyRecordTime | getDateDiff}}
                    </div>
                </div>
                <div class="des-box" v-if="item.partyMemo">
                    {{item.partyMemo}}
                </div>

                <div class="imgs-box" 
                     v-if="item.imageData && item.imageData.length">
                    <img-list :img-list="item.imageData"></img-list>
                </div>
            </div>
        </section>
        <div class="null-box" v-if="!commentList.length && isPage">
            暂无内容！
        </div>

        <div class="btn-height-box"></div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="showSubmit">编辑</a>
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
        showSubmit () {
            var pathUrl = {
                name: 'edit-log',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    partyCode: this.$route.query.partyCode,
                    partyAlbum: this.$route.query.partyAlbum
                }
            }

            this.$router.replace(pathUrl)
        },
        getComments () {
            util.request({
                method: 'post',
                interface: 'partyShowList',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    partyCode: this.$route.query.partyCode
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
            width: 50px;
            height: 50px;
            background: url(/static/images/head-icon.png) center no-repeat;
            background-size: 100%;
            margin-right: 10px;

            img {
                display: block;
                width: 50px;
                height: 50px;
            }
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