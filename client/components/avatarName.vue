<template lang="pug">
  div(v-if="$store.state.isAuthenticated")
    v-btn(icon,large)
      v-avatar(size="32px")
          img(:src="avatar",alt="")
    strong(v-html="name")
</template>

<script>
export default {
  computed: {
    // a computed getter
    avatar: function() {
      return this.$store.state.user ? this.$store.state.user.avatar : ''
    },
    name: function() {
      return this.$store.state.user ? this.$store.state.user.name : ''
    }
  }
}
</script>