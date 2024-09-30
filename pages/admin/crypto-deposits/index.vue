<template>
  <div>
    <VCol cols="12">
      <VCard color="accent" class="my-5 pb-4" dark flat rounded="xl">
        Deposits Management
      </VCard>
    </VCol>

    <VRow class="mx-0 px-0">
      <VCol cols="12" md="4" v-for="deposit in depositData" :key="deposit.text">
        <vContainer class="py-0 my-0">
          <vContainer class="py-0 my-0">
            <admin-card
              :length="deposit.length"
              :icon="deposit.icon"
              :text="deposit.text"
              :color="deposit.color"
              :to="deposit.to"
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

    depositData() {
      return [
        {
          icon: 'mdi-orbit',
          text: 'All Deposits',
          length: this.deposits && this.deposits.length,
          to: '/admin/crypto-deposits/all',
        },
        {
          icon: 'mdi-orbit',
          text: 'All Approved Deposits',
          length: this.approvedDeposits && this.approvedDeposits.length,
          color: 'green',
          to: '/admin/crypto-deposits/approved',
        },
        {
          icon: 'mdi-orbit',
          text: 'All Pending Deposits',
          length: this.pendingDeposits && this.pendingDeposits.length,
          color: 'orange',
          to: '/admin/crypto-deposits/pending',
        },
        {
          icon: 'mdi-orbit',
          text: 'All Declined Deposits',
          length: this.declinedDeposits && this.declinedDeposits.length,
          color: 'red',
          to: '/admin/crypto-deposits/declined',
        },
      ]
    },

    deposits() {
      const deposits = this.state('allDeposits')
      return deposits
    },
    approvedDeposits() {
      const approved = this.deposits.filter((deposit) => {
        return deposit.status == 'approved'
      })
      return approved
    },
    pendingDeposits() {
      const pending = this.deposits.filter((deposit) => {
        return deposit.status == 'pending'
      })
      return pending
    },
    declinedDeposits() {
      const declined = this.deposits.filter((deposit) => {
        return deposit.status == 'declined'
      })
      return declined
    },
  },
}
</script>

<style></style>
