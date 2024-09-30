<template>
  <div>
    <VCol cols="12">
      <VCard color="accent" class="my-5 pb-4" dark flat rounded="xl">
        Loans Management
      </VCard>
    </VCol>

    <VRow class="mx-0 px-0">
      <VCol cols="12" md="4" v-for="loan in loanData" :key="loan.text">
        <vContainer class="py-0 my-0">
          <vContainer class="py-0 my-0">
            <admin-card
              :length="loan.length"
              :icon="loan.icon"
              :text="loan.text"
              :color="loan.color"
              :to="loan.to"
            />
          </vContainer>
        </vContainer>
      </VCol>
    </VRow>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminCard from '~/components/adminUtils/adminCard.vue'
export default {
  components: { adminCard },

  layout: 'adminLayout',
  computed: {
    ...mapGetters({ state: 'adminflow/getState' }),

    loanData() {
      return [
        {
          icon: 'mdi-handshake',
          text: 'All Loans',
          length: this.loans && this.loans.length,
          to: '/admin/loans/all',
        },
        {
          icon: 'mdi-handshake',
          text: 'All Approved Loans',
          length: this.approvedLoans && this.approvedLoans.length,
          color: 'green',
          to: '/admin/loans/approved',
        },
        {
          icon: 'mdi-handshake',
          text: 'All Pending Loans',
          length: this.pendingLoans && this.pendingLoans.length,
          color: 'orange',
          to: '/admin/loans/pending',
        },
        {
          icon: 'mdi-handshake',
          text: 'All Declined Loans',
          length: this.declinedLoans && this.declinedLoans.length,
          color: 'red',
          to: '/admin/loans/declined',
        },
      ]
    },

    loans() {
      const loans = this.state('allLoans')
      return loans
    },
    approvedLoans() {
      const approved = this.loans.filter((loan) => {
        return loan.status == 'approved'
      })
      return approved
    },
    pendingLoans() {
      const pending = this.loans.filter((loan) => {
        return loan.status == 'pending'
      })
      return pending
    },
    declinedLoans() {
      const declined = this.loans.filter((loan) => {
        return loan.status == 'declined'
      })
      return declined
    },
  },
}
</script>

<style></style>
