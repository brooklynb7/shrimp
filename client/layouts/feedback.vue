<template lang="pug">
  v-app
    v-toolbar(app,color="teal",dark,fixed)
      v-toolbar-title {{$store.state.feedbackToolbarTitle}}
      v-spacer
      avatarName
    v-content
      nuxt
</template>

<script>
import avatarName from '../components/avatarName'

export default {
  components: { avatarName },

  data: () => ({
    drawer: null
  }),
  methods: {
    navToIndex() {
      console.log('test')
    }
  }
}
</script>