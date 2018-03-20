<template lang="pug">
  v-app
    v-toolbar(app,color="blue darken-2",dark,fixed)
      v-toolbar-title 我是医生
      v-spacer
      avatarName
    v-content
      v-container(fluid,fill-height)
        v-layout(align-content-start,justify-start)
          nuxt
</template>

<script>
import avatarName from '../components/avatarName'

export default {
  components: { avatarName },

  data: () => ({
    drawer: null
  })
}
</script>