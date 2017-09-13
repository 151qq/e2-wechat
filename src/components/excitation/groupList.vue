<template>
<!--个人信息组件-->
    <div class="profile">

      <div class="weui-cells">
        <a href="/vue-service/self/profile" class="weui-cell weui-cell_access">
          <div class="weui-cell__hd">
            <img src="https://sinacloud.net/vue-wechat/images/headers/header01.png" alt="" class="self-header">
          </div>
          <div class="weui-cell__bd"><h4 class="self-nickname">营销群</h4></div>
        </a>

        <div class="weui-cell">
          <div class="weui-cell__hd">
            <img src="../../assets/images/contact_add-friend-my-qr.png" style="vertical-align: middle;;width:24px" class="_align-middle">
          </div>
            <div class="weui-cell__bd">
              <p>名字</p>
            </div>
            <div class="weui-cell__ft">
                阿荡
              <img src="../../assets/images/contact_add-friend-my-qr.png" style="vertical-align: middle;;width:24px" class="_align-middle">
            </div>
        </div>
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                pageName: "群组激励"
            }
        }
    }
</script>
