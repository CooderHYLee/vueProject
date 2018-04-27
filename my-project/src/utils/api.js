/**
 * Author：lihongye
 * Create Date：2018/4/26
 * Modified By：lihongye
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
import axios from 'axios'
import {Message} from 'element-ui'

// 添加请求拦截器
axios.interceptors.request.use(config => {
  console.log(config)
  return config;
},err => {
  Message.error({message: '请求超时!'});
  return Promise.resolve(err)
})

// 添加响应拦截器
axios.interceptors.response.use(data => {
  if(data.status && data.status == 200 && data.data.status == 'error'){
    Message.error({message: data.data.msg});
    return;
  }
  return data;
},err => {
  console.log(err)
  if (err.response.status == 504||err.response.status == 404) {
    Message.error({message: '服务器被吃了⊙﹏⊙∥'});
  } else if (err.response.status == 403) {
    Message.error({message: '权限不足,请联系管理员!'});
  }else {
    Message.error({message: '未知错误!'});
  }
  return Promise.resolve(err);
})

let base = '';

// 发送get请求
export const getRequest = (url) => {
  return axios({
    method: 'get',
    url: `${base}${url}`
  });
}

// 发送post请求
export const postRequest = (url,params) => {
  console.log("url :")
  console.log(url)
  console.log(params)
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

// 发送upload请求
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

// 发送delete请求
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  });
}
