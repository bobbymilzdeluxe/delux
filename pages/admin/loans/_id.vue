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
          label="Search Loan"
          color="accent"
          prepend-inner-icon="mdi-text-search"
        />
      </VCol>
    </v-row>

    <div class="white" v-if="dynamicLoans.length > 0">
      <v-row class="mx-0 px-0" justify="center">
        <VCol
          cols="12"
          md="8"
          class="my-1 py-0"
          v-for="loan in dynamicLoans"
          :key="loan.id"
        >
          <!-- add to (route) the userID.... -->
          <admin-prop-card
            :actions="userActions"
            :title="loan.fullName + ' - ' + loan.title"
            :bigText="loan.symbolAmount"
            :date="loan.date"
            :Data="loan"
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
          icon: 'mdi-handshake',
          text: 'All loans',
          color: 'white',
          length: this.loans.length,
        },
        approved: {
          icon: 'mdi-handshake',
          text: 'Approved Loans',
          color: 'green',
          length: this.approvedLoans.length,
        },
        pending: {
          icon: 'mdi-handshake',
          text: 'Pending Loans',
          color: 'orange',
          length: this.pendingLoans.length,
        },
        declined: {
          icon: 'mdi-handshake',
          text: 'Declined Loans',
          color: 'red',
          length: this.declinedLoans.length,
        },
      }
      return dynamicCard[this.$route.params.id]
    },

    dynamicLoans() {
      const dynamicLoans = {
        all: this.loans,
        approved: this.approvedLoans,
        pending: this.pendingLoans,
        declined: this.declinedLoans,
      }
      return dynamicLoans[this.$route.params.id]
    },

    loans() {
      const loans = this.state('allLoans')
      return loans.filter((loan) => {
        return (
          loan.title.includes(this.search) ||
          loan.title.toLowerCase().includes(this.search) ||
          loan.fullName.includes(this.search) ||
          loan.fullName.toLowerCase().includes(this.search) ||
          loan.email.toLowerCase().includes(this.search) ||
          loan.desiredAmount.toString().includes(this.search) ||
          loan.symbolAmount.includes(this.search)
        )
      })
    },

    approvedLoans() {
      const loans = this.state('allLoans')
      return loans.filter((loan) => {
        return (
          loan.status == 'approved' &&
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

    pendingLoans() {
      const loans = this.state('allLoans')
      return loans.filter((loan) => {
        return (
          loan.status == 'pending' &&
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

    declinedLoans() {
      const loans = this.state('allLoans')
      return loans.filter((loan) => {
        return (
          loan.status == 'declined' &&
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
                message: `${data.fullName} Loan of ${data.symbolAmount} Has Already Been APPROVED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName} Loan of ${data.symbolAmount} is now APPROVED, and the amount is added to their account`

              this.dyUpdate('loans', data.id, { status: 'approved' }, message)

              this.$store
                .dispatch('userflow/addition', {
                  walletName: 'balance',
                  uid: data.userID,
                  amount: data.desiredAmount,
                })
                .then(() => {
                  this.$store.dispatch('authentication/initAlert', {
                    is: true,
                    type: 'success',
                    message: `${data.fullName} Loan of ${data.symbolAmount} Has Been Added To Their Balance`,
                    timer: 6000,
                    close: true,
                  })

                  this.$store.dispatch('userflow/notificationFN', {
                    fullName: data.fullName,
                    email: data.email,
                    date: this.getCurrentTimeAndDate(),
                    formattedDate: this.getCurrentTimeAndDate('format'),
                    icon: 'mdi-handshake',
                    open: false,
                    color: 'green',
                    title: 'Loan Approved',
                    message: `Dear ${data.fullName}, Your Loan Application Has Been Successfully Approved And ${data.symbolAmount} Has Been Added To Your Balance.`,
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
                message: `${data.fullName} Loan of ${data.symbolAmount} Has Already Been DECLINED`,
                timer: 6000,
                close: true,
              })
            } else {
              let message = `${data.fullName} Loan of ${data.symbolAmount} is now DECLINED`

              this.dyUpdate('loans', data.id, { status: 'declined' }, message)

              this.$store.dispatch('userflow/notificationFN', {
                fullName: data.fullName,
                email: data.email,
                date: this.getCurrentTimeAndDate(),
                formattedDate: this.getCurrentTimeAndDate('format'),
                icon: 'mdi-handshake',
                open: false,
                color: 'red',
                title: 'Loan Declined',
                message: `Dear ${data.fullName}, Your Loan Application Of ${data.symbolAmount} Has Been Declined, Please Contact Support For More Enquires.`,
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
