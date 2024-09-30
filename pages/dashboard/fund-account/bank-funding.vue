<template>
  <div>
    <p
      class="text-center accent--text text--darken-2 font-weight-medium text-subtitle-1 text-md-subtitle-h6"
    >
      Bank Funding
    </p>
    <v-row class="mx-0 px-0" justify="center">
      <VCol cols="12" class="mx-auto text-center">
        <VCard flat>
          <div>
            <v-img
              src="/Bicons/bank-fund.svg"
              contain
              width="300"
              class="mx-auto"
            ></v-img>
          </div>
        </VCard>
      </VCol>
      <VCol cols="12">
        <p class="text-center black--text text-h6">Flexi Unions Bank</p>
        <!-- <p class="text-center black--text text-body-2 text-md-body-1">
          301 East Water Street, Charlottesville, VA 22904 Virginia
        </p> -->
      </VCol>
      <VCol cols="12" md="6">
        <VCard flat color="grey lighten-4" rounded="lg">
          <VCardText class="font-weight-bold"> Account Details </VCardText>
          <VCardText
            class="my-0 py-0 mb-2"
            @click="copyData('Account Name', fullName)"
          >
            Account Name : {{ fullName }}
            <VIcon
              small
              color="grey darken-2"
              @click="copyData('Account Name', fullName)"
              >mdi-content-copy</VIcon
            >
          </VCardText>
          <VCardText
            class="my-0 py-0 mb-2"
            @click="copyData('Account Number', user && user.accNumber)"
          >
            Account Number : {{ user && user.accNumber }}
            <VIcon
              small
              color="grey darken-2"
              @click="copyData('Account Number', user && user.accNumber)"
              >mdi-content-copy</VIcon
            >
          </VCardText>
          <VCardText
            class="my-0 py-0 mb-2"
            @click="copyData('Sort Code', 42314231)"
          >
            Sort Code : 42314231
            <VIcon
              small
              color="grey darken-2"
              @click="copyData('Sort Code', 42314231)"
              >mdi-content-copy</VIcon
            >
          </VCardText>
          <VCardText
            class="my-0 py-0 pb-3 mb-2"
            @click="copyData('Payment Reference', 843521468473512)"
          >
            Payment Reference: 843521468473512
            <VIcon
              small
              color="grey darken-2"
              @click="copyData('Payment Reference', 843521468473512)"
              >mdi-content-copy</VIcon
            >
          </VCardText>
        </VCard>
      </VCol>
    </v-row>

    <v-row class="mx-0 px-0 mb-3" justify="center">
      <VCol cols="12" md="6" class="my-0 py-0">
        <VCard flat class="lightpinkish pa-3 pa-md-5 mt-5" rounded="xl">
          <div class="d-flex align-center" style="gap: 12px">
            <div>
              <v-img width="25" src="/icons/shield-tick.svg"></v-img>
            </div>
            <div class="secondary--text text-body-2 font-weight-light">
              Payment Reference helps Flexi Unions Bank track payments faster,
              you must include it in wire transfer description.
            </div>
          </div>
        </VCard>
      </VCol>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'dashboard',
  created() {
    window.scrollBy(0, 0)
  },
  computed: {
    ...mapGetters({ user: 'authentication/getUser' }),
    fullName() {
      return `${this.user && this.user.firstName} ${
        this.user && this.user.lastName
      }`
    },
  },
  methods: {
    copyData(name, data) {
      window.navigator.clipboard.writeText(data)
      this.$store.dispatch('authentication/initAlert', {
        is: true,
        message: `${name} Copied Successfully`,
        type: 'success',
        close: true,
      })
    },
  },
}
</script>

<style>
.lightpinkish {
  background-color: rgba(180, 140, 252, 0.1) !important;
}
</style>
