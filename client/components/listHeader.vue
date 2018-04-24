<template lang="pug">
div(class="mb-2 d-inline-flex align-center")
  span(class="title") {{title}}
  v-btn(small,color="primary",@click="handleAdd",class="hidden-sm-and-down",v-if="showAddBtn")
    v-icon(small) add
    span {{addText}}
</template>

<script>
export default {
  props: {
    title: String,
    addText: String,
    showAddBtn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleAdd: function() {
      this.$emit('add')
    }
  }
}
</script>