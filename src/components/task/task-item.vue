<template>
    <!--消息列表组件 数据交互频繁-->
    <!--进入 dialogue 页面，携带参数 mid name group_num -->
    <li :class="{'item-hide':deleteMsg}">
        <!--自定义指令 v-swiper 用于对每个消息进行滑动处理-->
        <router-link :to="{ path: '/iframe', query: { mid: item.id,taskCode:item.taskCode}}" tag="div" class="list-info" v-swiper v-on:click.native="toggleMsgRead($event,'enter')">
            <div class="header-box">
                <!--如果是私聊，只显示一个头像； 如果是群聊，则显示多个头像，flex 控制样式-->
                <div class="header">
                    <img  :src="item.taskIcon">

                </div>
            </div>
            <div class="desc-box">
                <!--使用过滤器 fmtDate 格式化时间  taskStatus-->
                <div class="desc-time" v-if="item.taskStatus=='0'">待办</div>
              <div class="desc-time" v-else="item.taskStatus=='1'">已回复</div>
              <div class="desc-time" v-else="item.taskStatus=='3'">超期</div>

              <div class="desc-author">{{item.taskTitle}}</div>
                <div class="desc-msg">
                    <span>{{item.taskBeginTime | fmtDate('yyyy-MM-dd hh:ss')}}</span>
                </div>
            </div>
        </router-link>



        <div class="operate-box">
            <div class="operate-unread" v-if="read" v-on:click="toggleMsgRead">标为未读</div>
            <div class="operate-read" v-else v-on:click="toggleMsgRead">标为已读</div>
            <div class="operate-del" v-on:click="deleteMsgEvent">删除</div>
        </div>
    </li>
</template>
<script>
    export default {
        props: ["item"],
        data() {
            return {
                read: this.item.read,
                deleteMsg: false
            }
        },
        methods: {
            //切换消息未读/已读状态
            toggleMsgRead(event, status) {
                if (status === 'enter') {
                    if (this.read) {
                        return ''
                    }
                    this.read = true
                } else {
                    this.read = !this.read
                }
                if (!this.item.quiet) {
                    if (this.read) {
                        this.$store.commit('minusNewMsg')
                    } else {
                        this.$store.commit('addNewMsg')
                    }
                }

                event.target.parentNode.parentNode.firstChild.style.marginLeft = 0 + "px"
            },
            deleteMsgEvent() {
                this.deleteMsg = true
                if (!this.item.quiet) {
                    if (!this.read) {
                        this.$store.commit('minusNewMsg')
                    }
                }
            }
        },
        // 参考 https://vuefe.cn/v2/guide/custom-directive.html
        directives: {
            swiper: {
                bind: function(element, binding) {
                    var isTouchMove, startTx, startTy
                    element.addEventListener('touchstart', function(e) {
                        var touches = e.touches[0]
                        startTx = touches.clientX
                        startTy = touches.clientY
                        isTouchMove = false;
                    }, false);
                    element.addEventListener('touchmove', function(e) {
                        var touches = e.changedTouches[0],
                            endTx = touches.clientX,
                            endTy = touches.clientY,
                            distanceX = startTx - endTx,
                            distanceY = startTy - endTy;
                        if (distanceX < 0) { //右滑
                            if (Math.abs(distanceX) >= Math.abs(distanceY)) {
                                if (Math.abs(distanceX) > 20) {
                                    element.style.transition = "0.3s"
                                    element.style.marginLeft = 0 + "px"
                                }
                            }
                        } else { //左滑
                            if (Math.abs(distanceX) >= Math.abs(distanceY)) {
                                if (distanceX < 156 && distanceX > 20) {
                                    e.preventDefault()
                                    element.style.transition = "0s"
                                    element.style.marginLeft = -distanceX + "px"
                                    isTouchMove = true
                                }
                            }
                        }
                        // e.preventDefault()
                    }, false);
                    element.addEventListener('touchend', function(e) {
                        if (!isTouchMove) {
                            return;
                        }
                        var touches = e.changedTouches[0],
                            endTx = touches.clientX,
                            endTy = touches.clientY,
                            distanceX = startTx - endTx,
                            distanceY = startTy - endTy,
                            isSwipe = false
                        if (Math.abs(distanceX) >= Math.abs(distanceY)) {
                            if (distanceX < 0) {
                                return;
                            }
                            if (Math.abs(distanceX) < 60) {
                                isSwipe = true
                                element.style.transition = "0.3s"
                                element.style.marginLeft = 0 + "px"
                            } else {
                                element.style.transition = "0.3s"
                                element.style.marginLeft = "-156px"
                            }
                        }
                    }, false);
                }
            }
        }
    }
</script>
