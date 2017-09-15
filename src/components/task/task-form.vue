<template>
  <div class="weui_cells weui_cells_form">
    <section>
      <div class="weui-cells__tips">任务时间</div>
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">开始时间</div>
          <div class="weui-cell__ft"><input class="weui_input" type="datetime-local" value="" placeholder=""></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">完成时间</div>
          <div class="weui-cell__ft"><input class="weui_input" type="datetime-local" value="" placeholder=""></div>
        </div>
      </div>

      <div class="weui-cells__tips">任务详情</div>

      <div class="weui-cells">
        <p class="weui-cells__tips">请根据本任务的要求按时保质地创作文章。有关营销活动的详细方案参考本任务的附件。</p>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-uploader">
              <div class="weui-uploader__bd">
                <ul class="weui-uploader__files" id="uploaderFiles">
                  <li class="weui-uploader__file weui-uploader__file_status"
                      style="background-image:url(./images/pic_160.png)">
                    <div class="weui-uploader__file-content">
                      <i class="weui-icon-warn"></i>
                    </div>
                  </li>
                  <li class="weui-uploader__file weui-uploader__file_status"
                      style="background-image:url(./images/pic_160.png)">
                    <div class="weui-uploader__file-content">50%</div>
                  </li>
                </ul>
                <div class="weui-uploader__input-box">
                  <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple="">
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="weui-cells">
          <a href="/vue-wechat/#/self/profile">
            <p class="weui-cells__tips">线上推广方案详情，内含推广的主题、推广的产品，以及优惠券的详细信息，推广时间是2017-06-12~2017-09-20 点击添加附件</p>
          </a>

          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">
              <span style="vertical-align: middle">任务完成附件文档</span>
            </div>
            <div class="weui-cell__ft">查看</div>
          </div>
        </div>

      </div>

      <div class="weui-cells__tips">任务附加要求</div>


      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">文章数量</div>
          <div class="weui-cell__ft">
            <input class="weui-input" type="text" placeholder="0">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">提交（天/1篇）</div>
          <div class="weui-cell__ft">
            <input class="weui-input" type="text" placeholder="0">
          </div>
        </div>
      </div>

      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <a href="javascript:;" class="weui-btn weui-btn_default">分派任务</a>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>
<script>
  export default {}

</script>
