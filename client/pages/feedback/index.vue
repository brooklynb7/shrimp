<template lang="pug">
div
  v-container(fluid)
    v-layout(align-content-start,justify-start)
      v-flex
        v-select(
          label="类型",
          :items="types",
          color="teal",
          item-value="id",
          v-model="selectedType",
          hide-details
        )
        v-text-field(
          label="描述",
          v-model="detail",
          color="teal",
          required,
          multi-line)
        v-alert(type="success",dismissible,v-model="alertSuccess") 发送成功
        v-alert(type="error",dismissible,v-model="alertError") 发送失败 - {{errorMsg}}
  v-btn(fab,fixed,right,bottom,color="teal",dark,@click="addFeedback",:loading="loading")
    v-icon send
</template>

<script>
export default {
  data() {
    return {
      alertError: false,
      alertSuccess: false,
      errorMsg: '',
      loading: false,
      selectedType: 1,
      types: [{ id: 1, text: 'Bug' }, { id: 2, text: '功能需求' }],
      detail: ''
    }
  },
  computed: {
    name: function() {
      return this.$store.state.user ? this.$store.state.user.name : ''
    }
  },
  methods: {
    clear() {
      this.detail = ''
    },
    showError(msg) {
      this.alertError = true
      this.errorMsg = msg
      this.alertSuccess = false
    },
    showSuccess() {
      this.alertError = false
      this.alertSuccess = true
    },
    async addFeedback() {
      if (this.detail.trim()) {
        this.loading = true
        try {
          await this.$api.addFeedback({
            type: this.selectedType,
            detail: this.detail
          })
          this.clear()
          this.showSuccess()
        } catch (err) {
          this.showError(err.message)
        } finally {
          this.loading = false
        }
      }
    }
  }
}
</script>