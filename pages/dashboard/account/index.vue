<template>
  <div>
    <v-row class="mx-0 px-0" justify="center">
      <VCol cols="12" class="mx-0 px-0">
        <VCard
          flat
          outlined
          class="pa-5"
          tile
          to="/dashboard/account/profile"
          @click="() => {}"
        >
          <div class="d-flex align-center" style="gap: 15px">
            <!-- supposed profile image commented -->
            <div>
              <v-img src="/logo/line.svg" contain> </v-img>
            </div>
            <div>
              <p
                class="black--text mb-0 pb-0 text-subtitle-2 text-md-subtitle-1"
              >
                {{ user && user.fullName }}
              </p>
              <p
                class="black--text mb-0 pb-0 font-weight-light text-body-2 text-md-body-1"
              >
                Client ID: {{ user && user.userID }}
              </p>
              <p class="black--text mb-0 pb-0 font-weight-thin text-caption">
                Joined : {{ user && user.joinDate }}
              </p>
              <p class="mb-0 pb-0">
                <VBtn
                  :color="verify ? 'green' : 'red'"
                  text
                  class="ma-0 pa-0"
                  :ripple="false"
                  small
                  >{{ verify ? 'Verified' : 'Unverified' }}</VBtn
                >
              </p>
            </div>
            <VSpacer />

            <div>
              <VIcon color="secondary">mdi-chevron-right</VIcon>
            </div>
          </div>
        </VCard>
      </VCol>

      <VCol
        cols="12"
        md="8"
        class="my-0 py-0"
        v-for="(link, i) in accountLinks"
        :key="link.name"
        @click="link.actions"
      >
        <div>
          <VCard
            @click="() => {}"
            :to="link.to"
            color="white"
            class="pa-5"
            flat
            tile
          >
            <div class="d-flex align-center" style="gap: 9px">
              <div>
                <!-- <v-img src="/icons/user.svg" contain width="25"></v-img> -->
                <VIcon
                  :color="link.icon != 'mdi-logout' ? 'secondary' : 'red'"
                  >{{ link.icon }}</VIcon
                >
              </div>
              <div>
                <p
                  class="text-body-2 text-md-body-1 font-weight-light black--text mb-0 pb-0"
                >
                  {{ link.name }}
                </p>
              </div>
              <VSpacer />
              <div class="font-weight-bold">
                <VIcon color="secondary">mdi-chevron-right</VIcon>
              </div>
            </div>
          </VCard>
          <VDivider class="" v-if="i != accountLinks.length - 1" />
        </div>
      </VCol>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  layout: 'dashboard',
  mounted() {
    window.scrollBy(0, 0)
  },

  computed: {
    ...mapGetters({
      user: 'authentication/getUser',
      state: 'userflow/getState',
    }),

    verify() {
      const verification = this.state('verify')
      // const verify = verification.find((verify) => {
      //   return verify.id == (this.user && this.user.userID)
      // })

      if (
        verification &&
        verification.selfieStatus == 'approved' &&
        verification.documentStatus == 'approved'
      )
        return true
      else return false
    },

    accountLinks() {
      return [
        {
          icon: 'mdi-badge-account',
          name: 'Submit Your Document',
          to: '/dashboard/account/verification',
          actions: () => {},
        },
        {
          icon: 'mdi-account-circle',
          name: 'Profile',
          to: '/dashboard/account/profile',
          actions: () => {},
        },
        {
          icon: 'mdi-account-question',
          name: 'Support',
          to: '/dashboard/account/support',
          actions: () => {},
        },
        {
          icon: 'mdi-credit-card',
          name: 'Virtual Card',
          to: '/dashboard/account/card',
          actions: () => {},
        },
        {
          icon: 'mdi-shield-lock',
          name: 'Security settings',
          to: '/dashboard/account/security',
          actions: () => {},
        },
        // {
        //   icon: '',
        //   name: 'Credit Report',
        //   to: '',
        // },
        // {
        //   icon: '',
        //   name: 'Deluxe Integrity Bank Xpress',
        //   to: '',
        // },
        {
          icon: 'mdi-information-variant',
          name: 'About Deluxe Integrity Bank',
          to: '/dashboard/account/about',
          actions: () => {},
        },
        {
          icon: 'mdi-logout',
          name: 'Sign Out',
          to: '',
          actions: () => {
            this.signOut()
          },
        },
      ]
    },
  },
  methods: {
    ...mapActions({ signOut: 'authentication/signOut' }),
    signOutUser() {
      this.signOut()
    },
  },
}
</script>

<style></style>
