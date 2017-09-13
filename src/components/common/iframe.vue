<template>
  <div class="wrap">
    <div class="iframe-container">
      <iframe  :src="src" frameborder="0" allowfullscreen=""></iframe>
    </div>
  </div>
</template>
<script>
    export default {
        data(transition) {
          console.log(this.$route.query);
          this.src = "http://site.esocial-cloud.com/article/b7beb843-03fb-44f1-afce-ea7ba3f516fd.html";
          setIframeHeight(document.getElementsByTagName('iframe'));
          return {
              pageName: "详情页"
        }
        }
    }

    function setIframeHeight(iframe) {
      if (iframe) {
        var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
        if (iframeWin.document.body) {
          iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
        }
      }
    };

</script>
<style>
  .wrap {
    width: 100%;
    margin: auto;
  }
  .iframe-container {
    height: 100%;
    padding-bottom: 97.6%;
    position: relative;
  }
  .iframe-container iframe {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 100%) {
    .wrap {
      width: 100%;
    }
  }

</style>
