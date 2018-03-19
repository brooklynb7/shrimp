<template lang="pug">
  v-app
    v-toolbar(app,color="indigo",dark,fixed)
      v-toolbar-title 我的应用
    v-content
      v-container(fluid,fill-height)
        v-layout(align-content-start,justify-start)
          nuxt
</template>

<script>
export default {
  data: () => ({
    drawer: null
  })
}
</script>