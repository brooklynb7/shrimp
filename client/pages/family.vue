<template lang="pug">
div
  h1 建设中!
  nuxt-child
</template>

<script>
export default {
  layout: 'family',
  data: () => {
    return { name: 'world' }
  }
}
</script>