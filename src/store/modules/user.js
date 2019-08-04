import api from '../../api/index'

const user = {
  state: {
    userInfo: { name: 'sddsd' },
    menuList: [],
    permission: []
  },

  getter: {

  },

  mutations: {
    // 更新用户信息
    updateUserInfo (state, newUserInfo) {
      state.userInfo = newUserInfo
    },

    // 菜单信息
    updateMenuList (state, newMenuList) {
      state.menuList = newMenuList
    },

    // 权限参数
    updatePermission (state, newPermission) {
      state.permission = newPermission
    }
  },

  actions: {
    wipeData ({ commit }) {
      return new Promise(resolve => {
        commit('updateUserInfo', {})
        commit('updateMenuList', [])
        commit('updatePermission', [])
        resolve()
      })
    },

    // 登出后重置用户状态
    logout ({ commit }) {
      return api
        .logout()
        .then(this.wipeData)
        .catch(err => {
          console.log(err)
        })
    },

    pickUserInfo ({ commit }, userInfo) {
      commit('updateUserInfo', userInfo)
    }
  }
}

export default user
