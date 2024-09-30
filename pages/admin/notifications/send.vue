<template>
  <div class="accent" style="min-height: 100vh">
    <v-row class="mx-0 px-0 accent" justify="center">
      <VCol cols="12" md="8">
        <VCard flat color="accent">
          <VCardText class="d-flex align-center">
            <div>
              <VIcon color="white" @click="$router.go(-1)"
                >mdi-chevron-left</VIcon
              >
            </div>
            <div>
              <p
                class="mb-0 pb-0 text-subtitle-1 white--text font-weight-medium"
              >
                Send Notification
              </p>
            </div>
            <VSpacer />
            <div>
              <VChip
                label
                color="white"
                :outlined="selectAll ? false : true"
                @click="selectAll = !selectAll"
                >{{
                  selectAll ? 'All Users Selected' : 'Select All Users'
                }}</VChip
              >
            </div>
          </VCardText>
          <VForm lazy-validation @submit.prevent="submit" ref="form">
            <VCol cols="12" v-if="!selectAll">
              <v-autocomplete
                v-model="users"
                :items="allUsers"
                label="List Of User(s) To Send To"
                item-text="fullName"
                return-object
                :rules="[(v) => !!v || 'User(s) is required']"
                color="white"
                multiple
                no-data-text="No User Listed"
                item-color="accent"
                deletable-chips
                dense
                chips
                clearable
                clear-icon="mdi-close"
                open-on-clear
                dark
                filled
              />
            </VCol>
            <VCol cols="12" v-else>
              <p class="white--text text-center font-weight-medium">
                You will be sending this notification to
                {{ allUsers.length }} users
              </p>
            </VCol>
            <VCol cols="12" class="my-0 py-0">
              <VSelect
                v-model="type"
                label="Notification Type"
                :items="['Information', 'Warning', 'Cash']"
                :rules="[(v) => !!v || 'Type of notification is required']"
                dark
                item-color="accent"
                filled
              />
            </VCol>
            <VCol cols="12" class="my-0 py-0">
              <VTextField
                v-model="title"
                :rules="[(v) => !!v || 'Title of notification is required']"
                label="Title Of Notification"
                dark
                filled
              />
            </VCol>
            <VCol cols="12" class="my-0 py-0">
              <VTextarea
                v-model="message"
                rows="2"
                label="Message"
                :rules="[(v) => !!v || 'Message is required']"
                dark
                filled
              />
            </VCol>
            <VCol cols="12">
              <VBtn
                color="secondary darken-2"
                type="submit"
                block
                depressed
                :loading="loading.notification"
                large
                >Send</VBtn
              >
            </VCol>
          </VForm>
        </VCard>
      </VCol>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'adminLayout',
  mounted() {
    setTimeout(() => {
      this.$store.dispatch('adminflow/initAdmin')
    }, 4000)
  },
  data() {
    return {
      selectAll: false,

      users: [],
      type: '',
      title: '',
      message: '',
    }
  },
  computed: {
    ...mapGetters({
      state: 'adminflow/getState',
      loading: 'userflow/getLoading',
    }),
    allUsers() {
      return this.state('allUsers').filter((users) => users.role == 'user')
    },
    icons() {
      const icons = {
        Information: {
          icon: 'mdi-information',
          color: 'blue',
          type: 'information',
        },
        Warning: {
          icon: 'mdi-alert',
          color: 'red',
          type: 'warning',
        },
        Cash: {
          icon: 'mdi-cash-multiple',
          color: 'green',
          type: 'cash',
        },
      }
      return icons[this.type]
    },
  },
  methods: {
    ...mapActions({
      notificationFN: 'userflow/notificationFN',
    }),

    submit() {
      if (this.selectAll) {
        this.users = this.allUsers
      } else {
        this.users = this.users
      }

      this.$refs.form.validate()
      const arr = []
      if (this.$refs.form.validate()) {
        this.users.forEach((user) => {
          const payload = {
            fullName: user.fullName,
            email: user.email,
            date: this.getCurrentTimeAndDate(),
            formattedDate: this.getCurrentTimeAndDate('format'),
            icon: this.icons.icon,
            open: false,
            color: this.icons.color,
            title: this.title,
            message: this.message,
            uid: user.userID,
            type: this.type,
          }

          arr.push(' ' + user.fullName)

          // console.log({ payload })
          this.notificationFN({ ...payload })
          setTimeout(() => {
            this.$refs.form.reset()
            this.$refs.form.resetValidation()
          }, 1200)

          this.$store.dispatch('initAllNotifications')

          this.$store.dispatch('authentication/initAlert', {
            is: true,
            message: `${arr.join(',')} Has Been Sent '${
              this.title
            }' Notification`,
            type: 'success',
            timer: 8000,
            close: true,
          })
        })
      }
    },

    getCurrentTimeAndDate(format) {
      const now = new Date()

      // Get time in 12-hour HH:MM AM/PM format
      let hours = now.getHours()
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const amOrPm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12 || 12 // Convert hours to 12-hour format
      const time = `${hours}:${minutes} ${amOrPm}`

      // Get date in DD/MM/YY format
      const day = now.getDate().toString().padStart(2, '0')
      const month = (now.getMonth() + 1).toString().padStart(2, '0') // Months are zero-based
      const year = now.getFullYear().toString().slice(-2)
      const date = `${format ? month : day}/${format ? day : month}/${year}`

      return `${time}, ${date}`
    },
  },
}
</script>

<style></style>
