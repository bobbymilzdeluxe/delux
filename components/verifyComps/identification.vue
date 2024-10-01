<template>
  <div>
    <section>
      <v-row class="mx-0 px-0 mt-4">
        <VCol cols="12" class="d-flex justify-space-between" style="gap: 15px">
          <div class="ma-0 pa-0">
            <VIcon @click="$emit('show')" color="secondary"
              >mdi-chevron-left</VIcon
            >
          </div>
          <p
            class="grey--text text--darken-2 mx-0 px-0 text-body-2 text-md-body-1 text-capitalize text-center"
          >
            <VBtn color="secondary" small depressed class="text-capitalize"
              >Identity Verification</VBtn
            >
          </p>
        </VCol>
        <VCol cols="12" class="ma-0 pa-0 mt-2">
          <VCard
            flat
            class="lightpinkish pa-3 pa-md-5 mb-6"
            rounded="xl"
            v-if="user && !user.active"
          >
            <div class="d-flex align-center" style="gap: 12px">
              <div>
                <v-img width="25" src="/icons/shield-tick.svg"></v-img>
              </div>
              <div
                class="secondary--text text-body-2 font-weight-light text-capitalize"
              >
                Dear {{ user && user.fullName }}, Please Kindly Activate Your
                Account By Contacting Support For An Account Upgrade In order to
                Submit Your Document For Verification.
              </div>
            </div>
          </VCard>

          <VForm lazy-validation ref="form" @submit.prevent="submit">
            <v-row class="mx-0 px-0">
              <VCol cols="12" class="my-0 py-0">
                <VSelect
                  v-model="document"
                  label="Select Identification Document"
                  :items="['Passport', `Driver's License`, 'ID Card']"
                  color="secondary"
                  :disabled="user && !user.active"
                  filled
                  :rules="[(v) => !!v || 'Select Identification Document']"
                  light
                  item-color="secondary"
                />
              </VCol>
              <VCol cols="12" class="my-0 py-0" v-if="document">
                <p class="text-caption primary--text ma-0 pa-0">
                  Make sure the document shows your photo, full name, date of
                  birth and date of issue.
                </p>
              </VCol>
              <VCol cols="12" class="my-0 py-0" v-if="document">
                <v-file-input
                  filled
                  v-model="front"
                  @change="showImage"
                  prepend-icon=""
                  :rules="[(v) => !!v || `${updated} Front is required`]"
                  color="secondary"
                  :label="`Upload ${document} Front`"
                  prepend-inner-icon="mdi-file"
                >
                  <template v-slot:selection="{ text }">
                    <v-chip small label color="secondary">
                      {{ text }}
                    </v-chip>
                  </template></v-file-input
                >
              </VCol>
              <VCol cols="12" class="my-0 py-0" v-if="document">
                <v-file-input
                  filled
                  v-model="back"
                  prepend-icon=""
                  @change="showImage"
                  color="secondary"
                  :rules="[(v) => !!v || `${updated} Back required`]"
                  :label="`Upload ${document} Back`"
                  prepend-inner-icon="mdi-file"
                >
                  <template v-slot:selection="{ text }">
                    <v-chip small label color="secondary">
                      {{ text }}
                    </v-chip>
                  </template></v-file-input
                >
              </VCol>

              <v-row class="mx-0 px-0 mb-4" v-if="frontImage && backImage">
                <VCol cols="6">
                  <VCard flat>
                    <v-img
                      :src="frontImage"
                      contain
                      class="mx-auto"
                      :width="$vuetify.breakpoint.mdAndDown ? '150' : '320'"
                    >
                    </v-img>
                  </VCard>
                </VCol>
                <VCol cols="6">
                  <VCard flat>
                    <v-img
                      :src="backImage"
                      contain
                      class="mx-auto"
                      :width="$vuetify.breakpoint.mdAndDown ? '150' : '320'"
                    >
                    </v-img>
                  </VCard>
                </VCol>
              </v-row>
              <VCol cols="12" class="my-0 py-0 mb-4">
                <VBtn
                  color="secondary"
                  type="submit"
                  block
                  :loading="loading.identity"
                  depressed
                  large
                  >Submit</VBtn
                >
              </VCol>
            </v-row>
          </VForm>
        </VCol>
      </v-row>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  updated() {
    if (this.document) {
      this.updated = this.document
    }
  },
  data() {
    return {
      updated: '',

      document: '',
      front: null,
      back: null,
      frontImage: null,
      backImage: null,
    }
  },
  computed: {
    ...mapGetters({
      user: 'authentication/getUser',
      loading: 'userflow/getLoading',
    }),
  },
  methods: {
    ...mapActions({ verificationFN: 'userflow/verificationFN' }),
    submit() {
      // console.log('submitted')
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const payload = {
          category: 'verifications',
          //added info
          fullName: this.user && this.user.fullName,
          email: this.user && this.user.email,

          docID: 'Identification Document',
          title: 'For Verification',
          //image suffix for reference in database
          document: this.document,
          frontImage: this.front,
          backImage: this.back,
          documentStatus: 'pending',
          userID: this.user && this.user.userID,
          date: this.getCurrentTimeAndDate(),
          formattedDate: this.getCurrentTimeAndDate('format'),
        }
        // console.log(payload)
        this.verificationFN(payload)
        setTimeout(() => {
          this.$refs.form.resetValidation()
          this.$refs.form.reset()
        }, 1200)
      }
    },
    showImage() {
      if (this.front && this.back) {
        this.frontImage = URL.createObjectURL(this.front)
        this.backImage = URL.createObjectURL(this.back)
      } else {
        this.frontImage = null
        this.backImage = null
      }
    },
    getCurrentTimeAndDate(format) {
      const now = new Date()

      // Get time in 12-hour HH:MM AM/PM format
      let hours = now.getHours()
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const amOrPm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12 || 12 // Convert hours to 12-hour format
      const time = `${hours}:${minutes} ${amOrPm}`

      // Get date in DD/MM/YY format
      const day = now.getDate().toString().padStart(2, '0')
      const month = (now.getMonth() + 1).toString().padStart(2, '0') // Months are zero-based
      const year = now.getFullYear().toString().slice(-2)
      const date = `${format ? month : day}/${format ? day : month}/${year}`

      return `${time}, ${date}`
    },
  },
}
</script>

<style>
.lightpinkish {
  background-color: rgba(180, 140, 252, 0.1) !important;
}
</style>
