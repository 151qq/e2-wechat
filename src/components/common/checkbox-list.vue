<template>
    <section class="check-box" @click.self="hiddenSheet">
        <div class="weui-mask"
            :class="isShowSheet.value ? 'show-box' : ''"></div>
        <div class="weui-actionsheet"
                :class="isShowSheet.value ? 'weui-actionsheet_toggle' : ''">
            <div class="sheet-header">
                <div class="sheet-header-left" @click="hiddenSheet">取消</div>
                <div class="sheet-header-right" @click="confirmSheet">完成</div>
            </div>
            <div class="weui-actionsheet__menu">
                <div class="weui-cells no-margin">
                    <div class="weui-media-box weui-media-box_appmsg"
                        @click="selectItem(item)"
                        v-for="(item, index) in itemList">
                        <div class="weui-media-box__bd">
                            <h4 class="weui-media-box__title">{{item[labelKey]}}</h4>
                        </div>
                        <div class="weui-cell__ft">
                            <span :class="itemValues.indexOf(item[valueKey]) > -1 ? 'weui-icon-success' : 'weui-icon-circle'"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    props: ['isShowSheet', 'itemList', 'mapData'],
    data () {
        return {
            itemValues: [],
            itemLabels: [],
            labelKey: 'lable',
            valueKey: 'value'
        }
    },
    mounted () {
        if (this.mapData.length) {
            this.labelKey = this.mapData[1]
            this.valueKey = this.mapData[0]
        }
    },
    methods: {
        resetData () {
            this.itemValues = this.isShowSheet.selectData.values.concat([])
            this.itemLabels = this.isShowSheet.selectData.labels.concat([])
        },
        selectItem (item) {
            var index = this.itemValues.indexOf(item[this.valueKey])

            if (index > -1) {
                this.itemLabels.splice(index, 1)
                this.itemValues.splice(index, 1)
            } else {
                this.itemLabels.push(item[this.labelKey])
                this.itemValues.push(item[this.valueKey])
            }
        },
        confirmSheet () {
            var selectData = {
                values: this.itemValues.concat([]),
                labels: this.itemLabels.concat([])
            }

            this.$emit('selectChange', selectData)
            this.isShowSheet.value = false
        },
        hiddenSheet () {
            this.isShowSheet.value = false
        }
    }
}
</script>
<style lang="scss">
.check-box {
    .weui-mask {
        opacity: 0;
        display: none;
    }

    .show-box {
        opacity: 1;
        display: block;
    }

    .weui-cells {
        margin-top: 0;

        .weui-cell__ft {
            padding: 0;
        }

        .weui-cell__ft:after {
            display: none;
            content: "";
            width: 0;
        }
    }

    .sheet-header {
        overflow: hidden;
        height: 44px;
        line-height: 44px;
        font-size: 16px;
        background-color: #fbf9fe;

        .sheet-header-left {
            float: left;
            line-height: 44px;
            font-size: 16px;
            padding-left: 15px;
            color: #828282;
        }

        .sheet-header-right {
            float: right;
            line-height: 44px;
            font-size: 16px;
            padding-right: 15px;
            color: #04BE02;
        }
    }
}
</style>