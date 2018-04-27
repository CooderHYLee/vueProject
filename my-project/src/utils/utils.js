/**
 * Author：lihongye
 * Create Date：2018/4/26
 * Modified By：lihongye
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
import {getRequest} from './api'
import {Message} from 'element-ui'

// 判断数据非空
export const isNotNullORBlank = (...args)=> {
  for (var i = 0; i < args.length; i++) {
    var argument = args[i];
    if (argument == null || argument == '' || argument == undefined) {
      Message.warning({message: '数据不能为空!'})
      return false;
    }
  }
  return true;
}

// export const initMenu = (router, store)=> {
//   if (store.state.routes.length > 0) {
//     return;
//   }
//   getRequest("/config/sysmenu").then(resp=> {
//     console.log("utils中的： " )
//     console.log(resp)
//     if (resp && resp.status == 200) {
//       var fmtRoutes = formatRoutes(resp.data);
//       router.addRoutes(fmtRoutes);
//       store.commit('initMenu', fmtRoutes);
//       store.dispatch('connect');
//     }
//   })
// }
