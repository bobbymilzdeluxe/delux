<template>
  <div>
    <p
      class="text-center text-subtitle-1 text-h5 accent--text font-weight-regular mb-0 pb-0"
    >
      Choose Method To Fund Account
    </p>
    <v-row class="mx-0 px-0" justify="center">
      <VCol cols="12">
        <VCard flat>
          <v-img
            src="/Bicons/fund.svg"
            contain
            width="300"
            class="mx-auto text-center"
          ></v-img>
        </VCard>
      </VCol>

      <VCol
        cols="12"
        md="7"
        class="my-0 py-0"
        v-for="(link, i) in fundLinks"
        :key="link.name"
      >
        <div>
          <VCard
            color="grey lighten-5"
            rounded="lg"
            class="pa-5"
            flat
            :to="link.to"
            style="overflow: hidden"
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
          <VDivider class="" v-if="i != fundLinks.length - 1" />
        </div>
      </VCol>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  mounted() {
    window.scrollBy(0, 0)
  },
  computed: {
    fundLinks() {
      return [
        {
          icon: '/icons/bank.svg',
          name: 'Via Bank Transfer',
          to: '/dashboard/fund-account/bank-funding',
        },
        {
          icon: '/icons/box.svg',
          name: 'Via Crypto Currency',
          to: '/dashboard/fund-account/crypto-funding',
        },
      ]
    },
  },
}
</script>

<style></style>
