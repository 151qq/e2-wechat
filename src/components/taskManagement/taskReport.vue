<template>
    <section class="task-comment-box">
        <section class="comment-b"
                    v-if="commentList.length"
                    :id="'comment-' + item.taskReportFloor"
                    v-for="(item, index) in commentList">
            <div class="avatar-box">
                <img v-if="item.userImg" :src="item.userImg">
            </div>
            <div class="content-box">
                <div class="title-box">
                    <span class="title">
                        {{item.userName}}&nbsp;&nbsp;
                        <a v-if="item.taskReportParent"
                            class="response-nav"
                            :href="'#comment-' + item.taskReportParent">@第{{item.taskReportParent}}楼</a>
                    </span>
                    <div class="date-box">
                        {{item.taskReportFloor}}楼 {{item.taskReportTime | getDateDiff}}
                    </div>
                </div>
                <div class="des-box"
                     v-if="item.status == '1' && item.taskReportText">
                    {{item.taskReportText}}
                </div>

                <div class="des-box"
                     v-if="item.status == '0'">该回话已被删除！！！</div>

                <div class="imgs-box" 
                     v-if="item.status == '1' && item.imgData && item.imgData.length">
                    <img-list :img-list="item.imgData"></img-list>
                </div>
                <div class="article-box" v-if="item.status == '1' && item.pageData && item.pageData.length">
                    <attachment-show :attachment-data="item" :is-comment="true"></attachment-show>
                </div>
                <div class="response-box"
                    v-if="userInfo.userCode && ($route.query.editType == '0' || $route.query.editType == '2') && !item.taskReportParent && item.status == '1'"
                    @click="showSubmit('1', item.taskReportFloor, item.userCode)">
                    <div class="top-box">
                        <div class="comment-btn" v-if="item.status == '1'">
                            <div class="btn-out-box">
                                <img src="../../assets/images/edit-icon.png">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="response-box"
                    v-if="userInfo.userCode && item.userCode == userInfo.userCode && item.status == '1'"
                    @click="deleteComment(item)">
                    <div class="top-box">
                        <div class="comment-btn" v-if="item.status == '1'">
                            <div class="btn-out-box">
                                <img src="../../assets/images/delete-icon.png">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="null-page" v-if="!commentList.length && isPage">
            暂无内容！
        </div>

        <template v-if="isPage && $route.query.editType == '0'">
            <div class="btn-height-box"></div>
            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary"  @click="gotoWechat">沟通</a>
            </div>
        </template>

        <template v-if="isPage && ($route.query.editType == '2' || $route.query.editType == '1')">
            <div class="wx-bottom-nav">
                <a class="wx-nav-item-20" @click="gotoWechat">
                    沟通
                </a>
                <a class="wx-nav-item nav-blue" @click="showSubmit('1')">
                    汇报
                </a>
            </div>
        </template>
    </section>
</template>
<script>
import util from '../../utils/tools'
import imgList from '../common/imgList.vue'
import attachmentShow from '../common/attachmentShow.vue'
import { getDateDiff } from '../../assets/common/utils.js'
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            isPage: false,
            commentList: [],
            commentsLen: ''
        }
    },
    mounted () {
        this.getComments()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo',
            userData: 'getUser'
        })
    },
    methods: {
        ...mapActions([
          'setUser'
        ]),
        showSubmit (type, floor, userCode) {
            var pathUrl = {
                name: 'edit-comment',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    taskCode: this.$route.query.taskCode,
                    taskReportFloor: this.commentList.length + 1,
                    taskType: this.$route.query.taskType,
                    editType: this.$route.query.editType
                }
            }

            if (floor) {
                pathUrl.query.taskReportParent = floor
                pathUrl.query.parentReportor = userCode
            }

            this.$router.replace(pathUrl)
        },
        getComments () {
            util.request({
                method: 'get',
                interface: 'getTaskReports',
                data: {
                    taskCode: this.$route.query.taskCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.commentList = res.result.result
                    this.isPage = true

                    this.changeTaskStatus()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        deleteComment (item) {
            util.request({
                method: 'post',
                interface: 'deleteTaskReport',
                data: {
                    taskReportCode: item.taskReportCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.getComments()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        changeTaskStatus () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                taskCode: this.$route.query.taskCode,
                taskReceiver: this.userInfo.userCode,
            }

            var editType = this.$route.query.editType

            if (editType == '1') {
                formData.taskReplyStatus = '2'
            } else if (editType == '0') {
                formData.taskStatus = '2'
            } else if (editType == '2') {
                formData.taskReplyStatus = '2'
                formData.taskStatus = '2'
            }

            util.request({
                method: 'post',
                interface: 'changeTaskStatus',
                data: formData
            }).then(res => {})
        },
        gotoWechat () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                taskCode: this.$route.query.taskCode
            }

            util.request({
                method: 'get',
                interface: 'getTaskSenderAndReceivers',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    var attData = {
                        userList: [],
                        userCodes: []
                    }

                    if (res.result.result.taskSender) {
                        attData.userCodes.push(res.result.result.taskSender)
                    }

                    if (res.result.result.taskReceiver) {
                        attData.userCodes = attData.userCodes.concat(res.result.result.taskReceiver)
                    }

                    this.setUser(attData)

                    var urlPath = 'http://mobile.socialmarketingcloud.com/we-chat'
                    urlPath = urlPath + '?enterpriseCode=' + this.$route.query.enterpriseCode + '&agentId=' + this.$route.query.agentId + '&taskCode=' + this.$route.query.taskCode

                    var pathUrl = {
                        name: 'user-list',
                        query: {
                            enterpriseCode: this.$route.query.enterpriseCode,
                            agentId: this.$route.query.agentId,
                            redirectUrl: window.encodeURIComponent(urlPath)
                        }
                    }
                    this.$router.push(pathUrl)
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
.task-comment-box {
    padding: 10px 15px;
    background: #ffffff;

    .head-box {
        padding: 10px 0;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
            font-size: 18px;
            color: #000000;
        }

        .right {
            display: block;
            width: 28px;
            height: 28px;
            text-align: right;

            img {
                display: inline-block;
                width: 18px;
                height: 18px;
                margin-top: 5px;
            }
        }
    }

    .response-nav {
        color: #20a0ff;
    }

    .comment-b {
        padding: 10px 0;
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
                padding: 10px;
            }

            .weui-media-box_appmsg .weui-media-box__hd {
                height: 40px;
                line-height: 40px;
            }
        }

        .response-box {
            margin-top: 10px;

            .top-box {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .response {
                    font-size: 16px;
                    color: #000000;
                }

                .comment-btn {
                    flex: 1;
                    text-align: right;
                    font-size: 14px;
                    color: #000000;
                    line-height: 1;

                    .btn-out-box {
                        display: inline-block;
                        padding: 5px 4px 0px;
                        height: 24px;
                        box-sizing: border-box;
                        overflow: hidden;
                    }

                    img {
                        float: left;
                        height: 16px;
                    }

                    .text {
                        float: right;
                        font-size: 15px;
                        margin-left: 5px;
                        line-height: 16px;
                    }
                }
            }

            .response-content {
                margin-top: 10px;
                padding: 10px 15px;
                background: #f3f3f3;
            }
        }
    }
}
</style>