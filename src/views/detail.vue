<template>
  <a-layout style="padding: 2vh 2vw; height: 100vh">
    <a-layout-content>
      <a-layout style="margin-top: 2vh; background: #fff">
        <a-layout-content >
          <a-table :columns="columns" :data-source="collections" :loading="loadingData">
            <div
              slot="filterDropdown"
              slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
              style="padding: 8px"
            >
              <a-input
                v-ant-ref="c => (searchInput = c)"
                :placeholder="`Search ${column.dataIndex}`"
                :value="selectedKeys[0]"
                style="width: 188px; margin-bottom: 8px; display: block;"
                @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
              />
              <a-button
                type="primary"
                icon="search"
                size="small"
                style="width: 90px; margin-right: 8px"
                @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
              >
                Search
              </a-button>
              <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
                Reset
              </a-button>
            </div>
            <a-icon
              slot="filterIcon"
              slot-scope="filtered"
              type="search"
              :style="{ color: filtered ? '#108ee9' : undefined }"
            />
             <span slot="action" slot-scope="newsTitle, record">
             <router-link :to="`/collection/${record.url}`">View</router-link>
            </span>
          </a-table>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as _ from 'underscore'
export default {
  data() {
    return {
    columns: [
        {
          title: 'Title',
          dataIndex: 'newsTitle',
          onFilter: (value, record) => record.newsTitle.indexOf(value) === 0,
          sorter: (a, b) => a.newsTitle.length - b.newsTitle.length,
          sortDirections: ['descend'],
           scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
            record.newsTitle
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
        },
        {
          title: 'Language',
          dataIndex: 'language',
          onFilter: (value, record) => record.language.indexOf(value) === 0,
          sorter: (a, b) => a.language.length - b.language.length,
          sortDirections: ['descend'],
           scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
            record.language
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
        },
        {
          title: 'Related News',
          dataIndex: 'count',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.count - b.count,
           scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
            record.count
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
        },
        {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        width: 100,
        scopedSlots: { customRender: 'action' },
      },
      ],
      collections: [],
      filteredCollection: [],
      loadingData: false,
      search: [],

    }
  },
  methods: {
    ...mapActions({
      requestCollections: 'requestCollections'
    }),
    onLoad() {
      let that = this
      that.loadingData = true
      that.requestCollections().then(res => {
        let collections = []
        _.forEach(res.results , function(collection){
          if(collection.url.startsWith('http')){
            let url = new URL(collection.url)
            let collection_slug =  url.pathname.slice(13 , url.pathname.indexOf('/about'))
            let language = _.has(collection , 'language') ? collection.language[0] : 'english'
            collections.push({
              key: collection.index + 1,
              newsTitle: collection.title,
              count: collection.count,
              group: collection.group[0],
              url: collection_slug,
              language: language
            })
          }
        })
        that.collections = collections
      that.loadingData = false
      })
      .catch(err => {
        console.error(err)
      })
    },
     handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },

    handleReset(clearFilters) {
      clearFilters();
      this.searchText = '';
    },
  },
  mounted(){
    this.onLoad()
  }
}
</script>
