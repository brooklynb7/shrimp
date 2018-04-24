<template lang="pug">
div
  h1 Hello {{ name }}!  
  nuxt-child
</template>

<script>
export default {
  layout: 'index',
  data: () => {
    return { name: 'world' }
  },
  methods: {
    test() {
      console.log('test')
    }
  }
}
</script>