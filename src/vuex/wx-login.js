import axios from 'axios'

export default {
    getQuery () {
        let queryStr = window.search ? window.search.substring(1)
        let queryList = queryStr.split('&')
        let queryObj = {}
        queryList.foreach((item) => {
            queryObj[item[0]] = item[1]
        })
        return queryObj
    }
    // url 为后端给的微信授权登录地址
    getCode (url) {
        const redirect_uri = window.location.href
        url = url + '&redirect_uri=' + encodeURI(redirect_uri)
        window.open(url)
    },
    getToken () {
        let queryObj = this.getQuery()
        let formData = {
            code: queryObj['code']
            state: queryObj['state']
        }

        axios.get('authorzition.json', {
          params: formData
        }).then(function(response){
          window.location.reload()
        })
    }
}