import queryString from 'query-string'
import axios from 'axios';
import interfaces from './interfaces';

const tools = {
  // importRemoteJs () {
  //   var s = document.createElement('script')
  //   s.type = 'text/javascript'
  //   s.src = 'https://g.alicdn.com/dingding/dinglogin/0.0.2/ddLogin.js'
  //   document.body.appendChild(s)
  // },
  /**
     * 格式化日期函数
     * @param date {Date|Date String} [需要格式化的日期]
     * @param frm {String} [格式(如：yyyy-MM-dd hh:mm:ss)]
     * @return 格式化后的日期
     */
  formatDate (date, fmt) {
      if (!date || !fmt) {
        return ''
      }

      var theDate = ''
      if (typeof date == 'number') {
        theDate = new Date(date)
      } else {
        if (date.length > 10) {
          var dateArr = date.split(/[T\s]/)

          var beforeTime = dateArr[0].split('-')
          var afterTime = dateArr[1].split(':')

          afterTime[2] = afterTime[2] ? afterTime[2] : '00'
        } else {
          var beforeTime = date.split('-')
        }

        if (afterTime) {
          theDate = new Date(beforeTime[0], beforeTime[1] - 1, beforeTime[2], afterTime[0], afterTime[1], afterTime[2])
        } else {
          theDate = new Date(beforeTime[0], beforeTime[1] - 1, beforeTime[2])
        }
      }

      if (!theDate) {
        return
      }

      var o = {
          'M+': theDate.getMonth() + 1, // 月份
          'd+': theDate.getDate(), // 日
          'h+': theDate.getHours(), // 小时
          'm+': theDate.getMinutes(), // 分
          's+': theDate.getSeconds(), // 秒
          'q+': Math.floor((theDate.getMonth() + 3) / 3), // 季度
          'S': theDate.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (theDate.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
  },
  getDate (date) {
    if (!date) {
      return new Date()
    }

    var theDate = ''
    if (typeof date == 'number') {
      theDate = new Date(date)
    } else {
      if (date.length > 10) {
        var dateArr = date.split(/[T\s]/)

        var beforeTime = dateArr[0].split('-')
        var afterTime = dateArr[1].split(':')

        afterTime[2] = afterTime[2] ? afterTime[2] : '00'
      } else {
        var beforeTime = date.split('-')
      }

      if (afterTime) {
        theDate = new Date(beforeTime[0], beforeTime[1] - 1, beforeTime[2], afterTime[0], afterTime[1], afterTime[2])
      } else {
        theDate = new Date(beforeTime[0], beforeTime[1] - 1, beforeTime[2])
      }
    }

    if (!theDate) {
      theDate = new Date()
    }

    return theDate
  },
  formDataUrl (url) {
    var a =  document.createElement('a')
    a.href = url
    return {
      path: a.pathname,
      query: queryString.parse(a.search)
    }
  },
  formDataDate (str) {
      var dateStr = new Date(str)
      var year = dateStr.getFullYear()
      var monthStr = dateStr.getMonth() + 1
      var dayStr = dateStr.getDate()
      var month = monthStr < 10 ? '0' + monthStr : monthStr
      var day = dayStr < 10 ? '0' + dayStr : dayStr
      return year + '/' + month + '/' + day
  },
  request (option) {
    let method = option.method ? option.method : 'get'
    let putData = {
      url: interfaces.interfaces[option.interface],
      method: method,
      // headers:{
      //   token:option.token?option.token:''
      // }
    }

    if (method == 'get') {
      putData.params = option.data
    } else if (method == 'post'){
      putData.data = option.data
    }
    /**
     * 请求拦截：在请求之前执行 比如loading处理
     * */
    return new Promise((resolve, reject) => {

      axios.interceptors.request.use((config) => {
        // common.loading()
        return config;
      })
      /**
       * 请求完成后执行
       * */
      axios.interceptors.response.use(
        response => {
          //common.removeLoading();
          return response;
        },

        error => {
          if(error.response.status){
            console.log(error.response.status)
          }
        }

      )

      axios(putData).then(res => {
        resolve({
          status:0,
          result:res.data
        })
      }).catch(()=>{
        //reject('error');
      });
    });

  }
};
export default tools
