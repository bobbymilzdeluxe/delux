<template>
  <div>
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
            Codes - {{ codes.length }}
          </div>
          <div>
            <VBtn
              color="accent"
              outlined
              @click="generateCode"
              :loading="loading.ims"
              >Generate Code</VBtn
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
              :length="codes.length"
              icon="mdi-code-array"
              text="All Codes"
              color="accent"
            />
          </vContainer>
        </vContainer>
      </VCol>
    </VRow>

    <div class="white pt-5" v-if="codes.length > 0">
      <v-row class="mx-0 px-0" justify="center">
        <VCol
          cols="12"
          md="8"
          class="my-1 py-0"
          v-for="code in codes"
          :key="code.id"
        >
          <!-- add 'to' (route) the userID.... -->
          <admin-prop-card
            :title="`${code.code}`"
            :Data="code"
            :actions="userActions"
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
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'adminLayout',
  computed: {
    ...mapGetters({
      state: 'adminflow/getState',
      loading: 'adminflow/getLoading',
    }),
    codes() {
      const codes = this.state('allCodes')
      return codes
    },
    userActions() {
      return [
        {
          color: 'accent',
          is: true,
          text: 'Copy Code',
          action: ($event, data) => {
            navigator.clipboard.writeText(data.code)
            this.$store.dispatch('authentication/initAlert', {
              is: true,
              message: 'Code Copied Successfully',
              close: true,
              type: 'success',
            })
          },
        },
        {
          color: 'red',
          is: true,
          text: 'Delete Code',
          action: ($event, data) => {
            this.deleteCode(data.id)
          },
        },
      ]
    },
  },
  methods: {
    ...mapActions({
      codeFN: 'adminflow/codeFN',
      deleteCode: 'adminflow/deleteCode',
    }),

    generateCode() {
      let code = ''
      for (let index = 0; index < 6; index++) {
        const rando = Math.round(Math.random() * 9)
        code = code + rando.toString()
      }

      const payload = {
        code: code,
        category: 'codes',
        used: false,
        date: this.getCurrentTimeAndDate(),
        formattedDate: this.getCurrentTimeAndDate('format'),
      }

      this.codeFN(payload)
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
