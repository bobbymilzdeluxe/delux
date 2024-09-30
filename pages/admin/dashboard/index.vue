<template>
  <div>
    <VRow class="mx-3 mt-1" justify="center" align="center">
      <VCol cols="6">
        <VCard color="accent" class="my-5 pb-4" dark flat rounded="xl">
          <div>Welcome, Super Admin</div>
        </VCard>
      </VCol>
      <VCol cols="6" class="ml-0 pl-0">
        <VCard color="accent" flat>
          <VTextField dark v-model="search" label="Search" dense />
        </VCard>
      </VCol>
    </VRow>
    <!-- <VCol cols="12">
      <VCard color="accent" class="my-5 pb-4 d-flex" dark flat rounded="xl">
        <div>Welcome, Super Admin</div>
        <VSpacer />
        <div>
          <VTextField v-model="search" label="Search" />
        </div>
      </VCard>
    </VCol> -->
    <v-container class="white">
      <vContainer>
        <VCol cols="12">
          <VCard
            rounded="xl"
            :loading="loading.app ? 'secondary' : null"
            :disabled="loading.app"
            loader-height="8px"
            style="box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 5px"
            class="mt-n10"
          >
            <v-row class="mx-0 px-0 white">
              <VCol
                cols="12"
                md="4"
                v-for="dash in dashboardData"
                :key="dash.icon"
              >
                <admin-card
                  :length="dash.length"
                  :icon="dash.icon"
                  :text="dash.text"
                  :to="dash.to"
                  :disabled="dash.disabled"
                  :loading="dash.loading"
                  :color="dash.color"
                />
              </VCol>
            </v-row>
          </VCard>
        </VCol>
      </vContainer>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminCard from '~/components/adminUtils/adminCard.vue'
export default {
  components: { adminCard },
  layout: 'adminLayout',

  data() {
    return {
      search: '',
    }
  },
  computed: {
    ...mapGetters({
      state: 'adminflow/getState',
      loading: 'adminflow/getLoading',
    }),

    dashboardData() {
      const dashboardData = [
        {
          icon: 'mdi-shield-crown',
          text: 'Admin(s)',
          length: this.admin && this.admin.length,
        },
        {
          icon: 'mdi-account-group',
          text: 'All Users',
          length: this.users && this.users.length,
          to: '/admin/users',
          loading: this.loading.users,
          disabled: this.loading.users,
        },
        {
          icon: 'mdi-bank-transfer',
          text: 'All Transfers',
          length: this.transfers && this.transfers.length,
          to: '/admin/transfers',
          loading: this.loading.transfers,
          disabled: this.loading.transfers,
        },
        // {
        //   icon: 'mdi-handshake',
        //   text: 'All Loans',
        //   length: this.loans && this.loans.length,
        //   to: '/admin/loans',
        // },
        {
          icon: 'mdi-cash-plus',
          text: 'All Crypto Deposits',
          length: this.deposits && this.deposits.length,
          to: '/admin/crypto-deposits',
          loading: this.loading.deposits,
          disabled: this.loading.deposits,
        },
        {
          icon: 'mdi-cash-minus',
          text: 'All Crypto Withdraws',
          length: this.withdraws && this.withdraws.length,
          to: '/admin/crypto-withdraw',
        },
        {
          icon: 'mdi-wallet',
          text: 'All Wallets',
          length: this.wallets && this.wallets.length,
        },
        {
          icon: 'mdi-code-array',
          text: 'All Codes',
          length: this.codes && this.codes.length,
          to: '/admin/codes',
        },
        {
          icon: 'mdi-credit-card-chip',
          text: 'All Virtual Cards',
          length: this.cards && this.cards.length,
          to: '/admin/cards',
          loading: this.loading.cards,
          disabled: this.loading.cards,
        },
        // {
        //   icon: 'mdi-shield-account',
        //   text: 'All Verifications',
        //   length: this.verifications && this.verifications.length,
        //   to: '/admin/identity',
        // },
        {
          icon: 'mdi-bell',
          text: 'All Notifications',
          length: '',
          to: '/admin/notifications',
        },
      ]

      return dashboardData.filter(
        (dash) =>
          dash.text.includes(this.search) ||
          dash.text.toLowerCase().includes(this.search)
      )
    },

    users() {
      const users = this.state('allUsers')
      return users.filter((user) => {
        return user.role == 'user'
      })
    },
    admin() {
      const users = this.state('allUsers')
      return users.filter((user) => {
        return user.role == 'admin'
      })
    },

    transfers() {
      const transfers = this.state('allTransfers')
      return transfers
    },
    codes() {
      const codes = this.state('allCodes')
      return codes
    },
    loans() {
      const loans = this.state('allLoans')
      return loans
    },
    deposits() {
      const deposits = this.state('allDeposits')
      return deposits
    },
    withdraws() {
      const withdraws = this.state('allWithdraws')
      return withdraws
    },
    wallets() {
      const wallets = this.state('allWallets')
      return wallets
    },
    cards() {
      const cards = this.state('allCards')
      return cards
    },
    verifications() {
      const verifications = this.state('allVerifications')
      return verifications
    },
    notifications() {
      const notifications = this.state('allNotifications')
      return notifications
    },
  },
  methods: {},
}
</script>

<style></style>
