<template>
  <a-layout class="page">
    <a-layout-content>
      <a-layout style="margin-top: 5vh;">
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
          <input
            type="file"
            @change="handleChange"
            accept=".xlsx, .xls, .csv"
            required
          />
          <div style="margin-top: 2vh; width:70vw;">
            <canvas id="lineChart" colors="lineChartColors"></canvas>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Chart from 'chart.js'
import * as _ from 'underscore'

export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions({
      uploadFile: 'uploadFile'
    }),
    handleChange(e) {
      let that = this
      const files = e.target.files
      if (files[0] !== undefined) {
        this.fileName = files[0].name
        if (this.fileName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          that
            .uploadFile({
              fileData: fr.result,
              file: files[0]
            })
            .then(res => {
              that.generateChart(res)
            })
        })
      }
    },
    generateChart(data) {
      let that = this
      let labels = _.uniq(_.pluck(data, 'Date'))
      let genreList = _.filter(_.uniq(_.pluck(data, 'Genre')), function(genre) {
        return genre !== ''
      })
      let dataSet = []
      var myColors = ['red', 'green', 'orange', 'maroon', 'blue', 'black'] // Define your colors
      _.forEach(genreList, (genere, index) => {
        let label = genere
        let genere_data = _.filter(data, function(record) {
          return record.Genre == genere
        })
        dataSet.push({
          label: label,
          fill: false,
          borderColor: myColors[index],
          data: _.pluck(genere_data, 'Page Views')
        })
      })
      new Chart(document.getElementById('lineChart'), {
        type: 'line',
        data: {
          labels: _.filter(labels, function(label) {
            return label !== ''
          }),
          datasets: dataSet
        }
      })
    }
  }
}
</script>

<style scoped>
.page {
  padding: 2vh 2vw;
  min-height: 90vh;
  max-height: 90vh;
  overflow-y: scroll;
}
.layout {
  margin-top: 2vh;
  background: #fff;
}
</style>
