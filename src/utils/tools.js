
import axios from 'axios';
import interfaces from './interfaces';

const tools = {
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
