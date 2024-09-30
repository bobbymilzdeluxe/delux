<template>
  <div>
    <VCol cols="12">
      <VCard color="accent" class="my-5 pb-4" dark flat rounded="xl">
        Transfers Management
      </VCard>
    </VCol>

    <VRow class="mx-0 px-0">
      <VCol
        cols="12"
        md="4"
        v-for="transfer in transferData"
        :key="transfer.icon"
      >
        <vContainer class="py-0 my-0">
          <vContainer class="py-0 my-0">
            <admin-card
              :length="transfer.length"
              :icon="transfer.icon"
              :text="transfer.text"
              :to="transfer.to"
              :color="transfer.color"
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

    transferData() {
      return [
        {
          icon: 'mdi-bank',
          text: 'All Transfers',
          length: this.transfers && this.transfers.length,
          to: '/admin/transfers/all',
        },
        {
          icon: 'mdi-cash-check',
          text: 'All Approved Transfers',
          length: this.approvedTransfers && this.approvedTransfers.length,
          color: 'green',
          to: '/admin/transfers/approved',
        },
        {
          icon: 'mdi-cash-clock',
          text: 'All Pending Transfers',
          length: this.pendingTransfers && this.pendingTransfers.length,
          color: 'orange',
          to: '/admin/transfers/pending',
        },
        {
          icon: 'mdi-cash-remove',
          text: 'All Declined Transfer',
          length: this.declinedTransfers && this.declinedTransfers.length,
          color: 'red',
          to: '/admin/transfers/declined',
        },
      ]
    },

    transfers() {
      const transfers = this.state('allTransfers')
      return transfers
    },
    approvedTransfers() {
      const approved = this.transfers.filter((transfer) => {
        return transfer.status == 'approved'
      })
      return approved
    },
    pendingTransfers() {
      const pending = this.transfers.filter((transfer) => {
        return transfer.status == 'pending'
      })
      return pending
    },
    declinedTransfers() {
      const declined = this.transfers.filter((transfer) => {
        return transfer.status == 'declined'
      })
      return declined
    },
  },
}
</script>

<style></style>
