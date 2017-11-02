<template>

  <div id="wechat">
  <div id="self">
    <div class="weui-tab__content" style="display: block;">
      <div class="weui-cells">
        <router-link to="/work/profile" class="weui-cell weui-cell_access">
          <div class="weui-cell__hd">
            <img src="https://sinacloud.net/vue-wechat/images/headers/header01.png" alt="" class="self-header">
          </div>
          <div class="weui-cell__bd">
            <h4 class="self-nickname">办公室主作</h4>

            <p class="self-wxid">关于学习19大会议精神通知</p>
          </div>
          <div class="weui-cell__ft">
            <img src="../../assets/images/chat-info-qr.png">
          </div>
        </router-link>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
    export default {
        mixins: [window.mixin],
        data() {
            return {
                "pageName": "我的工作"
            }
        },
        mounted() {
            this.$store.commit("toggleTipsStatus", -1)
        },
        activated() {
            this.$store.commit("toggleTipsStatus", -1)
        }
    }
</script>
<style>
    @import "../../assets/css/self.css";
</style>
