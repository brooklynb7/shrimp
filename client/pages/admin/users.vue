<template lang="pug">
div
  v-layout(row,wrap)
    listHeader(title="用户管理")
    v-flex(xs12,sm12,md12,lg12,xl12)
      v-data-table(class="hidden-sm-and-down",:loading="loading",:items="users",class="elevation-1",hide-actions,:headers="headers",:no-data-text="noDataText")
        template(slot="items", slot-scope="props")
          td
            v-tooltip(bottom)
              span(slot="activator") {{ getUsername(props.item) }}
              span {{ props.item.username }}
          td {{ props.item.name }}
          td {{ props.item.mobile }}
          td
            v-checkbox(v-model="props.item.isAdmin",color="primary",@click="toggleIsAdmin(props.item)")
          td {{ getProvider(props.item.provider) }}
          td {{ getRegTime(props.item.created) }}
          td(class="justify-center layout px-0")
            v-btn(icon,class="mx-0",disabled,@click="editItem(props.item)")
              v-icon(color="teal") edit
            v-btn(icon,class="mx-0",@click="deleteUser(props.item)")
              v-icon(color="pink") delete
      v-list(two-line,class="hidden-md-and-up elevation-2")
        template(v-for="(item, index) in users")
          v-list-tile(:key="item._id",@click="bottomSheet = !bottomSheet; bottomSheetItem=item",ripple,class="user-item")
            roleChip(:item="item")
            v-list-tile-avatar(size="32")
              img(:src="item.avatar")
            v-list-tile-content
              v-list-tile-sub-title 微信/昵称: {{ item.name }}
              v-list-tile-sub-title 名字: {{ getRoleNameText(item) }}
            v-list-tile-action
              v-icon(small,class="mt-4") more_vert
          v-divider(v-if="index + 1 < users.length",:key="index")
  v-bottom-sheet(v-model="bottomSheet")    
    v-list(three-line)
      v-list-tile
        roleChip(:item="bottomSheetItem")        
        v-list-tile-avatar
          img(:src="bottomSheetItem.avatar")
        v-list-tile-content
          v-list-tile-sub-title 微信/昵称: {{ bottomSheetItem.name }}          
          v-list-tile-sub-title 名字: {{ getRoleNameText(bottomSheetItem) }}
          v-list-tile-sub-title 来源: {{getProvider(bottomSheetItem.provider)}}
          v-list-tile-sub-title 备注: {{ bottomSheetItem.memo}}
      v-divider
    v-list
      v-list-tile
        v-flex(xs3,offset-xs9)
          v-switch(label="行政",color="primary",hide-details,v-model="bottomSheetItem.isAdmin",@click="toggleIsAdmin(bottomSheetItem)")
      v-list-tile
        v-flex(xs12)
          v-btn(block,outline,color="error",@click="deleteUser(bottomSheetItem)",:loading="loadingRemove") 删除用户
</template>

<script>
import moment from 'moment';
import formatter from '../../utils/formatter';
import listHeader from '../../components/listHeader';
import roleChip from '../../components/roleChip';

export default {
  components: { listHeader, roleChip },
  data: () => {
    return {
      loadingRemove: false,
      bottomSheetItem: {},
      bottomSheet: false,
      dialog: false,
      noDataText: '暂时没有用户数据',
      loading: false,
      headers: [
        {
          text: '用户名',
          align: 'left',
          sortable: false,
          value: 'username'
        },
        {
          text: '微信/昵称',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: '手机',
          align: 'left',
          sortable: false,
          value: 'mobile',
          width: '180px'
        },
        {
          text: '行政',
          align: 'center',
          sortable: false,
          width: '5rem'
        },
        {
          text: '注册来源',
          align: 'left',
          sortable: false,
          value: 'provider',
          width: '6rem'
        },
        {
          text: '注册时间',
          align: 'left',
          sortable: false,
          value: 'created',
          width: '180px'
        },
        {
          text: '操作',
          align: 'center',
          sortable: false,
          value: 'name',
          width: '100px'
        }
      ],
      users: []
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getProvider: formatter.getProvider,
    getRoleNameText(item) {
      let name = [];
      if (item.teacherName) {
        name.push(item.teacherName);
      }
      if (item.parentName) {
        name.push(item.parentName);
      }
      return name.join(',');
    },
    getUsername(item) {
      let username = item.username;
      if (item.provider === 'wechat') {
        username = '[微信openid]';
      }
      return username;
    },
    getRegTime(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss');
    },
    async toggleIsAdmin(item) {
      this.loading = true;
      try {
        this.$api.updateUserIsAdmin({
          id: item._id,
          isAdmin: !item.isAdmin
        });
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    async getUsers() {
      this.loading = true;
      try {
        const users = await this.$api.getUsers();
        this.users = users.results;
      } catch (err) {
        alert(err);
      } finally {
        this.loading = false;
      }
    },
    deleteUser(user) {
      confirm(`您确定要删除用户 ${user.name} 吗?`) && this.removeUser(user);
    },
    async removeUser(user) {
      this.loadingRemove = true;
      try {
        await this.$api.removeUser(user._id);
        this.loadingRemove = false;
        const idx = this.users.indexOf(user);
        const index = this.users.indexOf(user);
        this.users.splice(index, 1);
        this.bottomSheet = false;
        this.bottomSheetItem = {};
      } catch (err) {
        alert(err.response.data.errmsg);
      } finally {
        this.loadingRemove = false;
      }
    },
    editItem(item) {},
    deleteItem(item) {}
  }
};
</script>