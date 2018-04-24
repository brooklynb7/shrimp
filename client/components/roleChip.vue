<template lang="pug">
v-chip(color="primary",class="user-item-chip",small,outline,disabled,v-if="getRoleText(item)") {{ getRoleText(item) }}
</template>

<script>
import formatter from '../utils/formatter'

export default {
  data: () => {
    return {}
  },
  props: {
    item: Object
  },
  methods: {
    getRoleText: formatter.getRoleText
  }
}
</script>