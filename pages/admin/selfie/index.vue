<template>
  <div>
    <VCol cols="12">
      <VCard color="accent" class="my-5 pb-4" dark flat rounded="xl">
        <VCardText class="white--text font-weight-medium">SELFIES</VCardText>
      </VCard>
    </VCol>

    <VRow class="mx-0 px-0">
      <VCol cols="12" md="4" v-for="ver in selfieData" :key="ver.icon">
        <vContainer class="py-0 my-0">
          <vContainer class="py-0 my-0">
            <admin-card
              :length="ver.length"
              :icon="ver.icon"
              :text="ver.text"
              :color="ver.color"
              :to="ver.to"
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

    selfieData() {
      return [
        {
          icon: 'mdi-face-man',
          text: 'All Selfies',
          length: this.verifications && this.verifications.length,
          to: '/admin/selfie/all',
        },
        {
          icon: 'mdi-emoticon',
          text: 'All Approved Selfies',
          length:
            this.approvedVerifications && this.approvedVerifications.length,
          color: 'green',
          to: '/admin/selfie/approved',
        },
        {
          icon: 'mdi-emoticon-confused',
          text: 'All Pending Selfies',
          length: this.pendingVerifications && this.pendingVerifications.length,
          color: 'orange',
          to: '/admin/selfie/pending',
        },
        {
          icon: 'mdi-emoticon-frown',
          text: 'All Declined Selfies',
          length:
            this.declinedVerifications && this.declinedVerifications.length,
          color: 'red',
          to: '/admin/selfie/declined',
        },
      ]
    },

    verifications() {
      const verifications = this.state('allVerifications')
      return verifications.filter((ver) => {
        return ver.docS == 'selfie'
      })
    },
    approvedVerifications() {
      const approved = this.verifications.filter((ver) => {
        return ver.selfieStatus == 'approved'
      })
      return approved
    },
    pendingVerifications() {
      const pending = this.verifications.filter((ver) => {
        return ver.selfieStatus == 'pending'
      })
      return pending
    },
    declinedVerifications() {
      const declined = this.verifications.filter((ver) => {
        return ver.selfieStatus == 'declined'
      })
      return declined
    },
  },
}
</script>

<style></style>
