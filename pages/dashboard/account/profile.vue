<template>
  <div class="d-flex align-center" style="">
    <v-row class="mx-0 px-0" justify="center">
      <VCol cols="12" md="8" v-if="show">
        <VCol cols="12">
          <p
            class="text-center text-subtitle-1 text-h5 accent--text font-weight-regular mb-0 pb-0"
          >
            Account Information
          </p>
          <!-- <p class="text-center grey--text text-body-2">
            Before you start your KYC process, see what is
            <span class="secondary--text">required</span> of you
          </p> -->
        </VCol>
        <VCard flat>
          <div>
            <v-img
              src="/Bicons/profile.svg"
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
        v-for="(link, i) in profileLinks"
        :key="link.name"
      >
        <v-col cols="12" class="my-0 py-0" v-if="show">
          <VCard
            @click=";(comp = link.state), (show = false)"
            color="grey lighten-5"
            rounded="lg"
            class="pa-5"
            flat
          >
            <div class="d-flex align-center" style="gap: 9px">
              <div>
                <v-img :src="link.icon" contain width="22"></v-img>
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
          <VDivider class="" v-if="i != profileLinks.length - 1" />
        </v-col>
      </VCol>
      <VCol cols="12" md="8" v-if="show">
        <VCard flat class="lightpinkish pa-3 pa-md-5 mx-3 mt-5" rounded="xl">
          <div class="d-flex align-center" style="gap: 12px">
            <div>
              <v-img width="25" src="/icons/shield-tick.svg"></v-img>
            </div>
            <div class="secondary--text text-body-2 font-weight-light">
              We don't share your personal details with anyone. This information
              is required solely for verification.
            </div>
          </div>
        </VCard>
      </VCol>
      <VCol cols="12" md="8" v-if="!show">
        <component @show="profileShow" :is="comp" />
      </VCol>
    </v-row>
  </div>
</template>

<script>
import personal from '~/components/profileComps/personal.vue'
import identification from '~/components/profileComps/identification.vue'
import residential from '~/components/profileComps/residential.vue'
import employment from '~/components/profileComps/employment.vue'
import kin from '~/components/profileComps/kin.vue'
export default {
  components: { personal, identification, residential, employment, kin },
  layout: 'dashboard',
  created() {
    window.scrollBy(0, 0)
  },
  data() {
    return {
      show: true,
      comp: '',
    }
  },
  computed: {
    profileLinks() {
      return [
        {
          icon: '/icons/personal.svg',
          name: 'Personal details',
          state: 'personal',
        },
        {
          icon: '/icons/Pidentification.svg',
          name: 'Identification details',
          state: 'identification',
        },
        {
          icon: '/icons/Presidence.svg',
          name: 'Residential details',
          state: 'residential',
        },
        {
          icon: '/icons/Pemployment.svg',
          name: 'Employment details',
          state: 'employment',
        },
        {
          icon: '/icons/Pnext.svg',
          name: 'Next of kin',
          state: 'kin',
        },
      ]
    },
  },
  methods: {
    profileShow() {
      this.show = true
    },
  },
}
</script>

<style scoped>
.lightpinkish {
  background-color: rgba(180, 140, 252, 0.1) !important;
}
</style>
