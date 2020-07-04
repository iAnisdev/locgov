<template>
  <a-layout class="page">
    <a-layout-content >
      <a-layout class="layout">
        <a-layout-content :style="{ padding: '12px 24px' }">
          <a-row type="flex" justify="center">
            <a-col :span="16">
              <a-input-search
                placeholder="input text to search "
                v-model="search"
                size="large"
              />
            </a-col>
            <a-col :span="4" :offset="2">
              <a-button
                type="primary"
                size="large"
                :loading="isLoading"
                @click="onSearch('new')"
              >
                Search
              </a-button>
            </a-col>
          </a-row>

          <div v-if="isSearched">
            <a-divider orientation="left">Search Result</a-divider>
             <div v-for="(news , index) in searchResult" :key="index">
                <a-card style="margin-top: 1vh">
                <h5><a :href="news.url" target="_blank">{{news.title}}</a></h5>
                <i>{{news.timestamp}}</i>
                <p v-if="news.description">{{news.description[0]}}</p>
              </a-card>
             </div>
             <div style="margin-top: 2vh">
                <a-pagination v-model="sp" :defaultPageSize="1" :total="totalPages" show-less-items />
             </div>
          </div>
          <a-alert
            message="Empty Search"
            description="please enter a text to search"
            type="error"
            style="margin-top: 2vh"
            closable
            v-if="showAlert"
          />
        </a-layout-content>
      </a-layout>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      search: '',
      sp: 1,
      isSearched: false,
      showAlert: false,
      isLoading: false,
      searchResult: [],
      totalPages: 0,
      paginationData: []
    }
  },
  methods: {
    ...mapActions({
      searchQuery: 'searchQuery'
    }),
    onSearch(source) {
      let that = this
      if (that.search == '') {
        that.showAlert = true
        return
      }
      let data = { search: that.search }
      if(source == 'new'){
        data.sp = 1
      }else{
        data.sp = that.sp
        that.searchResult = []
      }
      that.isLoading = true
      that.searchQuery(data).then(res => {
        that.searchResult = res.results
        if(source == 'new'){
          that.totalPages = res.pagination.total
        }
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        that.isLoading = false
        that.isSearched = true
      })
    }
  },
  watch:{
    sp(newVal , oldVal) {
      if(newVal !== oldVal){
        this.onSearch()
      }
    }
  }
}
</script>

<style scoped>
.page{
  padding: 2vh 2vw;
  min-height: 90vh;
  max-height: 90vh;
  overflow-y: scroll;
}
.layout{
  margin-top: 2vh;
  background: #fff;
}
</style>
