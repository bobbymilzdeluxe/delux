<template>
  <div class="white">
    <v-row class="mx-0 px-0 white" justify="center">
      <VCol cols="12" md="8" class="white">
        <VCard
          color="white"
          class="my-5 pb-4 d-flex justify-space-between align-center"
          dark
          flat
          rounded="xl"
        >
          <div class="accent--text text-h6 font-weight-bold">
            Notifications
            <!-- {{ notifications.length }} -->
          </div>
          <div>
            <VBtn color="accent" outlined to="/admin/notifications/send"
              >Send To User(s)</VBtn
            >
          </div>
        </VCard>
      </VCol>
    </v-row>

    <VRow class="mx-0 px-0 white" justify="center">
      <VCol cols="12" md="4">
        <vContainer class="py-0 my-0">
          <vContainer class="py-0 my-0">
            <admin-card
              length=""
              icon="mdi-bell-badge"
              text="All Notifications"
              color="accent"
            />
          </vContainer>
        </vContainer>
      </VCol>
    </VRow>

    <!-- <v-row class="white text-center mx-auto" justify="center">
      <VCol cols="11" md="6" class="mt-0 pt-0">
        <VTextField
          v-model="search"
          label="Search User Notification"
          color="accent"
          prepend-inner-icon="mdi-text-search"
        />
      </VCol>
    </v-row> -->

    <!-- <div class="white" v-if="notifications.length > 0">
      <v-row class="mx-0 px-0" justify="center">
        <VCol
          cols="12"
          md="8"
          class="my-1 py-0"
          v-for="notify in notifications.slice(0, 50)"
          :key="notify.id"
        >
          <admin-prop-card
            :title="`${notify.fullName} - ${notify.title}`"
            :bigText="notify.message"
            :smallText="notify.email"
            :date="notify.date"
            :Data="notify"
            :notify="false"
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
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminCard from '~/components/adminUtils/adminCard.vue'
import AdminPropCard from '~/components/adminUtils/adminPropCard.vue'

export default {
  components: { adminCard, AdminPropCard },
  layout: 'adminLayout',
  data() {
    return {
      search: '',
    }
  },
  computed: {
    ...mapGetters({ state: 'adminflow/getState' }),
    notifications() {
      const notifications = this.state('allNotifications')
      return notifications.filter((notify) => {
        return (
          notify.fullName.includes(this.search) ||
          notify.fullName.toLowerCase().includes(this.search) ||
          notify.email.includes(this.search) ||
          notify.title.includes(this.search) ||
          notify.title.toLowerCase().includes(this.search)
        )
      })
    },
  },
}
</script>

<style></style>
