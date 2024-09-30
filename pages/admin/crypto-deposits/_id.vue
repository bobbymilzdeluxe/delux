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
          label="Search Crypto Deposit"
          color="accent"
          prepend-inner-icon="mdi-text-search"
        />
      </VCol>
    </v-row>

    <div class="white" v-if="dynamicDeposits.length > 0">
      <v-row class="mx-0 px-0" justify="center">
        <VCol
          cols="12"
          md="8"
          class="my-1 py-0"
          v-for="deposit in dynamicDeposits.slice(0, 50)"
          :key="deposit.id"
        >
          <!-- add to (route) the userID.... -->
          <admin-prop-card
            :actions="userActions"
            :title="deposit.fullName + ' - ' + deposit.title"
            :bigText="deposit.symbolAmount"
            :date="deposit.date"
            :Data="deposit"
          />
        </VCol>
        <VCol cols="12" md="8">
          <VBtn color="accent" block to="/admin/crypto-deposits/allDepositsList"
            >View All Deposits</VBtn
          >
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
          text: 'All Deposits',
          color: 'white',
          length: this.deposits.length,
        },
        approved: {
          icon: 'mdi-orbit',
          text: 'Approved Deposits',
          color: 'green',
          length: this.approvedDeposits.length,
        },
        pending: {
          icon: 'mdi-orbit',
          text: 'Pending Deposits',
          color: 'orange',
          length: this.pendingDeposits.length,
        },
        declined: {
          icon: 'mdi-orbit',
          text: 'Declined Deposits',
          color: 'red',
          length: this.declinedDeposits.length,
        },
      }
      return dynamicCard[this.$route.params.id]
    },

    dynamicDeposits() {
      const dynamicDeposits = {
        all: this.deposits,
        approved: this.approvedDeposits,
        pending: this.pendingDeposits,
        declined: this.declinedDeposits,
      }
      return dynamicDeposits[this.$route.params.id]
    },

    deposits() {
      const deposits = this.state('allDeposits')
      return deposits.filter((deposit) => {
        return (
          deposit.title.includes(this.search) ||
          deposit.title.toLowerCase().includes(this.search) ||
          deposit.fullName.includes(this.search) ||
          deposit.fullName.toLowerCase().includes(this.search) ||
          deposit.email.toLowerCase().includes(this.search) ||
          deposit.amount.toString().includes(this.search) ||
          deposit.symbolAmount.includes(this.search)
        )
      })
    },

    approvedDeposits() {
      const deposits = this.state('allDeposits')
      return deposits.filter((deposit) => {
        return (
          deposit.status == 'approved' &&
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

    pendingDeposits() {
      const deposits = this.state('allDeposits')
      return deposits.filter((deposit) => {
        return (
          deposit.status == 'pending' &&
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

    declinedDeposits() {
      const deposits = this.state('allDeposits')
      return deposits.filter((deposit) => {
        return (
          deposit.status == 'declined' &&
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
            this.$route.params.id == 'all' ||
            this.$route.params.id == 'declined' ||
            this.$route.params.id == 'pending'
              ? true
              : false,
          color: 'green',
          text: 'Approve',
          action: ($event, data) => {
            if (data.status == 'approved') {
              this.$store.dispatch('authentication/initAlert', {
                is: true,
                type: 'success',
                message: `${data.fullName} deposit of ${data.symbolAmount} Has Already Been APPROVED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName} deposit of ${data.symbolAmount} is now APPROVED`

              this.dyUpdate(
                'deposits',
                data.id,
                { status: 'approved' },
                message
              )

              this.$store
                .dispatch('userflow/addition', {
                  walletName: 'balance',
                  uid: data.userID,
                  amount: data.amount,
                })
                .then(() => {
                  this.$store.dispatch('authentication/initAlert', {
                    is: true,
                    type: 'success',
                    message: `${data.fullName} ${data.crypto} Deposit of ${data.symbolAmount} Has Been Added To Their Balance`,
                    timer: 6000,
                    close: true,
                  })

                  this.$store.dispatch('userflow/notificationFN', {
                    fullName: data.fullName,
                    email: data.email,
                    date: this.getCurrentTimeAndDate(),
                    formattedDate: this.getCurrentTimeAndDate('format'),
                    icon: 'mdi-orbit',
                    open: false,
                    color: 'green',
                    title: 'Deposit Approved',
                    message: `Dear ${data.fullName}, Your ${data.crypto} Deposit Has Been Successfully Approved And ${data.symbolAmount} Has Been Added To Your Balance.`,
                    uid: data.userID,
                    type: 'Addition',
                  })
                })
            }
          },
        },

        {
          is:
            this.$route.params.id == 'all' ||
            this.$route.params.id == 'approved' ||
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
                message: `${data.fullName} deposit of ${data.symbolAmount} Has Already Been DECLINED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName} deposit of ${data.symbolAmount} is now DECLINED`

              this.dyUpdate(
                'deposits',
                data.id,
                { status: 'declined' },
                message
              )

              this.$store.dispatch('userflow/notificationFN', {
                fullName: data.fullName,
                email: data.email,
                date: this.getCurrentTimeAndDate(),
                formattedDate: this.getCurrentTimeAndDate('format'),
                icon: 'mdi-orbit',
                open: false,
                color: 'red',
                title: 'Deposit Declined',
                message: `Dear ${data.fullName}, Your ${data.crypto} Deposit Of ${data.symbolAmount} Has Been Declined, Please Contact Support For More Enquires.`,
                uid: data.userID,
                type: 'deduction',
              })
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
