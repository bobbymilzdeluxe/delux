<template>
  <div v-if="user && user.role == 'admin'">
    <VApp class="accent">
      <v-app-bar height="50" class="accent" flat app>
        <v-app-bar-nav-icon
          class=""
          color=""
          dark
          v-if="!drawer"
          @click="drawer = true"
        ></v-app-bar-nav-icon>

        <v-toolbar-title
          class="white--text ml-0 pl-0 text-body-1 font-weight-regular text--darken-1"
          @click="printText"
          >ADMIN DASHBOARD</v-toolbar-title
        >
        <v-spacer></v-spacer>

        <div class="">
          <!-- <v-img
                src="/icons/account.svg"
                contain
                width="11"
                height="25"
              ></v-img> -->
          <div>
            <!-- <v-google-translate class="white--text mr-2" /> -->
            <VIcon color="white" @click="$router.push('/admin/profile')"
              >mdi-account-circle</VIcon
            >
          </div>
        </div>
        <!-- <v-btn
          active-class="transparent"
          class="transparent"
          icon
          small
          fab
          color="transparent"
          to="/dashboard/notifications"
        >
          <v-img
            :src="
              $route.path.includes('notifications')
                ? '/icons/bell.svg'
                : '/icons/bell2.svg'
            "
            contain
            width="10"
            height="25"
          ></v-img>
        </v-btn> -->
      </v-app-bar>

      <!-- navigation section -->
      <VNavigationDrawer
        app
        v-model="drawer"
        :mini-variant.sync="mini"
        dark
        class="white"
        width="220"
      >
        <v-list-item class="px-1 my-2">
          <div class="text-center mx-auto">
            <v-img src="/logo/line2.svg" width="55" contain></v-img>
          </div>

          <!-- <v-list-item-title>John Leider</v-list-item-title> -->

          <v-btn icon @click.stop="mini = !mini">
            <v-icon color="accent">mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider class="my-1"></v-divider>

        <v-list
          dense
          color="transparent"
          style="border-radius: 7px; overflow: hidden"
        >
          <v-list-item
            v-for="item in items"
            @click="item.action"
            :key="item.title"
            link
            class="mx-2 my-1 pl-1"
            :to="item.to"
            active-class="white"
            color="accent"
            style="border-radius: 7px; overflow: hidden"
          >
            <v-list-item-icon>
              <v-icon
                :color="item.title == 'Logout' ? 'red' : 'accent'"
                class="ml-1"
                :class="
                  item.title == 'Logout' ? 'red--text mt-3' : 'accent--text'
                "
                >{{ item.icon }}</v-icon
              >
            </v-list-item-icon>

            <v-list-item-content class="ml-n5">
              <v-list-item-title
                :class="
                  item.title == 'Logout' ? 'red--text mt-2' : 'accent--text'
                "
                >{{ item.title }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </VNavigationDrawer>

      <main class="mt-n2">
        <v-main>
          <v-slide-y-transition>
            <keep-alive>
              <nuxt class="accent" @load="toTop" />
            </keep-alive>
          </v-slide-y-transition>
        </v-main>
      </main>
      <alert-comp />
    </VApp>
  </div>

  <div
    v-else
    style="min-height: 100vh; min-width: 100vw; background: #2c1762"
  ></div>
</template>

<script>
import { mapGetters } from 'vuex'
import alertComp from '~/components/utils/alertComp.vue'
export default {
  components: { alertComp },
  async created() {
    this.$store.dispatch('authentication/userWatch', 'admin')
    if (this.$vuetify.breakpoint.mdAndDown) {
      this.drawer = false
    } else {
      this.drawer = true
    }
    window.scroll({
      behavior: 'smooth',
      top: 0,
      left: 0,
    })
  },
  // async mounted() {
  //   setTimeout(() => {
  //     const role = this.user && this.user.role
  //     if (role != 'admin') {
  //       this.$store.commit('authentication/setUser', null)
  //       this.$router.push('/login')
  //     }
  //   }, 3000)
  // },
  data() {
    return {
      drawer: false,
      mini: false,
    }
  },
  computed: {
    ...mapGetters({ user: 'authentication/getUser' }),
    items() {
      return [
        {
          title: 'Home',
          icon: 'mdi-home',
          to: '/admin/dashboard',
          action: () => {},
        },
        {
          title: 'User Management',
          icon: 'mdi-account-group',
          to: '/admin/users',
          action: () => {},
        },
        {
          title: 'Transfer Management',
          icon: 'mdi-bank',
          to: '/admin/transfers',
          action: () => {},
        },
        // {
        //   title: 'Loans Management',
        //   icon: 'mdi-handshake',
        //   to: '/admin/loans',
        //   action: () => {},
        // },
        {
          title: 'Crypto Deposits Management',
          icon: 'mdi-orbit',
          to: '/admin/crypto-deposits',
          action: () => {},
        },
        {
          title: 'Crypto Withdrawal Management',
          icon: 'mdi-atom-variant',
          to: '/admin/crypto-withdraw',
          action: () => {},
        },
        {
          title: 'Virtual Card Management',
          icon: 'mdi-credit-card',
          to: '/admin/cards',
          action: () => {},
        },
        // {
        //   title: 'Identity Verifications',
        //   icon: 'mdi-card-account-details',
        //   to: '/admin/identity',
        //   action: () => {},
        // },
        // {
        //   title: 'Selfie Verifications',
        //   icon: 'mdi-face-man',
        //   to: '/admin/selfie',
        //   action: () => {},
        // },
        {
          title: 'Notifications Management',
          icon: 'mdi-bell',
          to: '/admin/notifications',
          action: () => {},
        },
        {
          title: 'Codes',
          icon: 'mdi-code-array',
          to: '/admin/codes',
          action: () => {},
        },

        {
          title: 'Logout',
          icon: 'mdi-power-standby',
          to: '',
          action: () => {
            this.signOutUser()
          },
        },
      ]
    },
  },
  methods: {
    signOutUser() {
      this.$store.dispatch('authentication/signOut')
    },
    toTop() {
      window.scroll({
        behavior: 'smooth',
        top: 0,
        left: 0,
      })
    },
    printText() {
      // window.print()
      console.log('window print api used here')
    },
  },
}
</script>

<style></style>
