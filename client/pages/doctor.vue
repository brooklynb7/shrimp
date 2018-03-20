<template lang="pug">
div
  h1 建设中!  
  nuxt-child
</template>

<script>
export default {
  layout: 'doctor',
  middleware: 'authenticated',
  data: () => {
    return { name: 'world' }
  }
}
</script>