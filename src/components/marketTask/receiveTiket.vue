<template>
    <section class="get-tiket-page">
        <div class="img-box">
            <img src="/static/images/detail1.png">
        </div>
        <div class="wx-area-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque
        </div>
        <a @click="uploadFile" class="add-file-btn">领取</a>

        <div class="img-box">
            <img src="/static/images/detail1.png">
        </div>
        <div class="wx-area-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque
        </div>
        <a @click="uploadFile" class="add-file-btn">领取</a>
    </section>
</template>
<script>
export default {
    data () {
        return {}
    }
}
</script>
<style lang="scss">
.get-tiket-page {
    .img-box {
        img {
            display: block;
            width: 100%;
        }
    }

    .add-file-btn {
        display: block;
        font-size: 16px;
        line-height: 2.5;
        text-align: center;
        margin: 10px 15px;
        border: 1px solid #e5e5e5;
        border-radius: 5px;
    }
}
</style>