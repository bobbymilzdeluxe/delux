<template>
  <div class="mt-4" style="">
    <div v-if="show">
      <v-col
        cols="12"
        class="text-center text-subtitle-1 text-h5 accent--text font-weight-regular mb-0 pb-0"
      >
        How Can <span class="secondary--text">Deluxe Integrity Bank</span>
        Support Help You Today
      </v-col>
      <VCol cols="12">
        <VCard flat>
          <div>
            <v-img
              src="/Bicons/support.svg"
              contain
              width="300"
              class="mx-auto"
            ></v-img>
          </div>
        </VCard>
      </VCol>
      <v-row class="mx-0 px-0" justify="center">
        <VCol
          cols="12"
          md="8"
          class="my-0 py-0"
          v-for="(link, i) in accountLinks"
          :key="link.name"
        >
          <div>
            <VCard
              @click="!link.to ? (show = false) : true"
              color="grey lighten-5"
              rounded="lg"
              :to="link.to"
              class="pa-5"
              flat
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
            <VDivider class="" v-if="i != accountLinks.length - 1" />
          </div>
        </VCol>
      </v-row>
    </div>
    <div v-if="!show">
      <v-row class="mx-0 px-0" justify="center">
        <VCol
          cols="12"
          md="8"
          class="d-flex justify-space-between"
          style="gap: 15px"
        >
          <div class="ma-0 pa-0">
            <VIcon @click="show = true" color="secondary"
              >mdi-chevron-left</VIcon
            >
          </div>
          <p
            class="grey--text text--darken-2 mx-0 px-0 text-body-2 text-md-body-1 text-capitalize text-center"
          >
            <VBtn color="secondary" small depressed class="text-capitalize"
              >Contact Support</VBtn
            >
          </p>
        </VCol>
        <VCol cols="12" md="8">
          <p
            class="text-center grey--text text--darken-3 text-capitalize text-subtitle-2 text-md-subtitle-1"
          >
            Complete this form to help us address your issue
          </p>
        </VCol>
        <VCol cols="12" md="8" class="">
          <VForm lazy-validation ref="form" @submit.prevent="submit">
            <v-row class="mx-0 px-0">
              <VCol cols="12" class="ma-0 pa-0">
                <VTextField
                  v-model="name"
                  label="Name"
                  color="secondary"
                  filled
                  light
                />
              </VCol>
              <VCol cols="12" class="ma-0 pa-0">
                <VTextField
                  v-model="phone"
                  label="Phone"
                  color="secondary"
                  filled
                  light
                />
              </VCol>
              <VCol cols="12" class="ma-0 pa-0">
                <VTextField
                  v-model="email"
                  label="Email Address"
                  color="secondary"
                  filled
                  light
                />
              </VCol>
              <VCol cols="12" class="ma-0 pa-0">
                <VTextField
                  v-model="subject"
                  label="Subject"
                  color="secondary"
                  filled
                  light
                />
              </VCol>
              <VCol cols="12" class="ma-0 pa-0">
                <VTextarea
                  rows="3"
                  label="Tell Us What Happened"
                  color="secondary"
                  filled
                  light
                />
              </VCol>
              <v-col cols="12" class="ma-0 pa-0">
                <VBtn color="secondary" depressed large block>Submit</VBtn>
              </v-col>
            </v-row>
          </VForm>
        </VCol>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  mounted() {
    window.scrollBy(0, 0)
  },
  data() {
    return {
      show: true,

      name: '',
      phone: '',
      email: '',
      subject: '',
      description: '',
    }
  },
  computed: {
    accountLinks() {
      return [
        {
          icon: '/icons/faqs.svg',
          name: 'Check FAQS',
          to: '/faqs',
        },
        {
          icon: '/icons/customer.svg',
          name: 'Contact customer support',
        },
      ]
    },
  },
}
</script>

<style></style>
