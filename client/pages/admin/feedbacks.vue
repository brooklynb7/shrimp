<template lang="pug">
div
  v-layout(row,wrap)
    listHeader(title="意见反馈")
    v-flex(xs12,sm12,md12,lg12,xl12)      
      div(style="text-align:center")
        v-progress-circular(v-if="loading",indeterminate,color="primary",size="24")
      v-list(two-line,class="elevation-2")
        template(v-for="(item, index) in feedbacks")
            v-list-tile(:key="item._id")
              v-list-tile-content
                v-list-tile-sub-title(class="text--primary") {{ item.user.name }}
                v-list-tile-sub-title(class="") {{ item.detail }}
              v-list-tile-action
                v-list-tile-action-text {{ item.createTime }}
            v-divider(v-if="index + 1 < feedbacks.length", :key="index")
</template>

<script>
import listHeader from '../../components/listHeader'
import formatter from '../../utils/formatter'
import * as _ from 'lodash'

export default {
  components: { listHeader },
  data: () => {
    return {
      loading: false,
      name: 'test',
      feedbacks: []
    }
  },
  mounted() {
    this.getFeedbacks()
  },
  methods: {
    async getFeedbacks() {
      try {
        const feedbacks = await this.$api.getFeedbacks()
        _.each(feedbacks.results, item => {
          item.createTime = formatter.getDateFormat(item.createTime)
        })
        this.feedbacks = feedbacks.results
      } catch (err) {
        alert(err.message)
      } finally {
      }
    }
  }
}
</script>
