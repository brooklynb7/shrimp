<template lang="pug">
  v-app
    v-navigation-drawer(app,fixed,clipped,v-model="drawer",width="180")
      v-list(dense)
        template(v-for="item in items")
          v-list-tile(router :to="item.link")
            v-list-tile-action
              v-icon {{ item.icon }}
            v-list-tile-content
              v-list-tile-title {{ item.text }}
    v-toolbar(app,color="blue darken-3",dark,:clipped-left="$vuetify.breakpoint.lgAndUp",fixed)
      v-toolbar-title(style="width:300px", class="ml-0 pl-3")
        v-toolbar-side-icon(@click.stop="drawer = !drawer")
        span(class="title") 后台管理
      v-spacer
      strong(v-if="$store.state.isAuthAdmin",v-html="$store.state.admin.name")
    v-content
      v-container(fluid,pa-3)
        nuxt
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { icon: 'person', text: '用户管理', link: '/admin/users' },
      { icon: 'feedback', text: '意见反馈', link: '/admin/feedbacks' },
      { icon: 'help', text: '帮助', link: '/admin/help' }
    ]
  }),
  methods: {
    nav: function(item) {
      this.$nuxt.$router.push({ path: item.link });
    }
  }
};
</script>
