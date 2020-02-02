import Vue from 'vue'
import Vuex from 'vuex'
import storage from 'good-storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartData: []
  },
  mutations: {
    setCartData (state, cartData) {
      state.cartData = cartData.slice(0)
    },
    addToCart (state, goods) {
      const { id, img, name, price } = goods
      const isExist = state.cartData.some(item => {
        if (item.id === id) {
          item.checked = true
          ++item.count
          return true
        }
        return false
      })
      if (!isExist) { // 不存在
        const checked = true
        const count = 1
        goods = {
          id, img, name, price, checked, count
        }
        state.cartData.push(goods)
      }
      storage.set('cartData', state.cartData)
    },
    changeLocalStatus (state) {
      storage.set('cartData', state.cartData)
    }
  },
  actions: {},
  modules: {}
})
