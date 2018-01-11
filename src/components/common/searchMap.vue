<template>
    <section class="select-map">
        <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label">预约地点</label></div>
            <div class="weui-cell__bd">
                <input class="weui-input"
                    placeholder="请输入"
                    v-model="keyValue"
                    @blur="getMess"
                    @keyup.13="getMess">
            </div>
        </div>
        
        <div id="containerhouse"></div>

        <section class="sheet-box" @click.self="hiddenSheet">
            <div class="weui-mask"
                :class="isShowSheet.value ? 'show-box' : ''"></div>
            <div class="weui-actionsheet"
                    :class="isShowSheet.value ? 'weui-actionsheet_toggle' : ''">
                <div class="weui-actionsheet__menu">
                    <div class="weui-actionsheet__cell"
                            @click="setMap(item)"
                            v-for="(item, index) in messDate">{{item.title}}</div>
                </div>
                <div class="weui-actionsheet__action">
                    <div class="weui-actionsheet__cell" @click="hiddenSheet">取消</div>
                </div>
            </div>
        </section>
    </section>
</template>
<script>
export default {
    props: ['mapData'],
    data () {
        return {
            keyValue: '',
            messDate: [],
            isShowSheet: {
                value: false
            }
        }
    },
    mounted () {
        setTimeout(() => {
            this.initMap()
        }, 300)
        this.keyValue = this.mapData.address
    },
    methods: {
        getMess () {
            if (this.keyValue === '') {
                return false
            }

            let _self = this
            this.isShowSheet.value = true
            var options = {
                onSearchComplete (results) {
                    _self.messDate = results.yr.splice(0, 5)
                }
            }
          
            var local = new window.BMap.LocalSearch('北京', options)
            local.search(this.keyValue)
        },
        setMap (item) {
            this.keyValue = item.title
            this.drawMap(item)
            var url = this.setImg()
            this.$emit('getLink', url)
            this.hiddenSheet()
        },
        hiddenSheet () {
            this.isShowSheet.value = false
        },
        initMap () {
            if (!this.map) {
                var map = new window.BMap.Map('containerhouse')
                this.map = map
                var point = new window.BMap.Point(116.409, 39.918)
                map.centerAndZoom(point, 15)
            }
        },
        drawMap (mapInfo) {
            this.mapData.point = mapInfo.point.lng + ',' + mapInfo.point.lat
            this.mapData.address = mapInfo.title
            var point = new window.BMap.Point(mapInfo.point.lng, mapInfo.point.lat)
            this.map.clearOverlays()
            this.map.panTo(point)
            var marker = new BMap.Marker(point)
            this.map.addOverlay(marker)
        },
        setImg () {
            var url = 'http://api.map.baidu.com/staticimage?center=' + this.mapData.point + '&zoom=17&width=750&height=120&markers=' + this.mapData.point + '&name=' + this.mapData.address

            return url
        }
    }
}
</script>
<style lang="scss">
.select-map {
    .sheet-box {
        .weui-mask {
            opacity: 0;
            display: none;
        }

        .show-box {
            opacity: 1;
            display: block;
        }
    }

    #containerhouse {
        height: 120px;
        margin: 0 15px;
    }
}
</style>