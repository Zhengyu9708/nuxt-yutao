import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import {
  http
} from "../plugins/axios";

const store =()=>{
    return new Vuex.Store({
        state: {
          phone:""
        },
        actions: { //异步提交用actions
            
        },
        mutations: { //同步数据用mutations    
            getPhone(state,phone){
                state.phone=phone
            }
        }
      })
}
export default store;
