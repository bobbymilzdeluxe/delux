<template>
  <div style="min-height: 100vh" class="accent">
    <VCol cols="12">
      <VCard color="accent" class="my-5 pb-4" dark flat rounded="xl">
        Users Management
      </VCard>
    </VCol>

    <VRow class="mx-0 px-0">
      <VCol cols="12" md="4" v-for="user in userData" :key="user.icon">
        <vContainer class="my-0 py-0">
          <vContainer class="my-0 py-0">
            <admin-card
              :length="user.length"
              :icon="user.icon"
              :text="user.text"
              :to="user.to"
              :color="user.color"
            />
          </vContainer>
        </vContainer>
      </VCol>
    </VRow>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminCard from '~/components/adminUtils/adminCard.vue'
export default {
  components: { adminCard },

  layout: 'adminLayout',
  computed: {
    ...mapGetters({ state: 'adminflow/getState' }),

    userData() {
      return [
        {
          icon: 'mdi-account-group',
          text: 'All Users',
          length: this.users && this.users.length,
          to: '/admin/users/allUsers',
        },
        {
          icon: 'mdi-account-star',
          text: 'All Activated Users(Made Active)',
          length: this.activeUsers && this.activeUsers.length,
          color: 'green',
          to: '/admin/users/activeUsers',
        },
        {
          icon: 'mdi-account-cancel',
          text: 'All Blocked Users(Made Blocked)',
          length: this.blockedUsers && this.blockedUsers.length,
          color: 'red',
          to: '/admin/users/blockedUsers',
        },
      ]
    },

    users() {
      const users = this.state('allUsers')
      return users.filter((user) => {
        return user.role == 'user'
      })
    },
    activeUsers() {
      const active = this.users.filter((user) => {
        return user.active
      })
      return active
    },
    blockedUsers() {
      const blocked = this.users.filter((user) => {
        return user.blocked
      })
      return blocked
    },
  },
}
</script>

<style></style>
