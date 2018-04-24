<template lang="pug">
v-app
  v-content
    v-container(fluid,fill-height)
      v-layout(justify-center align-center)
        v-flex(xs12 sm8 md4)
          v-card(class="elevation-12")
            v-toolbar(dark,color="primary",justify-center)
              v-toolbar-title(class="text-xs-center") 管理员登录
            v-card-text
              v-form
                v-text-field(prepend-icon="person", label="用户名", v-model="username", required, color="primary")
                v-text-field(prepend-icon="lock",label="密码", v-model="password", type="password" required,color="primary")
            v-card-actions
              v-spacer
              v-btn(:loading="loading",color="primary",dark, @click="login") 登录
            v-flex(xs12)
              // p(class="error", dark, v-if="showError") {{ errorMsg }}
              v-alert(type="error", :value="showError") {{ errorMsg }}
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
    async login({ params, query, env }) {
      this.loading = true
      try {
        await this.$store.dispatch('loginAdmin', {
          username: this.username,
          password: this.password
        })
        this.username = ''
        this.password = ''
        this.errorMsg = ''
        this.showError = false
        this.$nuxt.$router.replace({
          path: this.$route.query.cb || env.basePath
        })
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