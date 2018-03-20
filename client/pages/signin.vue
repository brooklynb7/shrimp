<template lang="pug">
v-app
  v-container(fluid,fill-height)
    v-layout(justify-center align-center)
      v-flex(xs12,sm6,md4)
        v-card
          v-toolbar(dark,color="teal",justify-center)
            v-toolbar-title(class="text-xs-center") 登录
          v-container(fluid)
            v-flex(xs12)
              v-text-field(label="用户名", v-model="username", required, color="teal")
            v-flex(xs12)
              v-text-field(label="密码", v-model="password", type="password" required,color="teal")
            v-flex(xs12,class="text-xs-right")
              v-btn(:loading="loading",color="teal",dark, @click="login") 登录
            v-flex(xs12)
              p(class="error", dark, v-if="showError") {{ errorMsg }}
              // v-alert(type="error", :value="showError") {{ errorMsg }}
</template>

<script>
export default {
  data: () => ({
    showError: false,
    errorMsg: '',
    username: '',
    password: '',
    loading: false
  }),
  methods: {
    async login({ params, query }) {
      this.loading = true
      try {
        await this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        })
        // redirect('/')
        this.username = ''
        this.password = ''
        this.errorMsg = ''
        this.showError = false
        this.$nuxt.$router.replace({ path: this.$route.query.cb || '/' })
        this.$nuxt.$forceUpdate()
      } catch (emsg) {
        this.errorMsg = emsg
        this.showError = true
      }
      this.loading = false
    },
    async logout() {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>