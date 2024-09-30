<template>
  <div class="mt-10">
    <!-- <v-row class="mx-0 px-0 white" justify="center" align="center">
      <VCol cols="12" md="4" class="white">
        <vContainer>
          <vContainer>
            <admin-card
              cardColor="accent"
              :icon="dynamicCard.icon"
              :color="dynamicCard.color"
              :text="dynamicCard.text"
              :length="dynamicCard.length"
            />
          </vContainer>
        </vContainer>
      </VCol>
    </v-row> -->

    <v-row class="white text-center mx-auto" justify="center">
      <VCol cols="11" md="6" class="mt-0 pt-0">
        <VTextField
          v-model="search"
          label="Search User"
          color="accent"
          prepend-inner-icon="mdi-text-search"
        />
      </VCol>
    </v-row>

    <div class="white" v-if="dynamicUsers.length > 0">
      <v-row class="mx-0 px-0" justify="center">
        <VCol
          cols="12"
          md="8"
          class="my-1 py-0"
          v-for="user in dynamicUsers"
          :key="user.userID"
        >
          <!-- add to (route) the userID.... -->
          <admin-prop-card
            :actions="userActions"
            :active="user.active"
            :title="user.fullName"
            :bigText="user.email"
            :blocked="user.blocked"
            :date="user.joinDate"
            :Data="user"
          />
        </VCol>
      </v-row>
    </div>

    <div v-else class="white">
      <v-row class="mx-0 px-0" justify="center">
        <VCol cols="12" md="8" class="mx-auto text-center">
          <VIcon color="accent" size="100">mdi-filter-variant</VIcon>
          <p class="accent--text text-center font-weight-medium">Empty</p>
        </VCol>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import adminCard from '~/components/adminUtils/adminCard.vue'
import AdminPropCard from '~/components/adminUtils/adminPropCard.vue'
export default {
  components: { adminCard, AdminPropCard },
  layout: 'adminLayout',
  // mounted() {
  //   setTimeout(() => {
  //     this.$store.dispatch('adminflow/initAdmin')
  //   }, 3000)
  // },
  data() {
    return {
      search: '',
    }
  },
  computed: {
    ...mapGetters({ state: 'adminflow/getState' }),

    // dynamicCard() {
    //   const dynamicCard = {
    //     allUsers: {
    //       icon: 'mdi-account-group',
    //       text: 'All Users',
    //       color: 'white',
    //       length: this.users.length,
    //     },
    //     activeUsers: {
    //       icon: 'mdi-account-star',
    //       text: 'Activated Users',
    //       color: 'green',
    //       length: this.activeUsers.length,
    //     },
    //     blockedUsers: {
    //       icon: 'mdi-account-cancel',
    //       text: 'Blocked Users',
    //       color: 'red',
    //       length: this.blockedUsers.length,
    //     },
    //   }
    //   return dynamicCard[this.$route.params.id]
    // },

    dynamicUsers() {
      return this.users
    },

    users() {
      const users = this.state('allUsers')
      return users.filter((user) => {
        return (
          user.role == 'user' &&
          (user.fullName.includes(this.search) ||
            user.fullName.toLowerCase().includes(this.search) ||
            user.email.includes(this.search))
        )
      })
    },

    // blockedUsers() {
    //   const users = this.state('allUsers')
    //   return users.filter((user) => {
    //     return (
    //       user.role == 'user' &&
    //       ((user.blocked && user.fullName.includes(this.search)) ||
    //         (user.blocked &&
    //           user.fullName.toLowerCase().includes(this.search)) ||
    //         (user.blocked && user.email.includes(this.search)))
    //     )
    //   })
    // },

    // activeUsers() {
    //   const users = this.state('allUsers')
    //   return users.filter((user) => {
    //     return (
    //       user.role == 'user' &&
    //       ((user.active && user.fullName.includes(this.search)) ||
    //         (user.active &&
    //           user.fullName.toLowerCase().includes(this.search)) ||
    //         (user.active && user.email.includes(this.search)))
    //     )
    //   })
    // },

    userActions() {
      return [
        {
          is: true,
          color: 'accent',
          text: 'View User',
          to: true,
          action: ($event, data) => {
            console.log(data)
          },
        },

        //for activating and deactivating user
        {
          is:
            this.$route.params.id != 'activeUsers' &&
            this.$route.params.id != 'blockedUsers'
              ? true
              : false,
          color: 'green',
          text: 'Activate',
          action: ($event, data) => {
            if (data.active) {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} Account is Already ACTIVE`,
                timer: 4000,
                close: true,
              })
            } else {
              let message = `${data.fullName} Account Has Now Become ACTIVE`

              this.dyUpdate('users', data.userID, { active: true }, message)
            }
          },
        },
        {
          is: this.$route.params.id == 'activeUsers' ? true : false,
          color: 'red',
          text: 'Deactivate',
          action: ($event, data) => {
            if (!data.active) {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} Account is Not ACTIVE`,
                timer: 4000,
                close: true,
              })
            } else {
              let message = `${data.fullName} Account Has Now Been DEACTIVATED`

              this.dyUpdate('users', data.userID, { active: false }, message)
            }
          },
        },

        //for blocking and unblocking users
        {
          is:
            this.$route.params.id != 'blockedUsers' &&
            this.$route.params.id != 'activeUsers'
              ? true
              : false,
          color: 'red',
          text: 'Block',
          action: ($event, data) => {
            if (data.blocked) {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} Account is Already BLOCKED`,
                timer: 4000,
                close: true,
              })
            } else {
              let message = `${data.fullName} Account Has Now Been BLOCKED From Logging Into The Site`

              this.dyUpdate('users', data.userID, { blocked: true }, message)
            }
          },
        },
        {
          is: this.$route.params.id == 'blockedUsers' ? true : false,
          color: 'green',
          text: 'Unblock',
          action: ($event, data) => {
            if (!data.blocked) {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} Account is Not BLOCKED`,
                timer: 4000,
                close: true,
              })
            } else {
              let message = `${data.fullName} Account Has Now Been UNBLOCKED`

              this.dyUpdate('users', data.userID, { blocked: false }, message)
            }
          },
        },
      ]
    },
  },
  methods: {
    ...mapActions({ dynamicUpdate: 'adminflow/dynamicUpdate' }),
    dyUpdate(category, id, data, message) {
      // data is what is being changed in database

      const payload = {
        category: category,
        id: id,
        data: data,
        message: message,
      }
      this.dynamicUpdate(payload)
    },
  },
}
</script>

<style></style>
