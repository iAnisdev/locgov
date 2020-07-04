import Vue from 'vue'
import Vuex from 'vuex'
import API from '@/plugins/API'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    searchQuery({} , data)  {
      return new Promise((resolve , reject ) => {
        API().get(`/api/search?q=${data.search}&sp=${data.sp}` ).then((res) => {
          resolve({
            pagination: res.data.pagination,
            results: res.data.results
          })
        }).catch((err) => {
          reject(err)
        })
      })
    },
    requestCollections({} , data)  {
      return new Promise((resolve , reject ) => {
        API().get(`/api/collections` ).then((res) => {
          resolve(res.data.content)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    loadCollectionData({} , data)  {
      return new Promise((resolve , reject ) => {
        API().get(`/api/collections/${data.collection}` ).then((res) => {
          resolve({
            pagination: res.data.pagination,
            results: res.data.results
          })
        }).catch((err) => {
          reject(err)
        })
      })
    },
  },
  modules: {
    
  }
})
