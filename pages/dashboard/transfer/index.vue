<template>
  <div class="my-2 mb-4">
    <v-row class="mx-0 px-0 mb-5" justify="center">
      <VCol cols="12" md="8">
        <VCard
          flat
          color="rgba(180, 140, 252, 0.1)"
          rounded="xl"
          class="py-3 mb-4"
        >
          <VCardText class="text-center mx-auto mb-0 pb-0">
            Main Balance
          </VCardText>
          <VCardText
            class="text-center mx-auto black--text text-subtitle-1 text-md-h6 font-weight-bold"
          >
            {{ user && user.currencySymbol
            }}{{ formatAmount(user && user.wallet.balance) }}
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12" md="8">
        <VCard flat>
          <div>
            <v-img
              src="/Bicons/transfer2.svg"
              contain
              width="300"
              class="mx-auto"
            ></v-img>
          </div>
        </VCard>
      </VCol>

      <VCol
        cols="12"
        md="8"
        class="my-0 py-0"
        v-for="(link, i) in transferLinks"
        :key="link.name"
      >
        <div>
          <VCard
            color="grey lighten-5"
            rounded="lg"
            class="pa-5"
            style="overflow: hidden"
            flat
            :to="link.to"
          >
            <div class="d-flex align-center" style="gap: 9px">
              <div>
                <v-img :src="link.icon" contain width="25"></v-img>
              </div>
              <div>
                <p
                  class="text-body-2 text-md-body-1 font-weight-light black--text mb-0 pb-0"
                >
                  {{ link.name }}
                </p>
              </div>
              <VSpacer />
              <div class="font-weight-bold">
                <VIcon color="secondary">mdi-chevron-right</VIcon>
              </div>
            </div>
          </VCard>
          <VDivider class="" v-if="i != transferLinks.length - 1" />
        </div>
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
    ...mapGetters({
      user: 'authentication/getUser',
      fundState: 'userflow/getFundState',
    }),
    countriess() {
      return countries
    },
    transferLinks() {
      return [
        {
          icon: '/icons/domestic.svg',
          name: 'Domestic Transfer',
          to: '/dashboard/transfer/domestic',
        },
        {
          icon: '/icons/international.svg',
          name: 'International Transfer',
          to: '/dashboard/transfer/international',
        },
      ]
    },
  },
  methods: {
    formatAmount(value) {
      if (value && !this.fundState) {
        return `${value.toLocaleString()}.00`
      } else if (value === 0 && !this.fundState) {
        return '0.00'
      } else if (!value && !this.fundState) {
        return '0.00'
      } else {
        return '****'
      }
    },
  },
}
</script>

<style></style>
