<template>
    <!--消息列表组件 数据交互频繁-->
    <!--进入 dialogue 页面，携带参数 mid name group_num -->
    <li :class="{'item-hide':deleteMsg}">
        <!--自定义指令 v-swiper 用于对每个消息进行滑动处理-->

      <!--

            <div class="weui-cells">
                <div class="weui-cell weui-cell_access">

                <div class="weui-cell__hd" style="line-height: 40px;">
                 朋友圈gfdgfgfdgdfgfgdfgfgfdfgfgfdgfgfgf
                </div>
                 <div class="weui-cell__ft">
                   <img  :src="item.html5PageindexImg">
                  </div>

              </div>
            </div>
                -->

      <router-link :to="{ path: 'iframe', query: { mid: item.id,taskCode:item.taskCode}}" tag="div" class="list-info clearfix" v-swiper v-on:click.native="toggleMsgRead($event,'enter')">
                  <div class="header-box">
                      <div class="header">
                          <img  :src="item.html5PageindexImg">
                      </div>
                  </div>
                  <div class="desc-box">
                      <div class="desc-author" >{{item.html5PageTitle}}</div>
                      <div class="desc-msg">
                          <span>{{item.updateTime}}</span>
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


<style type="text/css" scoped>


  #wechat .wechat-list {
    position: relative;
    overflow-x: hidden;
    z-index: 1
  }

  #wechat .wechat-list .list-row {
    height: auto;
    position: relative;
    overflow: hidden
  }

  #wechat .wechat-list .list-row.item-hide {
    -webkit-transition: 0.3s;
    transition: 0.3s;
    height: 0px
  }

  #wechat .wechat-list .list-row.item-hide:after {
    content: "";
    position: absolute;
    z-index: 2;
    top: 1px;
    bottom: 1px;
    width: 100%;
    background: rgba(0, 0, 0, 0.3)
  }

  #wechat .wechat-list .list-row:last-child:after {
    content: "";
    position: absolute;
    width: 200%;
    left: 0;
    z-index: 10;
    left: 8px;
    bottom: 0;
    -webkit-transform: scale(0.5);
    -ms-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: 0 0;
    -ms-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scale(0.5);
    -webkit-transform-origin: 0 0;
    background-color: #b7b7b7;
    height: 1px
  }

  #wechat .wechat-list .list-row .list-info {
    position: relative;
    z-index: 2;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 18px;
    background-color: #fff
  }


  #wechat .wechat-list .list-row .list-info .header-box {
    position: relative;
    float:right;
    width: 120px;
    height:80px;
    margin-right: 0px
  }

  #wechat .wechat-list .list-row .list-info .header-box .header {
    height: 100%;
    border-radius: 0px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
    overflow: hidden;
    background: #dddbdb
  }

  #wechat .wechat-list .list-row .list-info .header-box .header {
    height: 100%;
    border-radius: 0px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
    overflow: hidden;
    background: #dddbdb
  }



  #wechat .wechat-list .list-row .list-info .header-box .header img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    -webkit-box-flex: 2;
    -webkit-flex-grow: 2;
    -ms-flex-positive: 2;
    flex-grow: 2;
    border: 0
  }

  #wechat .wechat-list .list-row .list-info .header-box .header.multi-header img {
    margin: 1px
  }

  #wechat .wechat-list .list-row .list-info .desc-box {
    overflow: hidden
  }

  #wechat .wechat-list .list-row .list-info .desc-box .desc-time {
    float: right;
    color: #b8b8b8
  }

  #wechat .wechat-list .list-row .list-info .desc-box .desc-author {
    height: auto;
    line-height: 25px;
    font-size: 16px;
    word-break: break-all;
    color: #000;
   	text-overflow: ellipsis;
   	overflow: hidden;
    display: -webkit-box;
    /* autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp: 2;
  }

  #wechat .wechat-list .list-row .list-info .desc-box .desc-msg {
    height: 23px;
    line-height: 23px;
    font-size: 14px;
    margin-top: 10px;
    color: #888
  }

  #wechat .wechat-list .list-row .list-info .desc-box .desc-msg .desc-mute {
    float: right;
    color: #b8b8b8
  }

  #wechat .wechat-list .list-row .operate-box {
    position: absolute;
    z-index: 1;
    height: 100%;
    right: 0;
    top: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex
  }

  #wechat .wechat-list .list-row .operate-box > div {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: #c7c7cc;
    color: #fff;
    font-size: 18px;
    padding: 0 12px
  }

  #wechat .wechat-list .list-row .operate-box .operate-del {
    background-color: #ff3b30
  }

</style>


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
