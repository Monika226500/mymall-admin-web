import { login, logout, getInfo,faceLogin } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import {setSupport,getSupport,setCookie,getCookie} from '@/utils/support';
import {Message} from "element-ui";
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 密码登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          const tokenStr = data.tokenHead+data.token
          setToken(tokenStr)
          commit('SET_TOKEN', tokenStr)
          resolve()

          Message({
            message: "用户验证成功",
            type: 'success',
            duration: 3 * 1000
          })
        }).catch(error => {
          reject(error)
        })
      })
    },
    FLogin({ commit }, params) {
      return new Promise((resolve, reject) => {
        faceLogin(params).then(response => {
          const data = response.data
          if(data.error_code!=0){//验证失败
            Message({
              message: "人脸验证失败",
              type: 'error',
              duration: 3 * 1000
            })
            setCookie("username","");
            setCookie("password","");
            return
          }
          const tokenStr = data.tokenHead+data.token
          //console.log("得到token")
          //console.log(tokenStr)
          setToken(tokenStr)
          setCookie("username",data.username,15);
          setCookie("password",data.password,15);
          commit('SET_TOKEN', tokenStr)
          resolve()
          Message({
            message: "人脸验证成功",
            type: 'success',
            duration: 3 * 1000
          })
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.username)
          commit('SET_AVATAR', data.icon)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
