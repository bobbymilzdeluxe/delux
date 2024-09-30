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
          label="Search Crypto Withdraw"
          color="accent"
          prepend-inner-icon="mdi-text-search"
        />
      </VCol>
    </v-row>

    <div class="white" v-if="dynamicWithdraws.length > 0">
      <v-row class="mx-0 px-0" justify="center">
        <VCol
          cols="12"
          md="8"
          class="my-1 py-0"
          v-for="withdraw in dynamicWithdraws"
          :key="withdraw.id"
        >
          <!-- add to (route) the userID.... -->
          <admin-prop-card
            :actions="userActions"
            :title="withdraw.fullName + ' - ' + withdraw.title"
            :bigText="withdraw.symbolAmount"
            :date="withdraw.date"
            :Data="withdraw"
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
          icon: 'mdi-orbit',
          text: 'All Crypto Withdraws',
          color: 'white',
          length: this.withdraws.length,
        },
        approved: {
          icon: 'mdi-orbit',
          text: 'Approved Crypto Withdraws',
          color: 'green',
          length: this.approvedWithdraws.length,
        },
        pending: {
          icon: 'mdi-orbit',
          text: 'Pending Crypto Withdraws',
          color: 'orange',
          length: this.pendingWithdraws.length,
        },
        declined: {
          icon: 'mdi-orbit',
          text: 'Declined Crypto Withdraws',
          color: 'red',
          length: this.declinedWithdraws.length,
        },
      }
      return dynamicCard[this.$route.params.id]
    },

    dynamicWithdraws() {
      const dynamicWithdraws = {
        all: this.withdraws,
        approved: this.approvedWithdraws,
        pending: this.pendingWithdraws,
        declined: this.declinedWithdraws,
      }
      return dynamicWithdraws[this.$route.params.id]
    },

    withdraws() {
      const withdraws = this.state('allWithdraws')
      return withdraws.filter((withdraw) => {
        return (
          withdraw.title.includes(this.search) ||
          withdraw.title.toLowerCase().includes(this.search) ||
          withdraw.fullName.includes(this.search) ||
          withdraw.fullName.toLowerCase().includes(this.search) ||
          withdraw.email.toLowerCase().includes(this.search) ||
          withdraw.desiredAmount.toString().includes(this.search) ||
          withdraw.symbolAmount.includes(this.search)
        )
      })
    },

    approvedWithdraws() {
      const withdraws = this.state('allWithdraws')
      return withdraws.filter((withdraw) => {
        return (
          withdraw.status == 'approved' &&
          (withdraw.title.includes(this.search) ||
            withdraw.title.toLowerCase().includes(this.search) ||
            withdraw.fullName.includes(this.search) ||
            withdraw.fullName.toLowerCase().includes(this.search) ||
            withdraw.email.toLowerCase().includes(this.search) ||
            withdraw.desiredAmount.toString().includes(this.search) ||
            withdraw.symbolAmount.includes(this.search))
        )
      })
    },

    pendingWithdraws() {
      const withdraws = this.state('allWithdraws')
      return withdraws.filter((withdraw) => {
        return (
          withdraw.status == 'pending' &&
          (withdraw.title.includes(this.search) ||
            withdraw.title.toLowerCase().includes(this.search) ||
            withdraw.fullName.includes(this.search) ||
            withdraw.fullName.toLowerCase().includes(this.search) ||
            withdraw.email.toLowerCase().includes(this.search) ||
            withdraw.desiredAmount.toString().includes(this.search) ||
            withdraw.symbolAmount.includes(this.search))
        )
      })
    },

    declinedWithdraws() {
      const withdraws = this.state('allWithdraws')
      return withdraws.filter((withdraw) => {
        return (
          withdraw.status == 'declined' &&
          (withdraw.title.includes(this.search) ||
            withdraw.title.toLowerCase().includes(this.search) ||
            withdraw.fullName.includes(this.search) ||
            withdraw.fullName.toLowerCase().includes(this.search) ||
            withdraw.email.toLowerCase().includes(this.search) ||
            withdraw.desiredAmount.toString().includes(this.search) ||
            withdraw.symbolAmount.includes(this.search))
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
            if (data.status == 'approved') {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} withdrawal of ${data.symbolAmount} Has Already Been APPROVED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName} withdrawal of ${data.symbolAmount} is now APPROVED`

              this.dyUpdate(
                'withdraws',
                data.id,
                { status: 'approved' },
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
            if (data.status == 'declined') {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} withdrawal of ${data.symbolAmount} Has Already Been DECLINED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName} withdrawal of ${data.symbolAmount} is now DECLINED`

              this.dyUpdate(
                'withdraws',
                data.id,
                { status: 'declined' },
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
            if (data.status == 'declined') {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} withdrawal of ${data.symbolAmount} Has Already Been DECLINED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName} withdrawal of ${data.symbolAmount} is now DECLINED`

              this.dyUpdate(
                'withdraws',
                data.id,
                { status: 'declined' },
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
            if (data.status == 'declined') {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} withdrawal of ${data.symbolAmount} Has Already Been DECLINED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName} withdrawal of ${data.symbolAmount} is now DECLINED`

              this.dyUpdate(
                'withdraws',
                data.id,
                { status: 'declined' },
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
            if (data.status == 'approved') {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} withdrawal of ${data.symbolAmount} Has Already Been APPROVED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName} withdrawal of ${data.symbolAmount} is now APPROVED`

              this.dyUpdate(
                'withdraws',
                data.id,
                { status: 'approved' },
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
