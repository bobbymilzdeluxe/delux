<template>
  <div class="mt-4" style="">
    <p
      class="text-center text-subtitle-1 text-h5 accent--text font-weight-regular mb-0 pb-0"
    >
      About <span class="secondary--text">Flexi Unions Bank</span>
    </p>
    <v-row class="mx-0 px-0" justify="center">
      <VCol cols="12" class="mb-0 pb-0">
        <VCard flat>
          <div>
            <v-img
              src="/Bicons/about.jpg"
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
        v-for="(link, i) in accountLinks"
        :key="link.name"
      >
        <div>
          <VCard
            @click="link.action()"
            color="grey lighten-5"
            rounded="lg"
            :to="link.to"
            class="pa-5"
            flat
            style="overflow: hidden"
          >
            <div class="d-flex align-center" style="gap: 9px">
              <div>
                <v-img :src="link.icon" contain width="23"></v-img>
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
          <VDivider class="" v-if="i != accountLinks.length - 1" />
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
    accountLinks() {
      return [
        {
          icon: '/icons/terms.svg',
          name: 'View our Terms & Conditions',
          to: '/terms',
        },
        {
          icon: '/icons/privacy.svg',
          name: 'View our Privacy Policy',
          to: '/privacy-policy',
        },
      ]
    },
  },
}
</script>

<style></style>
