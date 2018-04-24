<template lang="pug">
v-container(fluid,pa-0)
  v-layout(align-content-start,justify-start)
    v-flex
      div(style="text-align:center")
        v-progress-circular(v-if="loading",indeterminate,color="teal",size="24")
      v-list
        template(v-for="(item, index) in feedbacks")
            v-list-tile(:key="item._id")
              v-list-tile-content                
                v-list-tile-sub-title(class="text--primary") {{ item.detail }}
              v-list-tile-action
                v-list-tile-action-text {{ item.createTime }}
            v-divider(v-if="index + 1 < feedbacks.length", :key="index")
</template>

<script>
import formatter from '../../utils/formatter'
import * as _ from 'lodash'

export default {
  data() {
    return {
      toolbarTitle: '我的反馈',
      loading: false,
      feedbacks: []
    }
  },
  mounted() {
    this.$store.commit('setFeedbackToolbarTitle', this.toolbarTitle)
    this.getFeedback()
  },
  methods: {
    async getFeedback() {
      this.loading = true
      try {
        let feedbacks = await this.$api.getMyFeedbacks()
        _.each(feedbacks.results, item => {
          item.createTime = formatter.getDateFormat(item.createTime)
        })
        this.feedbacks = feedbacks.results
        console.log(feedbacks)
      } catch (err) {
        alert(err.message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>