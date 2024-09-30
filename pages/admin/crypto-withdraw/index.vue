<template>
  <div>
    <VCol cols="12">
      <VCard color="accent" class="my-5 pb-4" dark flat rounded="xl">
        Crypto Withdrawal Management
      </VCard>
    </VCol>

    <VRow class="mx-0 px-0">
      <VCol
        cols="12"
        md="4"
        v-for="withdraw in withdrawData"
        :key="withdraw.text"
      >
        <vContainer class="py-0 my-0">
          <vContainer class="py-0 my-0">
            <admin-card
              :length="withdraw.length"
              :icon="withdraw.icon"
              :text="withdraw.text"
              :color="withdraw.color"
              :to="withdraw.to"
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

    withdrawData() {
      return [
        {
          icon: 'mdi-atom-variant',
          text: 'All Withdraws',
          length: this.withdraws && this.withdraws.length,
          to: '/admin/crypto-withdraw/all',
        },
        {
          icon: 'mdi-atom-variant',
          text: 'All Approved Withdraws',
          length: this.approvedWithdraws && this.approvedWithdraws.length,
          color: 'green',
          to: '/admin/crypto-withdraw/approved',
        },
        {
          icon: 'mdi-atom-variant',
          text: 'All Pending Withdraws',
          length: this.pendingWithdraws && this.pendingWithdraws.length,
          color: 'orange',
          to: '/admin/crypto-withdraw/pending',
        },
        {
          icon: 'mdi-atom-variant',
          text: 'All Declined Withdraws',
          length: this.declinedWithdraws && this.declinedWithdraws.length,
          color: 'red',
          to: '/admin/crypto-withdraw/declined',
        },
      ]
    },

    withdraws() {
      const withdraws = this.state('allWithdraws')
      return withdraws
    },
    approvedWithdraws() {
      const approved = this.withdraws.filter((withdraw) => {
        return withdraw.status == 'approved'
      })
      return approved
    },
    pendingWithdraws() {
      const pending = this.withdraws.filter((withdraw) => {
        return withdraw.status == 'pending'
      })
      return pending
    },
    declinedWithdraws() {
      const declined = this.withdraws.filter((withdraw) => {
        return withdraw.status == 'declined'
      })
      return declined
    },
  },
}
</script>

<style></style>
