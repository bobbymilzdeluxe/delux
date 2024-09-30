<template>
  <div class="mt-10">
    <!-- <v-row class="mx-0 px-0 white" justify="center" align="center">
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
      </v-row> -->

    <v-row class="white text-center mx-auto" justify="center">
      <VCol cols="11" md="6" class="mt-0 pt-0">
        <VTextField
          v-model="search"
          label="Search Transfer"
          color="accent"
          prepend-inner-icon="mdi-text-search"
        />
      </VCol>
    </v-row>

    <div class="white" v-if="dynamicTransfers.length > 0">
      <v-row class="mx-0 px-0" justify="center">
        <VCol
          cols="12"
          md="8"
          class="my-1 py-0"
          v-for="transfer in dynamicTransfers"
          :key="transfer.id"
        >
          <!-- add to (route) the userID.... -->
          <admin-prop-card
            :actions="userActions"
            :active="transfer.active"
            :title="transfer.fullName + ' - ' + transfer.title"
            :bigText="transfer.symbolAmount"
            :smallText="transfer.bank"
            :blocked="transfer.blocked"
            :date="transfer.date"
            :Data="transfer"
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

    //   dynamicCard() {
    //     const dynamicCard = {
    //       all: {
    //         icon: 'mdi-bank',
    //         text: 'All Transfers',
    //         color: 'white',
    //         length: this.transfers.length,
    //       },
    //       approved: {
    //         icon: 'mdi-cash-check',
    //         text: 'Approved Transfers',
    //         color: 'green',
    //         length: this.approvedTransfers.length,
    //       },
    //       pending: {
    //         icon: 'mdi-cash-clock',
    //         text: 'Pending Transfers',
    //         color: 'orange',
    //         length: this.pendingTransfers.length,
    //       },
    //       declined: {
    //         icon: 'mdi-cash-remove',
    //         text: 'Declined Transfers',
    //         color: 'red',
    //         length: this.declinedTransfers.length,
    //       },
    //     }
    //     return dynamicCard[this.$route.params.id]
    //   },

    dynamicTransfers() {
      return this.transfers
    },

    transfers() {
      const transfers = this.state('allTransfers')
      return transfers.filter((transfer) => {
        return (
          transfer.fullName.includes(this.search) ||
          transfer.fullName.toLowerCase().includes(this.search) ||
          transfer.title.includes(this.search) ||
          transfer.title.toLowerCase().includes(this.search) ||
          transfer.bank.includes(this.search) ||
          transfer.email.toLowerCase().includes(this.search) ||
          transfer.bankName.includes(this.search) ||
          transfer.amount.toString().includes(this.search) ||
          transfer.symbolAmount.includes(this.search)
        )
      })
    },

    //   approvedTransfers() {
    //     const transfers = this.state('allTransfers')
    //     return transfers.filter((transfer) => {
    //       return (
    //         transfer.status == 'approved' &&
    //         (transfer.title.includes(this.search) ||
    //           transfer.fullName.includes(this.search) ||
    //           transfer.fullName.toLowerCase().includes(this.search) ||
    //           transfer.title.toLowerCase().includes(this.search) ||
    //           transfer.bank.includes(this.search) ||
    //           transfer.email.toLowerCase().includes(this.search) ||
    //           transfer.bank.toLowerCase().includes(this.search) ||
    //           transfer.bankName.includes(this.search) ||
    //           transfer.amount.toString().includes(this.search) ||
    //           transfer.symbolAmount.includes(this.search))
    //       )
    //     })
    //   },

    //   pendingTransfers() {
    //     const transfers = this.state('allTransfers')
    //     return transfers.filter((transfer) => {
    //       return (
    //         transfer.status == 'pending' &&
    //         (transfer.fullName.includes(this.search) ||
    //           transfer.fullName.toLowerCase().includes(this.search) ||
    //           transfer.title.includes(this.search) ||
    //           transfer.title.toLowerCase().includes(this.search) ||
    //           transfer.bank.includes(this.search) ||
    //           transfer.email.includes(this.search) ||
    //           transfer.bank.toLowerCase().includes(this.search) ||
    //           transfer.bankName.includes(this.search) ||
    //           transfer.amount.toString().includes(this.search) ||
    //           transfer.symbolAmount.includes(this.search))
    //       )
    //     })
    //   },

    //   declinedTransfers() {
    //     const transfers = this.state('allTransfers')
    //     return transfers.filter((transfer) => {
    //       return (
    //         transfer.status == 'declined' &&
    //         (transfer.title.includes(this.search) ||
    //           transfer.fullName.includes(this.search) ||
    //           transfer.fullName.toLowerCase().includes(this.search) ||
    //           transfer.title.toLowerCase().includes(this.search) ||
    //           transfer.bank.includes(this.search) ||
    //           transfer.email.toLowerCase().includes(this.search) ||
    //           transfer.bankName.includes(this.search) ||
    //           transfer.amount.toString().includes(this.search) ||
    //           transfer.symbolAmount.includes(this.search))
    //       )
    //     })
    //   },

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
                message: `${data.fullName} Transfer of ${data.symbolAmount} Has Already Been APPROVED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName} Transfer of ${data.symbolAmount} is now APPROVED`

              this.dyUpdate(
                'transfers',
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
                message: `${data.fullName} Transfer of ${data.symbolAmount} Has Already Been DECLINED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName} Transfer of ${data.symbolAmount} is now DECLINED`

              this.dyUpdate(
                'transfers',
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
                message: `${data.fullName} Transfer of ${data.symbolAmount} Has Already Been DECLINED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName} Transfer of ${data.symbolAmount} is now DECLINED`

              this.dyUpdate(
                'transfers',
                data.id,
                { status: 'declined' },
                message
              )
            }
          },
        },

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
                message: `${data.fullName} Transfer of ${data.symbolAmount} Has Already Been DECLINED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName} Transfer of ${data.symbolAmount} is now DECLINED`

              this.dyUpdate(
                'transfers',
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
                message: `${data.fullName} Transfer of ${data.symbolAmount} Has Already Been APPROVED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName} Transfer of ${data.symbolAmount} is now APPROVED`

              this.dyUpdate(
                'transfers',
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
