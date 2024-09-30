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
          :label="`Search ${user && user.fullName} ${dynamicCard.category}s`"
          color="accent"
          prepend-inner-icon="mdi-text-search"
        />
      </VCol>
    </v-row>

    <div class="white" v-if="dynamicQuery.length > 0">
      <v-row class="mx-0 px-0" justify="center">
        <VCol
          cols="12"
          md="8"
          class="my-1 py-0"
          v-for="query in dynamicQuery"
          :key="query.id"
        >
          <!-- add to (route) the userID.... -->
          <admin-prop-card
            :actions="dynamicCard.actions"
            :notify="$route.query.state != 'allNotifications' ? true : false"
            :title="query.fullName + ' - ' + query.title"
            :bigText="query.symbolAmount ? query.symbolAmount : ''"
            :smallText="
              query.bank ? query.bank : query.message ? query.message : ''
            "
            :date="query.date"
            :Data="query"
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
      :selfie="$route.query.state == 'allIdentity' ? false : true"
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
    ...mapGetters({ state: 'adminflow/getState', props: 'adminflow/getProps' }),

    user() {
      const user = this.props('allUsers', this.$route.params.id)
      return user
    },

    dynamicCard() {
      const dynamicCard = {
        allTransfers: {
          icon: 'mdi-bank',
          text: `All ${this.user && this.user.fullName} Transfers`,
          category: 'Transfer',
          color: 'white',
          actions: this.userActions,
          length: this.transfers.length,
        },
        allDeposits: {
          icon: 'mdi-orbit',
          text: `All ${this.user && this.user.fullName} Deposits`,
          category: 'Deposit',
          color: 'white',
          actions: this.userActions,
          length: this.deposits.length,
        },
        allWithdraws: {
          icon: 'mdi-atom-variant',
          text: `All ${this.user && this.user.fullName} Withdraws`,
          color: 'white',
          category: 'Withdraw',
          actions: this.userActions,
          length: this.withdraws.length,
        },
        allLoans: {
          icon: 'mdi-handshake',
          text: `All ${this.user && this.user.fullName} Loans`,
          color: 'white',
          actions: this.userActions,
          category: 'Loan',
          length: this.loans.length,
        },
        allIdentity: {
          icon: 'mdi-identifier',
          text: `${this.user && this.user.fullName} Identity Documents`,
          color: 'white',
          actions: this.identityActions,
          category: 'Verification',
          length: this.identities.length,
        },
        allSelfie: {
          icon: 'mdi-face-man',
          text: `${this.user && this.user.fullName} Selfie Image`,
          color: 'white',
          actions: this.selfieActions,
          category: 'Verification',
          length: this.selfies.length,
        },
        allCards: {
          icon: 'mdi-card',
          text: `${this.user && this.user.fullName} Virtual Card`,
          color: 'white',
          actions: this.userActions,
          category: 'Card',
          length: this.cards.length,
        },
        allNotifications: {
          icon: 'mdi-bell-badge',
          text: `All ${this.user && this.user.fullName} Notifications`,
          color: 'white',
          actions: [],
          category: 'Notification',
          length: this.notifications.length,
        },
      }
      return dynamicCard[this.$route.query.state]
    },

    dynamicQuery() {
      const dynamicTransfers = {
        allTransfers: this.transfers,
        allDeposits: this.deposits,
        allLoans: this.loans,
        allCards: this.cards,
        allIdentity: this.identities,
        allSelfie: this.selfies,
        allWithdraws: this.withdraws,
        allNotifications: this.notifications,
      }
      return dynamicTransfers[this.$route.query.state]
    },

    transfers() {
      const transfers = this.state('allTransfers')
      return transfers.filter((transfer) => {
        return (
          transfer.userID == this.$route.params.id &&
          (transfer.fullName.includes(this.search) ||
            transfer.fullName.toLowerCase().includes(this.search) ||
            transfer.title.includes(this.search) ||
            transfer.title.toLowerCase().includes(this.search) ||
            transfer.bank.includes(this.search) ||
            transfer.email.toLowerCase().includes(this.search) ||
            transfer.bankName.includes(this.search) ||
            transfer.amount.toString().includes(this.search) ||
            transfer.symbolAmount.includes(this.search))
        )
      })
    },

    deposits() {
      const deposits = this.state('allDeposits')
      return deposits.filter((deposit) => {
        return (
          deposit.userID == this.$route.params.id &&
          (deposit.title.includes(this.search) ||
            deposit.title.toLowerCase().includes(this.search) ||
            deposit.fullName.includes(this.search) ||
            deposit.fullName.toLowerCase().includes(this.search) ||
            deposit.email.toLowerCase().includes(this.search) ||
            deposit.amount.toString().includes(this.search) ||
            deposit.symbolAmount.includes(this.search))
        )
      })
    },

    withdraws() {
      const withdraws = this.state('allWithdraws')
      return withdraws.filter((withdraw) => {
        return (
          withdraw.userID == this.$route.params.id &&
          (withdraw.title.includes(this.search) ||
            withdraw.title.toLowerCase().includes(this.search) ||
            withdraw.fullName.includes(this.search) ||
            withdraw.fullName.toLowerCase().includes(this.search) ||
            withdraw.email.toLowerCase().includes(this.search) ||
            withdraw.amount.toString().includes(this.search) ||
            withdraw.symbolAmount.includes(this.search))
        )
      })
    },

    loans() {
      const loans = this.state('allLoans')
      return loans.filter((loan) => {
        return (
          loan.userID == this.$route.params.id &&
          (loan.title.includes(this.search) ||
            loan.title.toLowerCase().includes(this.search) ||
            loan.fullName.includes(this.search) ||
            loan.fullName.toLowerCase().includes(this.search) ||
            loan.email.toLowerCase().includes(this.search) ||
            loan.desiredAmount.toString().includes(this.search) ||
            loan.symbolAmount.includes(this.search))
        )
      })
    },

    selfies() {
      const selfies = this.state('allVerifications')
      return selfies.filter((iden) => {
        return (
          iden.userID == this.$route.params.id &&
          iden.docS == 'selfie' &&
          (iden.email.includes(this.search) ||
            iden.email.toLowerCase().includes(this.search) ||
            iden.fullName.includes(this.search) ||
            iden.fullName.toLowerCase().includes(this.search))
        )
      })
    },

    identities() {
      const identities = this.state('allVerifications')
      return identities.filter((iden) => {
        return (
          iden.userID == this.$route.params.id &&
          iden.docID == 'Identification Document' &&
          (iden.document.includes(this.search) ||
            iden.document.toLowerCase().includes(this.search) ||
            iden.fullName.includes(this.search) ||
            iden.fullName.toLowerCase().includes(this.search))
        )
      })
    },

    cards() {
      const cards = this.state('allCards')
      return cards.filter((card) => {
        return (
          card.userID == this.$route.params.id &&
          (card.fullName.includes(this.search) ||
            card.fullName.toLowerCase().includes(this.search) ||
            card.email.includes(this.search))
        )
      })
    },

    notifications() {
      const notifications = this.state('allNotifications')
      return notifications.filter((notify) => {
        return (
          notify.userID == this.$route.params.id &&
          (notify.fullName.includes(this.search) ||
            notify.fullName.toLowerCase().includes(this.search) ||
            notify.email.includes(this.search) ||
            notify.title.includes(this.search) ||
            notify.title.toLowerCase().includes(this.search))
        )
      })
    },

    identityActions() {
      return [
        {
          //removed the card query
          is: this.$route.query.state == 'allCards' ? false : true,
          color: 'accent',
          text: 'View',
          action: ($event, data) => {
            this.obj = data
            this.dialog = true
          },
        },

        //for approve and declined user
        {
          is: true,
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
          is: true,
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
      ]
    },

    selfieActions() {
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
          is: true,
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
          is: true,
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
      ]
    },

    userActions() {
      return [
        {
          //removed the card query
          is: this.$route.query.state == 'allCards' ? false : true,
          color: 'accent',
          text: 'View',
          action: ($event, data) => {
            this.obj = data
            this.dialog = true
          },
        },

        //for approve and declined user
        {
          is: true,
          color: 'green',
          text: 'Approve',
          action: ($event, data) => {
            if (data.status == 'approved') {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} ${this.dynamicCard.category} of ${data.symbolAmount} Has Already Been APPROVED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName} ${this.dynamicCard.category} of ${data.symbolAmount} is now APPROVED`

              this.dyUpdate(
                `${this.dynamicCard.category.toLowerCase()}s`,
                data.id,
                { status: 'approved' },
                message
              )
            }
          },
        },

        {
          is: true,
          color: 'red',
          text: 'Decline',
          action: ($event, data) => {
            if (data.status == 'declined') {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} ${this.dynamicCard.category} of ${data.symbolAmount} Has Already Been DECLINED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName} ${this.dynamicCard.category} of ${data.symbolAmount} is now DECLINED`

              this.dyUpdate(
                `${this.dynamicCard.category.toLowerCase()}s`,
                data.id,
                { status: 'declined' },
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
