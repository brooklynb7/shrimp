<template lang="pug">
nuxt-child
</template>

<script>
export default {
  layout: 'feedback',
  middleware: 'authUser',
  data: () => {
    return { name: 'world' }
  }
}
</script>