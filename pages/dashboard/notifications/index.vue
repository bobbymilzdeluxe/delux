<template>
  <div>
    <v-row class="mx-0 px-0" justify="center">
      <VCol cols="12" md="8">
        <VCol cols="12">
          <section class="d-flex align-center justify-space-between">
            <div>
              <VIcon @click="$router.go(-1)" color="grey"
                >mdi-chevron-left</VIcon
              >
            </div>

            <div
              class="text-center grey--text text--darken-3 font-weight-medium text-subtitle-1 text-md-h6"
            >
              Notifications
            </div>
            <div></div>
          </section>
          <VDivider class="mt-4" />
        </VCol>

        <VCol cols="12" v-if="notifications.length > 0" class="ma-0 pa-0">
          <VCol
            cols="12"
            v-for="notify in notifications"
            :key="notify.id"
            class="my-0 py-0 my-1"
          >
            <v-card
              @click="() => {}"
              flat
              color="grey lighten-5 pa-3 pa-md-5"
              rounded="xl"
              dark
              class="d-flex align-start"
              :class="
                notify.open == false
                  ? 'animate__animated animate__bounceIn animate__repeat-2 delay'
                  : null
              "
              style="gap: 12px; overflow: hidden"
            >
              <div>
                <VBtn
                  :class="`${notify.color} lighten-5`"
                  :ripple="false"
                  icon
                  small
                  fab
                >
                  <VIcon :color="notify.color">{{ notify.icon }}</VIcon>
                </VBtn>
              </div>
              <div>
                <p
                  class="font-weight-medium text-capitalize grey--text text--darken-3 text-body-2 text-md-body-1 my-0 py-0"
                >
                  {{ notify.title }}
                </p>
                <p
                  class="my-0 py-0 text--darken-2 grey--text font-weight-light text-body-2"
                >
                  {{ notify.message }}
                </p>
                <p class="text-caption grey--text mb-0 pb-0 font-weight-light">
                  {{ notify.date }}
                </p>
              </div>
            </v-card>
          </VCol>
        </VCol>
        <VCol cols="12" v-else class="white">
          <div class="white">
            <v-row class="mx-0 px-0" justify="center">
              <VCol cols="12" md="8" class="mx-auto text-center">
                <VIcon color="secondary" size="100">mdi-filter-variant</VIcon>
                <p class="accent--text text-center font-weight-medium">
                  No Notification Yet
                </p>
              </VCol>
            </v-row>
          </div>
        </VCol>
      </VCol>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'dashboard',
  mounted() {
    window.scrollBy(0, 0)
  },
  async mounted() {
    setTimeout(() => {
      const filteredNotifications = this.notifications.filter((notify) => {
        return notify.open == false
      })

      if (filteredNotifications.length > 0) {
        filteredNotifications.forEach((filter) => {
          this.dyUpdate(
            'notifications',
            filter.id,
            { open: true },
            'Notifications Updated',
            true
          )
          this.$store.dispatch('userflow/initUserNotifications')
        })
      }
    }, 5000)
  },
  data() {
    return {
      num: 1,
    }
  },
  computed: {
    ...mapGetters({ state: 'userflow/getState' }),
    notifications() {
      return this.state('userNotifications')
    },
  },
  methods: {
    ...mapActions({ dynamicUpdate: 'adminflow/dynamicUpdate' }),
    dyUpdate(category, id, data, message, show) {
      // data is what is being changed in database

      const payload = {
        category: category,
        id: id,
        data: data,
        message: message,
        show: show,
      }
      this.dynamicUpdate(payload)
    },
  },
}
</script>

<style>
.delay {
  --animate-delay: 0.3s;
  -o-animation-delay: 0.3s;
  -moz-animation-delay: 0.3s;
  -webkit-animation-delay: 0.3s;
}
</style>
