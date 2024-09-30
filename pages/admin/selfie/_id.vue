<template>
  <div class="mt-1">
    <v-row class="mx-0 px-0 white" justify="center" align="center">
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
    </v-row>

    <v-row class="white text-center mx-auto" justify="center">
      <VCol cols="11" md="6" class="mt-0 pt-0">
        <VTextField
          v-model="search"
          label="Search Selfie Image"
          color="accent"
          prepend-inner-icon="mdi-text-search"
        />
      </VCol>
    </v-row>

    <div class="white" v-if="dynamicSelfies.length > 0">
      <v-row class="mx-0 px-0" justify="center">
        <VCol
          cols="12"
          md="8"
          class="my-1 py-0"
          v-for="identity in dynamicSelfies"
          :key="identity.userID"
        >
          <!-- add to (route) the userID.... -->
          <admin-prop-card
            :actions="userActions"
            :title="`${identity.fullName}`"
            :bigText="'Selfies'"
            :date="identity.date"
            :Data="identity"
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

    <dialog-comp
      :dialog="dialog"
      :transact="obj"
      @closeDialog="dialog = false"
      :selfie="true"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import adminCard from '~/components/adminUtils/adminCard.vue'
import AdminPropCard from '~/components/adminUtils/adminPropCard.vue'
import DialogComp from '~/components/utils/dialogComp.vue'
export default {
  components: { adminCard, AdminPropCard, DialogComp },
  layout: 'adminLayout',

  data() {
    return {
      search: '',
      dialog: false,
      obj: {},
    }
  },
  computed: {
    ...mapGetters({ state: 'adminflow/getState' }),

    dynamicCard() {
      const dynamicCard = {
        all: {
          icon: 'mdi-face-man',
          text: 'All Selfies',
          color: 'white',
          length: this.selfies.length,
        },
        approved: {
          icon: 'mdi-emoticon',
          text: 'Approved Selfies',
          color: 'green',
          length: this.approvedSelfies.length,
        },
        pending: {
          icon: 'mdi-emoticon-confused',
          text: 'Pending Selfies',
          color: 'orange',
          length: this.pendingSelfies.length,
        },
        declined: {
          icon: 'mdi-emoticon-frown',
          text: 'Declined Selfies',
          color: 'red',
          length: this.declinedSelfies.length,
        },
      }
      return dynamicCard[this.$route.params.id]
    },

    dynamicSelfies() {
      const dynamicSelfies = {
        all: this.selfies,
        approved: this.approvedSelfies,
        pending: this.pendingSelfies,
        declined: this.declinedSelfies,
      }
      return dynamicSelfies[this.$route.params.id]
    },

    selfies() {
      const selfies = this.state('allVerifications')
      return selfies.filter((iden) => {
        return (
          iden.docS == 'selfie' &&
          (iden.email.includes(this.search) ||
            iden.email.toLowerCase().includes(this.search) ||
            iden.fullName.includes(this.search) ||
            iden.fullName.toLowerCase().includes(this.search))
        )
      })
    },

    approvedSelfies() {
      //   const selfies = this.state('allVerifications')
      return this.selfies.filter((identity) => {
        return (
          identity.selfieStatus == 'approved' &&
          (identity.email.includes(this.search) ||
            identity.email.toLowerCase().includes(this.search) ||
            identity.fullName.includes(this.search) ||
            identity.fullName.toLowerCase().includes(this.search))
        )
      })
    },

    pendingSelfies() {
      //   const selfies = this.state('allVerifications')
      return this.selfies.filter((identity) => {
        return (
          identity.selfieStatus == 'pending' &&
          (identity.email.includes(this.search) ||
            identity.email.toLowerCase().includes(this.search) ||
            identity.fullName.includes(this.search) ||
            identity.fullName.toLowerCase().includes(this.search))
        )
      })
    },

    declinedSelfies() {
      //   const selfies = this.state('allVerifications')
      return this.selfies.filter((identity) => {
        return (
          identity.selfieStatus == 'declined' &&
          (identity.email.includes(this.search) ||
            identity.email.toLowerCase().includes(this.search) ||
            identity.fullName.includes(this.search) ||
            identity.fullName.toLowerCase().includes(this.search))
        )
      })
    },

    userActions() {
      return [
        {
          is: true,
          color: 'accent',
          text: 'View',
          action: ($event, data) => {
            this.obj = data
            this.dialog = true
          },
        },

        //for approve and declined user
        {
          is:
            this.$route.params.id != 'approved' &&
            this.$route.params.id != 'declined'
              ? true
              : false,
          color: 'green',
          text: 'Approve',
          action: ($event, data) => {
            if (data.selfieStatus == 'approved') {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} - Selfie Image Has Already Been APPROVED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName}  - Selfie Image is now APPROVED`

              this.$store.dispatch('userflow/getVerifyProps', data.userID)

              this.dyUpdate(
                'verifications',
                data.id,
                { selfieStatus: 'approved' },
                message
              )
            }
          },
        },

        {
          is:
            this.$route.params.id != 'approved' &&
            this.$route.params.id != 'declined' &&
            this.$route.params.id == 'pending'
              ? true
              : false,
          color: 'red',
          text: 'Decline',
          action: ($event, data) => {
            if (data.selfieStatus == 'declined') {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} - Selfie Image Has Already Been DECLINED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName}  - Selfie Image is now DECLINED`

              this.$store.dispatch('userflow/getVerifyProps', data.userID)

              this.dyUpdate(
                'verifications',
                data.id,
                { selfieStatus: 'declined' },
                message
              )
            }
          },
        },

        {
          is: this.$route.params.id == 'approved' ? true : false,
          color: 'red',
          text: 'Decline',
          action: ($event, data) => {
            if (data.selfieStatus == 'declined') {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} - Selfie Image Has Already Been DECLINED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName}  - Selfie Image is now DECLINED`

              this.$store.dispatch('userflow/getVerifyProps', data.userID)

              this.dyUpdate(
                'verifications',
                data.id,
                { selfieStatus: 'declined' },
                message
              )
            }
          },
        },

        //for blocking and unblocking users
        {
          is:
            this.$route.params.id != 'pending' &&
            this.$route.params.id != 'approved' &&
            this.$route.params.id != 'declined'
              ? true
              : false,
          color: 'red',
          text: 'Decline',
          action: ($event, data) => {
            if (data.selfieStatus == 'declined') {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} - Selfie Image Has Already Been DECLINED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName}  - Selfie Image is now DECLINED`

              this.$store.dispatch('userflow/getVerifyProps', data.userID)

              this.dyUpdate(
                'verifications',
                data.id,
                { selfieStatus: 'declined' },
                message
              )
            }
          },
        },
        {
          is: this.$route.params.id == 'declined' ? true : false,
          color: 'green',
          text: 'Approve',
          action: ($event, data) => {
            if (data.selfieStatus == 'approved') {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} - Selfie Image Has Already Been APPROVED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName}  - Selfie Image is now APPROVED`

              this.$store.dispatch('userflow/getVerifyProps', data.userID)

              this.dyUpdate(
                'verifications',
                data.id,
                { selfieStatus: 'approved' },
                message
              )
            }
          },
        },
      ]
    },
  },
  methods: {
    ...mapActions({ dynamicUpdate: 'adminflow/dynamicUpdate' }),
    dyUpdate(category, id, data, message) {
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
