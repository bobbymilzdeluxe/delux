<template>
  <div>
    <!-- old livechat -->
    <!-- <head>
      Smartsupp Live Chat script
<script type="text/javascript">
var _smartsupp = _smartsupp || {};
_smartsupp.key = 'e43c5f60131305692e2233dc2a3c1cd5484cef09';
window.smartsupp||(function(d) {
  var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
  s=d.getElementsByTagName('script')[0];c=d.createElement('script');
  c.type='text/javascript';c.charset='utf-8';c.async=true;
  c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
})(document);
</script>
<noscript> Powered by <a href=“https://www.smartsupp.com” target=“_blank”>Smartsupp</a></noscript>
    </head> -->
    <v-app>
      <head>
        <head>
          <!-- Smartsupp Live Chat script -->
          <script type="text/javascript">
            var _smartsupp = _smartsupp || {}
            _smartsupp.key = 'cbb37b6034ce2c6d793443b75257a3636102c9c1'
            window.smartsupp ||
              (function (d) {
                var s,
                  c,
                  o = (smartsupp = function () {
                    o._.push(arguments)
                  })
                o._ = []
                s = d.getElementsByTagName('script')[0]
                c = d.createElement('script')
                c.type = 'text/javascript'
                c.charset = 'utf-8'
                c.async = true
                c.src = 'https://www.smartsuppchat.com/loader.js?'
                s.parentNode.insertBefore(c, s)
              })(document)
          </script>
          <!-- <noscript> Powered by <a href=“https://www.smartsupp.com” target=“_blank”>Smartsupp</a></noscript> -->
        </head>
      </head>
      <v-app-bar height="50" class="transparent" flat app>
        <v-app-bar-nav-icon
          class=""
          color="accent"
          v-if="!drawer"
          @click="drawer = true"
        ></v-app-bar-nav-icon>

        <!-- <v-toolbar-title
          class="accent--text ml-0 pl-0 text-body-1 font-weight-regular text--darken-1"
          @click="printText"
          >Hi, {{ user && user.lastName }}</v-toolbar-title
        > -->

        <v-toolbar-title
          class="accent--text ml-0 pl-0 text-body-1 font-weight-regular text--darken-1 text-uppercase"
          @click="printText"
        >
          {{
            $route.path.slice($route.path.lastIndexOf('/') + 1)
          }}</v-toolbar-title
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
            <v-google-translate class="accent--text mr-2 text-body-2" />
          </div>
        </div>
        <VBadge
          right
          :color="
            notify && notify.open
              ? 'transparent'
              : filteredNotifications.length > 0 &&
                !$route.path.includes('notifications')
              ? 'secondary'
              : 'transparent'
          "
          offset-x="12"
          transition="dialog-transition"
          offset-y="13"
          :content="
            filteredNotifications.length > 0 &&
            !$route.path.includes('notifications')
              ? filteredNotifications.length
              : null
          "
        >
          <v-btn
            active-class="transparent"
            class="transparent"
            icon
            x-small
            fab
            color="transparent"
            to="/dashboard/notifications"
          >
            <v-img
              :src="'/icons/bell.svg'"
              :style="`filter: grayscale(${
                $route.path.includes('notifications') ? '0' : '100%'
              }`"
              contain
              width="10"
              height="25"
            ></v-img>
          </v-btn>
        </VBadge>
      </v-app-bar>

      <VNavigationDrawer
        app
        v-model="drawer"
        :mini-variant.sync="mini"
        dark
        class="accent"
        width="220"
      >
        <v-list-item class="px-1 my-2">
          <div class="text-center mx-auto">
            <v-img src="/logo/line.svg" width="50" contain></v-img>
          </div>
          <!-- <div class="text-center mx-auto" v-if="mini == false">
            <v-img
              src="https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6453eb55073030cb720870f7_carbon-logo-white.webp"
              max-width="150"
              min-width="150"
              contain
            ></v-img>
          </div> -->

          <!-- <v-list-item-title>John Leider</v-list-item-title> -->

          <v-btn icon @click.stop="mini = !mini">
            <v-icon color="secondary">mdi-chevron-left</v-icon>
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
            active-class="secondary"
            color="transparent"
            style="border-radius: 7px; overflow: hidden"
          >
            <v-list-item-icon>
              <v-icon
                :color="item.title == 'Logout' ? 'red' : 'white'"
                class="ml-1"
                :class="
                  item.title == 'Logout' ? 'red--text mt-3' : 'primary2--text'
                "
                >{{ item.icon }}</v-icon
              >
            </v-list-item-icon>

            <v-list-item-content class="ml-n5">
              <v-list-item-title
                :class="
                  item.title == 'Logout' ? 'red--text mt-2' : 'white--text'
                "
                >{{ item.title }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </VNavigationDrawer>

      <main>
        <v-main>
          <keep-alive>
            <v-slide-y-transition>
              <nuxt class="white" @load="toTop" />
            </v-slide-y-transition>
          </keep-alive>
        </v-main>
      </main>
      <alert-comp />
    </v-app>
  </div>
</template>

<script>
import 'animate.css'
import { mapGetters } from 'vuex'
import alertComp from '~/components/utils/alertComp.vue'
export default {
  components: { alertComp },
  created() {
    this.$store.dispatch('authentication/userWatch', 'users')

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
  head() {
    return {
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js',
        },
        { src: '//code.tidio.co/qc5ystiutmlibbwy8kwjiowojguioxts.js' },
      ],
    }
  },
  data() {
    return {
      drawer: true,

      mini: true,

      show: false,
    }
  },
  computed: {
    ...mapGetters({
      user: 'authentication/getUser',
      state: 'userflow/getState',
    }),

    userNotifications() {
      const userNotifications = this.state('userNotifications')
      return userNotifications
    },

    notify() {
      const userNotifications = this.state('userNotifications')
      const notify = userNotifications.find((notify) => {
        return notify.open == false
      })
      return notify
    },

    filteredNotifications() {
      const userNotifications = this.state('userNotifications')
      const filteredNotifications = userNotifications.filter((notify) => {
        return notify.open == false
      })
      return filteredNotifications
    },

    items() {
      return [
        {
          title: 'Home',
          icon: 'mdi-home',
          to: '/dashboard/home',
          action: () => {},
        },
        {
          title: 'My Account',
          icon: 'mdi-account',
          to: '/dashboard/account',
          action: () => {},
        },
        {
          title: 'Virtual Card',
          icon: 'mdi-credit-card',
          to: '/dashboard/card',
          action: () => {},
        },
        {
          title: 'Crypto-withdrawal',
          icon: 'mdi-orbit',
          to: '/dashboard/crypto-withdrawal',
          action: () => {},
        },
        {
          title: 'Add-funds',
          icon: 'mdi-bank-transfer-in',
          to: '/dashboard/fund-account',
          action: () => {},
        },
        {
          title: 'Transfer',
          icon: 'mdi-bank-transfer-out',
          to: '/dashboard/transfer',
          action: () => {},
        },
        {
          title: 'All Transactions',
          icon: 'mdi-bank-transfer',
          to: '/dashboard/transactions',
          action: () => {},
        },
        {
          title: 'Loans',
          icon: 'mdi-handshake',
          to: '/dashboard/loan',
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

<style>
.transparent {
  background-color: rgba(255, 255, 255, 0);
  backdrop-filter: blur(4px);
}
.animate__animated.animate__tada {
  -o-animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;

  -o-animation-duration: 3s;
  -moz-animation-duration: 3s;
  -webkit-animation-duration: 3s;
}
</style>
