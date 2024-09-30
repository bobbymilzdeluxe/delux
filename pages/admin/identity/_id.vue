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
          label="Search identification Document"
          color="accent"
          prepend-inner-icon="mdi-text-search"
        />
      </VCol>
    </v-row>

    <div class="white" v-if="dynamicIdentities.length > 0">
      <v-row class="mx-0 px-0" justify="center">
        <VCol
          cols="12"
          md="8"
          class="my-1 py-0"
          v-for="identity in dynamicIdentities"
          :key="identity.userID"
        >
          <!-- add to (route) the userID.... -->
          <admin-prop-card
            :actions="userActions"
            :title="`${identity.fullName} - Identification Images`"
            :bigText="identity.document"
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
      :selfie="false"
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
          icon: 'mdi-card-account-details',
          text: 'All Identities',
          color: 'white',
          length: this.identities.length,
        },
        approved: {
          icon: 'mdi-card-account-details',
          text: 'Approved Identities',
          color: 'green',
          length: this.approvedIdentities.length,
        },
        pending: {
          icon: 'mdi-card-account-details',
          text: 'Pending Identities',
          color: 'orange',
          length: this.pendingIdentities.length,
        },
        declined: {
          icon: 'mdi-card-account-details',
          text: 'Declined Identities',
          color: 'red',
          length: this.declinedIdentities.length,
        },
      }
      return dynamicCard[this.$route.params.id]
    },

    dynamicIdentities() {
      const dynamicIdentities = {
        all: this.identities,
        approved: this.approvedIdentities,
        pending: this.pendingIdentities,
        declined: this.declinedIdentities,
      }
      return dynamicIdentities[this.$route.params.id]
    },

    identities() {
      const identities = this.state('allVerifications')
      return identities.filter((iden) => {
        return (
          iden.docID == 'Identification Document' &&
          (iden.document.includes(this.search) ||
            iden.document.toLowerCase().includes(this.search) ||
            iden.fullName.includes(this.search) ||
            iden.fullName.toLowerCase().includes(this.search))
        )
      })
    },

    approvedIdentities() {
      //   const identities = this.state('allVerifications')
      return this.identities.filter((identity) => {
        return (
          identity.documentStatus == 'approved' &&
          (identity.document.includes(this.search) ||
            identity.document.toLowerCase().includes(this.search) ||
            identity.fullName.includes(this.search) ||
            identity.fullName.toLowerCase().includes(this.search))
        )
      })
    },

    pendingIdentities() {
      //   const identities = this.state('allVerifications')
      return this.identities.filter((identity) => {
        return (
          identity.documentStatus == 'pending' &&
          (identity.document.includes(this.search) ||
            identity.document.toLowerCase().includes(this.search) ||
            identity.fullName.includes(this.search) ||
            identity.fullName.toLowerCase().includes(this.search))
        )
      })
    },

    declinedIdentities() {
      //   const identities = this.state('allVerifications')
      return this.identities.filter((identity) => {
        return (
          identity.documentStatus == 'declined' &&
          (identity.document.includes(this.search) ||
            identity.document.toLowerCase().includes(this.search) ||
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
            if (data.documentStatus == 'approved') {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} - ${data.document} Document Has Already Been APPROVED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName}  - ${data.document} Document is now APPROVED`

              this.$store.dispatch('userflow/getVerifyProps', data.userID)

              this.dyUpdate(
                'verifications',
                data.id,
                { documentStatus: 'approved' },
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
            if (data.documentStatus == 'declined') {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} - ${data.document} Document Has Already Been DECLINED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName}  - ${data.document} Document is now DECLINED`

              this.$store.dispatch('userflow/getVerifyProps', data.userID)

              this.dyUpdate(
                'verifications',
                data.id,
                { documentStatus: 'declined' },
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
            if (data.documentStatus == 'declined') {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} - ${data.document} Document Has Already Been DECLINED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName}  - ${data.document} Document is now DECLINED`

              this.$store.dispatch('userflow/getVerifyProps', data.userID)

              this.dyUpdate(
                'verifications',
                data.id,
                { documentStatus: 'declined' },
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
            if (data.documentStatus == 'declined') {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} - ${data.document} Document Has Already Been DECLINED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName}  - ${data.document} Document is now DECLINED`

              this.$store.dispatch('userflow/getVerifyProps', data.userID)

              this.dyUpdate(
                'verifications',
                data.id,
                { documentStatus: 'declined' },
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
            if (data.documentStatus == 'approved') {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} - ${data.document} Document Has Already Been APPROVED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName}  - ${data.document} Document is now APPROVED`

              this.$store.dispatch('userflow/getVerifyProps', data.userID)

              this.dyUpdate(
                'verifications',
                data.id,
                { documentStatus: 'approved' },
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
