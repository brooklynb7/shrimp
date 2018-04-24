<template lang="pug">
v-app
  v-content
    v-container(fluid,fill-height)
      v-layout(justify-center align-center)
        v-flex(xs12 sm8 md4)
          v-card(class="elevation-12")
            v-toolbar(dark,:color="color",justify-center)
              v-toolbar-title 403 {{ title }}
            v-card-text
              p(class="title text-xs-center text-sm-center text-md-center mt-3") {{ text }}
</template>

<script>
export default {
  props: ['title', 'text', 'color']
}
</script>