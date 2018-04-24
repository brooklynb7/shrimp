<template lang="pug">
  nuxt-child
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'authAdmin',
  data: () => {
    return { name: 'world' }
  }
}
</script>
