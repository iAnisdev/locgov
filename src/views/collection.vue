<template>
  <a-layout class="page">
    <a-layout-content >
      <a-layout class="layout">
        <a-layout-content :style="{ padding: '12px 24px' }">
          <div>
            <a-divider orientation="left">Collection related Result</a-divider>
             <div v-for="(news , index) in collectionData" :key="index">
                <a-card style="margin-top: 1vh">
                <h5><a :href="news.url" target="_blank">{{news.title}}</a></h5>
                <i>{{news.timestamp}}</i>
                <p v-if="news.description">{{news.description[0]}}</p>
                <a-skeleton :loading="isLoading" active >
                </a-skeleton>
              </a-card>
             </div>
          </div>
             <div style="margin-top: 2vh">
                <a-pagination v-model="sp" :defaultPageSize="1" :total="totalPages" show-less-items />
             </div>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
  </a-layout>
</template>

<script>
//setting up empty data to generate skeleton
const collectionData = [];
for (let i = 0; i < 25; i++) {
  collectionData.push({
    
  });
}

import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      isLoading: false,
      sp: 1,
      totalPages: 0,
      collectionData: collectionData,
    }
  },
  methods: {
    ...mapActions({
      loadCollectionData: 'loadCollectionData'
    }),
    onLoad(collection) {
      let that = this
      that.collectionData = collectionData
      let data = { collection: collection  , sp: that.sp}
      that.isLoading = true
      that.loadCollectionData(data).then(res => {
        that.collectionData = res.results
        that.totalPages = res.pagination.total
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
        this.onLoad()
      }
    }
  },
  mounted(){
    if(this.$route.params.name){
        this.onLoad(this.$route.params.name)
    }else{
        this.$router.go(-1)
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
