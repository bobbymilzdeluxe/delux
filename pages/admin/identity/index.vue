<template>
  <div>
    <VCol cols="12">
      <VCard color="accent" class="my-5 pb-4" dark flat rounded="xl">
        <VCardText class="white--text font-weight-medium"
          >Identification Documents</VCardText
        >
      </VCard>
    </VCol>

    <VRow class="mx-0 px-0">
      <VCol cols="12" md="4" v-for="iden in identityData" :key="iden.text">
        <vContainer class="py-0 my-0">
          <vContainer class="py-0 my-0">
            <admin-card
              :length="iden.length"
              :icon="iden.icon"
              :text="iden.text"
              :color="iden.color"
              :to="iden.to"
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

    identityData() {
      return [
        {
          icon: 'mdi-card-account-details',
          text: 'All Identity Document Image',
          length: this.verifications && this.verifications.length,
          to: '/admin/identity/all',
        },
        {
          icon: 'mdi-card-account-details',
          text: 'All Approved Identity ',
          length:
            this.approvedVerifications && this.approvedVerifications.length,
          color: 'green',
          to: '/admin/identity/approved',
        },
        {
          icon: 'mdi-card-account-details',
          text: 'All Pending Identity Document Image',
          length: this.pendingVerifications && this.pendingVerifications.length,
          color: 'orange',
          to: '/admin/identity/pending',
        },
        {
          icon: 'mdi-card-account-details',
          text: 'All Declined Identity Document Image',
          length:
            this.declinedVerifications && this.declinedVerifications.length,
          color: 'red',
          to: '/admin/identity/declined',
        },
      ]
    },

    verifications() {
      const verifications = this.state('allVerifications')
      return verifications.filter((iden) => {
        return iden.docID == 'Identification Document'
      })
    },
    approvedVerifications() {
      const approved = this.verifications.filter((iden) => {
        return iden.documentStatus == 'approved'
      })
      return approved
    },
    pendingVerifications() {
      const pending = this.verifications.filter((iden) => {
        return iden.documentStatus == 'pending'
      })
      return pending
    },
    declinedVerifications() {
      const declined = this.verifications.filter((iden) => {
        return iden.documentStatus == 'declined'
      })
      return declined
    },
  },
}
</script>

<style></style>
